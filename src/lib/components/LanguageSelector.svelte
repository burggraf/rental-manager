<script lang="ts">
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
  } from '$lib/components/ui/select';
  import { setLocale } from '$lib/i18n';

  let selectedValue = $state('en');
  
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    // Add more languages as needed
  ];

  function handleChange(obj: any) {
    
    setLocale(obj.value);
  }
</script>

<Select onSelectedChange={(value: any) => { selectedValue = value; handleChange(value); }}>
  <SelectTrigger class="w-[150px]">
    <SelectValue placeholder="Select language" value={selectedValue} />
  </SelectTrigger>
  <SelectContent>
    {#each languages as language}
      <SelectItem value={language.value}>{language.label}</SelectItem>
    {/each}
  </SelectContent>
</Select>
