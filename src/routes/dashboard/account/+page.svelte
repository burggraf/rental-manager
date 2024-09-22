<script lang="ts">
  import { onMount } from 'svelte';
  import { user } from '$lib/stores/userStore';
  import { notification } from '$lib/stores/notificationStore';
  import { supabase } from '$lib/supabase';
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Card from "$lib/components/ui/card/index.js";

  let firstName = '';
  let lastName = '';
  let email = '';
  let loading = false;

  onMount(() => {
    user.subscribe(currentUser => {
      if (currentUser) {
        firstName = currentUser.user_metadata?.first_name || '';
        lastName = currentUser.user_metadata?.last_name || '';
        email = currentUser.email || '';
      }
    });
  });

  async function updateProfile() {
    loading = true;
    const { data, error } = await supabase.auth.updateUser({
      data: { first_name: firstName, last_name: lastName }
    });

    if (error) {
      notification.show('Failed to update profile', 'destructive');
      console.error('Error updating profile:', error);
    } else {
      user.set(data.user);
      notification.show('Profile updated successfully');
    }
    loading = false;
  }
</script>

<Card.Root class="max-w-md mx-auto mt-8">
  <Card.Header>
    <Card.Title>Account Settings</Card.Title>
    <Card.Description>Update your personal information</Card.Description>
  </Card.Header>
  <Card.Content>
    <form on:submit|preventDefault={updateProfile} class="space-y-4">
      <div>
        <Label for="email">Email</Label>
        <Input id="email" type="email" value={email} disabled />
      </div>
      <div>
        <Label for="firstName">First Name</Label>
        <Input id="firstName" type="text" bind:value={firstName} />
      </div>
      <div>
        <Label for="lastName">Last Name</Label>
        <Input id="lastName" type="text" bind:value={lastName} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  </Card.Content>
</Card.Root>
