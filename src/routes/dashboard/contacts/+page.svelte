<script lang="ts">
  import { goto } from '$app/navigation';
  import ContactsList from "$lib/components/ContactsList.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { PageData } from './$types';

  export let data: PageData;

  function handleNewContact() {
    goto('/dashboard/contacts/new');
  }
</script>

<div class="flex justify-between items-center mb-4">
  <h1 class="text-2xl font-bold">Contacts</h1>
  <Button on:click={handleNewContact} variant="outline" size="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
    <span class="sr-only">New Contact</span>
  </Button>
</div>

{#if data.error}
  <p class="error">{data.error}</p>
{:else if data.contacts.length === 0}
  <p>No contacts found.</p>
{:else}
  <ContactsList contacts={data.contacts} />
{/if}
