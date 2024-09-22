<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { supabase } from '$lib/supabase';
  import { user } from '$lib/stores/userStore';

  export let open = false;
  let isLogin = true;
  let email = '';
  let password = '';
  let firstName = '';
  let lastName = '';

  function toggleForm() {
    isLogin = !isLogin;
  }

  async function handleSubmit() {
    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) console.error('Error logging in:', error.message);
      else {
        user.set(data.user);
        open = false;
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      if (error) console.error('Error signing up:', error.message);
      else {
        if (data.user) user.set(data.user);
        open = false;
      }
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-[425px]">
    {#if isLogin}
      <Card.Root class="mx-auto max-w-sm">
        <Card.Header>
          <Card.Title class="text-2xl">Login</Card.Title>
          <Card.Description>Enter your email below to login to your account</Card.Description>
        </Card.Header>
        <Card.Content>
          <form on:submit|preventDefault={handleSubmit} class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" bind:value={email} placeholder="m@example.com" required />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a href="##" class="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" bind:value={password} required />
            </div>
            <Button type="submit" class="w-full">Login</Button>
            <Button variant="outline" class="w-full">Login with Google</Button>
          </form>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <button on:click={toggleForm} class="underline">Sign up</button>
          </div>
        </Card.Content>
      </Card.Root>
    {:else}
      <Card.Root class="mx-auto max-w-sm">
        <Card.Header>
          <Card.Title class="text-xl">Sign Up</Card.Title>
          <Card.Description>Enter your information to create an account</Card.Description>
        </Card.Header>
        <Card.Content>
          <form on:submit|preventDefault={handleSubmit} class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="first-name">First name</Label>
                <Input id="first-name" bind:value={firstName} placeholder="Max" required />
              </div>
              <div class="grid gap-2">
                <Label for="last-name">Last name</Label>
                <Input id="last-name" bind:value={lastName} placeholder="Robinson" required />
              </div>
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" bind:value={email} placeholder="m@example.com" required />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" bind:value={password} required />
            </div>
            <Button type="submit" class="w-full">Create an account</Button>
            <Button variant="outline" class="w-full">Sign up with GitHub</Button>
          </form>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <button on:click={toggleForm} class="underline">Sign in</button>
          </div>
        </Card.Content>
      </Card.Root>
    {/if}
  </Dialog.Content>
</Dialog.Root>
