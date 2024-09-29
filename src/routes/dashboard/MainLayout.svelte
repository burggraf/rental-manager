<script lang="ts">
    import { 
      Menu,
      Search,
    } from 'lucide-svelte';
  
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import * as Dialog from "$lib/components/ui/dialog";
  
    import Sidebar from './Sidebar.svelte';
    import LanguageSelector from '$lib/components/LanguageSelector.svelte';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { user } from '$lib/stores/userStore';
  
    import { cn } from "$lib/utils";
  
    import DarkModeToggle from "$lib/components/DarkModeToggle.svelte";
  
    let sheetOpen = $state(false);
    let currentLanguage = $state('en');
    let languageSelectorOpen = $state(false);
  
    function closeSheet() {
      sheetOpen = false;
    }
  
    let currentPath = $derived($page.url.pathname);
    let pathSegments = $derived(currentPath.split('/').filter(segment => segment !== ''));
    let currentPageName = $derived(pathSegments[pathSegments.length - 1] || 'Dashboard');
  
    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    function getFlagEmoji(languageCode: string) {
      const flagEmojis: { [key: string]: string } = {
        'en': '🇬🇧',
        'es': '🇪🇸',
        // Add more languages as needed
      };
      return flagEmojis[languageCode] || '🌐';
    }
  
    onMount(() => {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          user.set(data.session.user);
          console.log('User logged in:', data.session.user);
          // Fetch user's language preference
          /*
          const { data: userData } = await supabase
            .from('users')
            .select('language')
            .eq('id', data.session.user.id)
            .single();
          if (userData && userData.language) {
            currentLanguage = userData.language;
          }
            */
        }
      });
    });
  </script>
  
  <div class="bg-muted/40 flex min-h-screen w-full flex-col">
    <div class="flex flex-col">
      <header
        class="bg-background sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b px-4"
      >
        <div class="flex items-center gap-4">
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
          <slot name="top-left" />
        </div>

        <div>
            <slot name="title" />
        </div>

        <div class="flex items-center space-x-2">
          <LanguageSelector />
          <DarkModeToggle />
          <slot name="top-right" />
        </div>
      </header>
      <main
        class="grid flex-1 items-start gap-4 p-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
      >
        <slot name="content" />
      </main>
    </div>
  </div>
  
  <!--<Dialog.Root bind:open={languageSelectorOpen}>
    <Dialog.Content>
      <LanguageSelector bind:currentLanguage />
    </Dialog.Content>
  </Dialog.Root>
  -->
  