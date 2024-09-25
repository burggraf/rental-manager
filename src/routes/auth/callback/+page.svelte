<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  onMount(async () => {
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
    }
    // Redirect to home page or dashboard after successful login
    goto('/');
  });
</script>

<div>Processing login...</div>
