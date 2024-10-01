<script lang="ts">
  import { MoreVertical } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';

  interface Action {
    icon: typeof MoreVertical;
    title: string;
    action: () => void;
  }

  let { actions } = $props<{ actions: Action[] }>();
  let isOpen = $state(false);
  let dropdownRef = $state<HTMLDivElement | null>(null);

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function handleAction(action: () => void) {
    console.log('Action clicked');
    action();
    isOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node) && isOpen) {
        isOpen = false;
      }
    };

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }
</script>

<div class="relative" use:clickOutside>
  <Button variant="ghost" size="icon" class="h-9 w-9 p-0" onclick={toggleDropdown}>
    <MoreVertical class="h-5 w-5" />
    <span class="sr-only">Open menu</span>
  </Button>

  {#if isOpen}
    <div 
      bind:this={dropdownRef}
      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
    >
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {#each actions as { icon: Icon, title, action }}
          <button
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onclick={() => handleAction(action)}
          >
            <Icon class="mr-2 h-4 w-4" />
            <span>{title}</span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
