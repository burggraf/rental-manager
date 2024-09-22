<script lang="ts">
  import "../app.css";
  import { Button } from "$lib/components/ui/button";
</script>

<div class="min-h-screen bg-background text-foreground">
  <!-- <header class="p-4 bg-primary text-primary-foreground">
    <nav>
      <Button variant="link" href="/">Home</Button>
      <Button variant="link" href="/about">About</Button>
    </nav>
  </header> -->

  <main class="container mx-auto p-4">
    <slot />
  </main>
</div>
