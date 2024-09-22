<script lang="ts">
  import { notification } from '$lib/stores/notificationStore';
  import * as Alert from "$lib/components/ui/alert/index.js";
  import { fade } from 'svelte/transition';

  $: if ($notification) {
    console.log('Notification received:', $notification);
  }
</script>

{#if $notification}
  <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50" transition:fade>
    <Alert.Root class="w-64" variant={$notification.type}>
      <Alert.Description>
        {$notification.message}
      </Alert.Description>
    </Alert.Root>
  </div>
{/if}
