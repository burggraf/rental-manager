<script lang="ts">
import { supabase } from '$lib/supabase';
import { goto } from '$app/navigation';

let firstname = '';
let lastname = '';
let email = '';
let notes = '';

async function handleSubmit() {
  const { error } = await supabase
    .from('contacts')
    .insert({ firstname, lastname, email, notes });

  if (error) {
    console.error('Error submitting form:', error);
  } else {
    goto('/dashboard/contacts');
  }
}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <input bind:value={firstname} placeholder="First Name" required class="w-full p-2 border rounded" />
  <input bind:value={lastname} placeholder="Last Name" required class="w-full p-2 border rounded" />
  <input bind:value={email} type="email" placeholder="Email" required class="w-full p-2 border rounded" />
  <textarea bind:value={notes} placeholder="Notes" required class="w-full p-2 border rounded h-32"></textarea>
  <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded">Send</button>
</form>
