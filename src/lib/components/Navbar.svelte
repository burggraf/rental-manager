<!-- svelte-ignore slot_element_deprecated -->
<script lang="ts">
    import { Menu } from 'lucide-svelte';
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import Sidebar from '$lib/components/Sidebar.svelte';

    let sheetOpen = $state(false);

    function closeSheet() {
        sheetOpen = false;
    }
</script>

<header class="bg-background fixed top-0 left-0 right-0 z-30 border-b">
    <div class="container mx-auto px-4 h-[var(--header-height)] flex items-center justify-between">
        <div class="flex items-center space-x-4">
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

        <div class="flex-1 flex justify-center">
            <slot name="title" />
        </div>

        <div class="flex items-center">
            <slot name="top-right" />
        </div>
    </div>
</header>
