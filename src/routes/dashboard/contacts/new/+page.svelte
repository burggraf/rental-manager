<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from "$lib/components/ui/button";
  import ContactForm from '$lib/components/ContactForm.svelte';

  function handleCancel() {
    goto('/dashboard/contacts');
  }

  function handleSubmit(event: CustomEvent) {
    const formData = event.detail;
    // TODO: Implement contact creation logic here
    console.log('Creating contact with data:', formData);
    // After successful creation, navigate back to the contacts list
    goto('/dashboard/contacts');
  }
</script>

<div class="container mx-auto py-10">
  <h1 class="text-2xl font-bold mb-4">Create New Contact</h1>
  
  <ContactForm on:submit={handleSubmit} />
  
  <div class="flex justify-end space-x-4 mt-6">
    <Button variant="outline" on:click={handleCancel}>Cancel</Button>
  </div>
</div>
