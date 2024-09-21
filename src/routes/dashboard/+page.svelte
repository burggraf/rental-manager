<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Menu, X } from "lucide-svelte";

  let sidebarOpen = $state(false);

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<div class="min-h-screen bg-background text-foreground flex">
  <!-- Sidebar -->
  <div
    class="fixed top-0 left-0 h-full w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out z-20"
    class:translate-x-0={sidebarOpen}
    class:-translate-x-full={!sidebarOpen}
  >
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Sidebar</h2>
        <Button variant="ghost" size="icon" on:click={toggleSidebar}>
          <X class="h-6 w-6" />
        </Button>
      </div>
      <nav>
        <ul class="space-y-2">
          <li><a href="#" class="hover:underline">Home</a></li>
          <li><a href="#" class="hover:underline">Profile</a></li>
          <li><a href="#" class="hover:underline">Settings</a></li>
        </ul>
      </nav>
    </div>
  </div>

  <!-- Main content -->
  <div class="flex-1">
    <header class="p-4 border-b">
      <Button variant="ghost" size="icon" on:click={toggleSidebar}>
        <Menu class="h-6 w-6" />
      </Button>
    </header>

    <main class="p-4">
      <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </main>
  </div>
</div>
