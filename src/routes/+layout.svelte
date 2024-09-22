<script lang="ts">
  import '../app.css';
  import Notification from '$lib/components/Notification.svelte';
</script>

<div class="flex">
  <!-- Your existing layout content -->
  <slot />
</div>

<Notification />