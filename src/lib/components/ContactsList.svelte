<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
  import type { Contact } from "$lib/types/contact";

  let { contacts = [] } = $props<{ contacts?: Contact[] }>();
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold">Contacts</h2>
    <Button>Add Contact</Button>
  </div>

  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each contacts as contact (contact.id)}
        <TableRow>
          <TableCell>{contact.name}</TableCell>
          <TableCell>{contact.email}</TableCell>
          <TableCell>{contact.phone || 'N/A'}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</div>
