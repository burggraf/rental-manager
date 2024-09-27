<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";
  import { setLocale, locale, t } from '$lib/i18n';

  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    // Add more languages as needed
  ];

  let isOpen = $state(false);

  function handleChange(code: string) {
    setLocale(code);
    console.log('Selected language:', code);
    isOpen = false;
  }

  let currentLanguage = $derived(supportedLanguages.find(lang => lang.code === $locale) || supportedLanguages[0]);
</script>

<Dialog bind:open={isOpen}>
  <DialogTrigger asChild>
    <Button variant="ghost" size="icon" class="w-12 h-12 p-0" on:click={() => isOpen = true}>
      <span class="text-2xl">{currentLanguage.flag}</span>
      <span class="sr-only">{$t('language.change')}</span>
    </Button>
  </DialogTrigger>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>{$t('language.choose')}</DialogTitle>
    </DialogHeader>
    <div class="grid gap-4 py-4">
      {#each supportedLanguages as { code, name, flag }}
        <Button
          class="flex justify-start items-center gap-2"
          variant="ghost"
          on:click={() => handleChange(code)}
        >
          <span class="text-2xl">{flag}</span>
          <span>{$t(`language.names.${code}`)}</span>
        </Button>
      {/each}
    </div>
  </DialogContent>
</Dialog>
