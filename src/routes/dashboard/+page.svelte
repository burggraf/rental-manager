<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { t, locale, setLocale } from '$lib/i18n';

  // Function to handle language change
  function handleLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    setLocale(select.value);
  }
</script>

<div class="lg:col-span-3">
  <Card.Root>
    <Card.Header>
      <Card.Title>{$t('dashboard.title')}</Card.Title>
      <Card.Description>
        {$t('dashboard.description')}
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <p>{$t('dashboard.content')}</p>
    </Card.Content>
    <Card.Footer>
      <Button>{$t('dashboard.button')}</Button>
    </Card.Footer>
  </Card.Root>
</div>

<div>
  <select value={$locale} on:change={handleLanguageChange}>
    <option value="en">English</option>
    <option value="es">Español</option>
  </select>
</div>
