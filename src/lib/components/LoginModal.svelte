<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  export let open = false;
  let isLogin = true;

  function toggleForm() {
    isLogin = !isLogin;
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-[425px]">
    {#if isLogin}
      <Card.Root class="mx-auto max-w-sm">
        <Card.Header>
          <Card.Title class="text-2xl">Login</Card.Title>
          <Card.Description>Enter your email below to login to your account</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a href="##" class="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" class="w-full">Login</Button>
            <Button variant="outline" class="w-full">Login with Google</Button>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <button on:click={toggleForm} class="underline">Sign up</button>
          </div>
        </Card.Content>
      </Card.Root>
    {:else}
      <Card.Root class="mx-auto max-w-sm">
        <Card.Header>
          <Card.Title class="text-xl">Sign Up</Card.Title>
          <Card.Description>Enter your information to create an account</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div class="grid gap-2">
                <Label for="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" class="w-full">Create an account</Button>
            <Button variant="outline" class="w-full">Sign up with GitHub</Button>
          </div>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <button on:click={toggleForm} class="underline">Sign in</button>
          </div>
        </Card.Content>
      </Card.Root>
    {/if}
  </Dialog.Content>
</Dialog.Root>
