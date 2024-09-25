<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { user } from '$lib/stores/authStore';
  import { browser } from '$app/environment';
  import '../app.css';
  import { page } from '$app/stores';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
  let notificationSupported = $state(false);

  onMount(() => {
    if (browser) {
      notificationSupported = 'Notification' in window;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      user.set(session?.user ?? null);
    
      if (browser && notificationSupported && event === 'SIGNED_IN') {
        if (Notification.permission === 'granted') {
          new Notification('Signed In', {
            body: 'You have successfully signed in.',
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  function requestNotificationPermission() {
    if (browser && notificationSupported) {
      Notification.requestPermission();
    }
  }
</script>

<svelte:head>
  {#if browser && notificationSupported}
    <script>
      // Request notification permission when the page loads
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    </script>
  {/if}
</svelte:head>
<LanguageSelector />
<slot />