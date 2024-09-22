<script lang="ts">
  import '../../app.css';
  
  import { 
    Menu,
    Search,
  } from 'lucide-svelte';

  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";

  import Sidebar from './Sidebar.svelte';
  import { page } from '$app/stores';

  let sheetOpen = $state(false);

  function closeSheet() {
    sheetOpen = false;
  }

  let currentPath = $derived($page.url.pathname);
  let pathSegments = $derived(currentPath.split('/').filter(segment => segment !== ''));
  let currentPageName = $derived(pathSegments[pathSegments.length - 1] || 'Dashboard');

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<div class="bg-muted/40 flex min-h-screen w-full flex-col">
  <div class="flex flex-col">
    <header
      class="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4"
    >
      <Sheet.Root bind:open={sheetOpen}>
        <Sheet.Trigger asChild let:builder>
          <Button builders={[builder]} size="icon" variant="outline">
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle Menu</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="w-[300px] flex flex-col">
          <Sidebar {closeSheet} />
        </Sheet.Content>
      </Sheet.Root>
      <Breadcrumb.Root class="hidden md:flex">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/dashboard">Dashboard</Breadcrumb.Link>
          </Breadcrumb.Item>
          {#if pathSegments.length > 1}
            {#each pathSegments.slice(1) as segment, index}
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                {#if index === pathSegments.length - 2}
                  <Breadcrumb.Page>{capitalizeFirstLetter(segment)}</Breadcrumb.Page>
                {:else}
                  <Breadcrumb.Link href={`/dashboard/${pathSegments.slice(1, index + 2).join('/')}`}>
                    {capitalizeFirstLetter(segment)}
                  </Breadcrumb.Link>
                {/if}
              </Breadcrumb.Item>
            {/each}
          {/if}
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <div class="relative ml-auto flex-1 md:grow-0">
        <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search..."
          class="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button
            variant="outline"
            size="icon"
            class="overflow-hidden rounded-full"
            builders={[builder]}
          >
            <div
              class="bg-gray-600 text-white flex h-9 w-9 items-center justify-center overflow-hidden rounded-full"
            >
              <span class="text-sm font-medium">MB</span>
            </div>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Item>Support</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
    <main
      class="grid flex-1 items-start gap-4 p-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
    >
      <slot />
    </main>
  </div>
</div>
