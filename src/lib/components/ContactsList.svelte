<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let contacts = [];

  onMount(async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('lastname', { ascending: true });
    
    if (error) {
      console.error('Error fetching contacts:', error);
    } else {
      contacts = data;
    }
  });

  function handleContactClick(id: string) {
    goto(`/dashboard/contacts/${id}`);
  }
</script>

<h2 class="text-xl font-semibold mb-4">Contacts List</h2>

<ul class="space-y-2">
  {#each contacts as contact (contact.id)}
    <li 
      class="border p-2 rounded cursor-pointer hover:bg-gray-100"
      on:click={() => handleContactClick(contact.id)}
    >
      <div class="font-medium">{contact.firstname} {contact.lastname}</div>
      <div class="text-sm text-gray-600">{contact.email}</div>
    </li>
  {/each}
</ul>

{#if contacts.length === 0}
  <p class="text-gray-500">No contacts found.</p>
{/if}
