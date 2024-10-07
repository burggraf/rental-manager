<!-- svelte-ignore slot_element_deprecated -->
<script lang="ts">
    import { 
      Menu,
    } from 'lucide-svelte';
  
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import Sidebar from '$lib/components/Sidebar.svelte';

    let sheetOpen = $state(false);
  
    function closeSheet() {
      sheetOpen = false;
    }
  
  </script>
  
  <div class="flex flex-col h-screen">

    <header
      class="header-height safe-area-top bg-background fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-4 border-b px-4"
    >
      <!--<div class="flex items-center gap-0">-->
      <div class="">
          <Sheet.Root bind:open={sheetOpen}>
          <Sheet.Trigger asChild let:builder>
            <Button builders={[builder]} size="icon" variant="ghost">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle Menu</span>
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="left" class="w-[300px] flex flex-col">
            <Sidebar {closeSheet} />
          </Sheet.Content>
        </Sheet.Root>
        <slot name="top-left" />
      </div>

      <div>
          <slot name="title" />
      </div>

      <!--<div class="flex items-center space-x-2">-->
      <div class="">
          <slot name="top-right" />
      </div>
    </header>
  </div>
  
