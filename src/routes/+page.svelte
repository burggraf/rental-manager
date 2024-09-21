<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  let counter = $state(0);
</script>

<h1 class="text-3xl font-bold mb-4">Welcome to our SvelteKit App</h1>
<p class="mb-4">This is the home page of our application.</p>
<Button onclick={()=>counter++}>Click me! {counter}</Button>
