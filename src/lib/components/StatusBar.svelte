<!-- svelte-ignore slot_element_deprecated -->
<script lang="ts">
    import LanguageSelector from '$lib/components/LanguageSelector.svelte';
    import { Toaster } from '$lib/components/ui/sonner';  
    import DarkModeToggle from "$lib/components/DarkModeToggle.svelte";
  
  </script>
  
  <div class="flex flex-col h-screen">

    <footer class="footer-height bg-background fixed bottom-0 left-0 right-0 z-30 border-t flex items-center justify-between px-4">
      <div class="flex items-center space-x-2">
        <slot name="bottom-left">
          <!-- Default content for bottom-left -->
          <LanguageSelector />
        </slot>
      </div>
      
      <!--<div class="flex items-center space-x-2">-->
      <div class="">
          <slot name="bottom-center">
          {__APP_TITLE__} v{__APP_VERSION__} 
          <!-- Default content for bottom-center -->
          <slot name="footer" />
        </slot>
      </div>
      
      <!--<div class="flex items-center space-x-2">-->
        <div class="">
          <slot name="bottom-right">
          <!-- Default content for bottom-right -->
          <DarkModeToggle />
        </slot>
      </div>
    </footer>
    <Toaster richColors />
  </div>
  