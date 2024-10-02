<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getSession } from '$lib/backend';

  onMount(async () => {
    const { error } = await getSession();
    if (error) {
      console.error('Error getting session:', error);
    }
    // Redirect to home page or dashboard after successful login
    goto('/');
  });
</script>

<div>Processing login...</div>
