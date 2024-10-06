<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { LayoutDashboard } from 'lucide-svelte';
</script>

<div class="bg-background min-h-screen flex flex-col">
  <header class="px-4 lg:px-6 h-14 flex items-center">
    <a class="flex items-center justify-center" href="/">
      <span class="sr-only">Acme Inc</span>
      <LayoutDashboard class="h-6 w-6" />
      <span class="ml-2 text-lg font-semibold">Acme Inc</span>
    </a>
    <nav class="ml-auto flex gap-4 sm:gap-6">
      <a class="text-sm font-medium hover:underline underline-offset-4" href="#features">
        Features
      </a>
      <a class="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
        Pricing
      </a>
      <a class="text-sm font-medium hover:underline underline-offset-4" href="#about">
        About
      </a>
    </nav>
  </header>
  <main class="flex-1">
    <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center space-y-4 text-center">
          <div class="space-y-2">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to Acme Inc
            </h1>
            <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Streamline your business operations with our cutting-edge dashboard solution.
            </p>
          </div>
          <div class="space-x-4">
            <Button asChild>
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
            <Button href="/test" variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
    <section id="features" class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div class="container px-4 md:px-6">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-12 w-12 mb-4 text-primary"
            >
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
            <h3 class="text-xl font-bold mb-2">Advanced Analytics</h3>
            <p class="text-gray-500 dark:text-gray-400">Gain insights with our powerful analytics tools.</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-12 w-12 mb-4 text-primary"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <h3 class="text-xl font-bold mb-2">Secure Platform</h3>
            <p class="text-gray-500 dark:text-gray-400">Your data is safe with our top-notch security measures.</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-12 w-12 mb-4 text-primary"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
            </svg>
            <h3 class="text-xl font-bold mb-2">Customizable Dashboard</h3>
            <p class="text-gray-500 dark:text-gray-400">Tailor your dashboard to fit your unique needs.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Add more sections for Pricing, About, etc. -->
  </main>
  <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p class="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
    <nav class="sm:ml-auto flex gap-4 sm:gap-6">
      <a class="text-xs hover:underline underline-offset-4" href="/terms">
        Terms of Service
      </a>
      <a class="text-xs hover:underline underline-offset-4" href="/privacy">
        Privacy
      </a>
    </nav>
  </footer>
</div>
