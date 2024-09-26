<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { Button } from "$lib/components/ui/button";
  import { ChevronUp, ChevronDown } from 'lucide-svelte';
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
  import { t } from '$lib/i18n';

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

  function getSortIcon(column: string) {
    if (sortState.column === column) {
      return sortState.direction === 'asc' ? ChevronUp : ChevronDown;
    }
    return null;
  }
</script>

<div class="container mx-auto py-10">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          <Button variant="ghost" class="justify-start font-bold p-0 hover:bg-transparent" on:click={() => handleSort('firstname')}>
            {$t('contacts.firstname')}
            {#if getSortIcon('firstname')}
              <svelte:component this={getSortIcon('firstname')} class="ml-1 h-4 w-4" />
            {/if}
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" class="justify-start font-bold p-0 hover:bg-transparent" on:click={() => handleSort('lastname')}>
            {$t('contacts.lastname')}
            {#if getSortIcon('lastname')}
              <svelte:component this={getSortIcon('lastname')} class="ml-1 h-4 w-4" />
            {/if}
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" class="justify-start font-bold p-0 hover:bg-transparent" on:click={() => handleSort('email')}>
            {$t('contacts.email')}
            {#if getSortIcon('email')}
              <svelte:component this={getSortIcon('email')} class="ml-1 h-4 w-4" />
            {/if}
          </Button>
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
    <p class="text-center text-gray-500 mt-4">{$t('contacts.noContacts')}</p>
  {/if}
</div>
