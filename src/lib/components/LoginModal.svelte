<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Dialog from "$lib/components/ui/dialog";
  import { signInWithPassword, signInWithOAuth, resetPasswordForEmail } from '$lib/backend';
  import { browser } from '$app/environment';
  import { t } from '$lib/i18n';
	import { showToast } from '$lib/utils/toast'

  let { open = $bindable(false) } = $props();

  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let error = $state<string | null>(null);
  let isLogin = $state(true);

  function closeModal() {
    open = false;
  }

  async function handleLogin() {
    loading = true;
    error = null;

    try {
      const signInError = await signInWithPassword(email, password);
    
      if (signInError) {
        error = signInError;
        showToast(error, { type: 'error' });
      } else {
        closeModal(); // Close the modal on successful login
      }
    } catch (e) {
      error = 'An unexpected error occurred';
      console.error(e);
      showToast(error, { type: 'error' });
    } finally {
      loading = false;
    }
  }

  async function handleGoogleLogin() {
    if (!browser) return;

    loading = true;
    error = null;

    try {
      const { signInError } = await signInWithOAuth('google');

      if (signInError) {
        error = signInError.message;
        showToast(error, { type: 'error' });
      } else {
        closeModal(); // Close the modal on successful login
      }
    } catch (e) {
      error = 'An unexpected error occurred';
      console.error(e);
      showToast(error, { type: 'error' });
    } finally {
      loading = false;
    }
  }

  function toggleMode() {
    isLogin = !isLogin;
    error = null;
  }

  async function handleForgotPassword() {
    if (!browser) return;

    loading = true;
    error = null;

    if (!email) {
      error = $t('loginModal.emailRequired');
      showToast(error, { type: 'error' });
      loading = false;
      return;
    }

    try {
      const { resetError } = await resetPasswordForEmail(email);

      if (resetError) {
        error = resetError.message;
        showToast(error, { type: 'error' });
      } else {
        // Show success message
        error = null;
        alert($t('loginModal.resetPasswordEmailSent'));
        closeModal();
      }
    } catch (e) {
      console.error('Password reset error:', e);
      error = $t('loginModal.unexpectedError');
    } finally {
      loading = false;
    }
  }
</script>

{#if open}
  <Dialog.Root open={true}>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>{isLogin ? $t('loginModal.loginTitle') : $t('loginModal.registerTitle')}</Dialog.Title>
        <Dialog.Description>
          {isLogin ? $t('loginModal.loginDescription') : $t('loginModal.registerDescription')}
        </Dialog.Description>
      </Dialog.Header>
      <div class="space-y-4 py-4">
        <div class="space-y-2">
          <Label for="email">{$t('loginModal.emailLabel')}</Label>
          <Input id="email" type="email" bind:value={email} required />
        </div>
        <div class="space-y-2">
          <Label for="password">{$t('loginModal.passwordLabel')}</Label>
          <Input id="password" type="password" bind:value={password} required />
        </div>
        {#if error}
          <p class="text-red-500">{error}</p>
        {/if}
        <Button class="w-full" onclick={handleLogin} disabled={loading}>
          {loading ? $t('loginModal.loading') : (isLogin ? $t('loginModal.loginButton') : $t('loginModal.registerButton'))}
        </Button>
        {#if isLogin}
          <Button variant="link" class="w-full text-sm" onclick={handleForgotPassword}>
            {$t('loginModal.forgotPassword')}
          </Button>
        {:else}
          <Button variant="link" class="w-full text-sm">
            &nbsp;
          </Button>
      {/if}
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">{$t('loginModal.orContinueWith')}</span>
          </div>
        </div>
        <Button class="w-full" variant="outline" onclick={handleGoogleLogin} disabled={loading}>
          <svg class="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Google
        </Button>
      </div>
      <Dialog.Footer>
        <Button variant="link" onclick={toggleMode}>
          {isLogin ? $t('loginModal.needAccount') : $t('loginModal.alreadyHaveAccount')}
        </Button>
      </Dialog.Footer>
      <Dialog.Close onclick={closeModal} />
    </Dialog.Content>
  </Dialog.Root>
{/if}
