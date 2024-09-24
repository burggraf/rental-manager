<script lang="ts">
  import ContactsList from "$lib/components/ContactsList.svelte";
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Contacts</h1>

{#if data.error}
  <p class="error">{data.error}</p>
{:else if data.contacts.length === 0}
  <p>No contacts found.</p>
{:else}
  <ContactsList contacts={data.contacts} />
{/if}
