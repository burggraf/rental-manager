<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { Button } from "$lib/components/ui/button";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";
  import type { Contact } from '../types/contact';
  import { createSortHandler, type SortState } from '$lib/utils/sorting';

  let contacts = $state<Contact[]>([]);
  let sortState = $state<SortState>({ column: 'lastname', direction: 'asc' });

  $effect(() => {
    fetchContacts();
  });

  async function fetchContacts() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order(sortState.column, { ascending: sortState.direction === 'asc' });
    
    if (error) {
      console.error('Error fetching contacts:', error);
    } else {
      contacts = data;
    }
  }

  const handleSort = createSortHandler(sortState, fetchContacts);

  function handleContactClick(id: string) {
    goto(`/dashboard/contacts/${id}`);
  }
</script>

<div class="container mx-auto py-10">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          <Button variant="ghost" on:click={() => handleSort('firstname')}>First Name</Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" on:click={() => handleSort('lastname')}>Last Name</Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" on:click={() => handleSort('email')}>Email</Button>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each contacts as contact (contact.id)}
        <TableRow on:click={() => handleContactClick(contact.id)} class="cursor-pointer">
          <TableCell>{contact.firstname}</TableCell>
          <TableCell>{contact.lastname}</TableCell>
          <TableCell>{contact.email}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>

  {#if contacts.length === 0}
    <p class="text-center text-gray-500 mt-4">No contacts found.</p>
  {/if}
</div>
