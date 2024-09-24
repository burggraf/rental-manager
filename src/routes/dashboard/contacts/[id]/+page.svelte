<script lang="ts">
import { supabase } from '$lib/supabase';
import { goto } from '$app/navigation';

export let data;
let contact = data.contact;
let isEditing = false;

async function handleSave() {
  const { error } = await supabase
    .from('contacts')
    .update(contact)
    .eq('id', contact.id);

  if (error) {
    console.error('Error updating contact:', error);
  } else {
    isEditing = false;
  }
}

async function handleDelete() {
  if (confirm('Are you sure you want to delete this contact?')) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', contact.id);

    if (error) {
      console.error('Error deleting contact:', error);
    } else {
      goto('/dashboard/contacts');
    }
  }
}
</script>

<div class="max-w-2xl mx-auto mt-8">
  <h1 class="text-2xl font-bold mb-4">
    {isEditing ? 'Edit Contact' : 'Contact Details'}
  </h1>

  {#if isEditing}
    <form on:submit|preventDefault={handleSave} class="space-y-4">
      <input bind:value={contact.firstname} placeholder="First Name" required class="w-full p-2 border rounded" />
      <input bind:value={contact.lastname} placeholder="Last Name" required class="w-full p-2 border rounded" />
      <input bind:value={contact.email} type="email" placeholder="Email" required class="w-full p-2 border rounded" />
      <textarea bind:value={contact.notes} placeholder="Notes" class="w-full p-2 border rounded h-32"></textarea>
      <div class="flex justify-between">
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Save</button>
        <button type="button" on:click={() => isEditing = false} class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  {:else}
    <div class="space-y-2">
      <p><strong>Name:</strong> {contact.firstname} {contact.lastname}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Notes:</strong> {contact.notes || 'No notes available'}</p>
    </div>
    <div class="mt-4 space-x-2">
      <button on:click={() => isEditing = true} class="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
      <button on:click={handleDelete} class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
    </div>
  {/if}

  <a href="/dashboard/contacts" class="mt-4 inline-block text-blue-500 hover:underline">Back to Contacts</a>
</div>
