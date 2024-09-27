<script lang="ts">
	import { LogOut, LogIn } from 'lucide-svelte';
	import { Button } from "$lib/components/ui/button/index.js";
	import { supabase } from '$lib/supabase';
	import { user } from '$lib/stores/userStore';
	import { t } from '$lib/i18n';

	export let loginModalOpen: boolean;

	async function handleLogout() {
		await supabase.auth.signOut();
		user.set(null);
	}
</script>

<div class="px-4 py-2">
	{#if $user}
		<p class="mt-2 text-sm">{$user.email}</p>
		<Button variant="outline" size="sm" class="mt-2" on:click={handleLogout}>
			<LogOut class="mr-2 h-4 w-4" />
			{$t('sidebar.logOut')}
		</Button>
	{:else}
		<Button variant="outline" size="sm" class="mt-2" on:click={() => loginModalOpen = true}>
			<LogIn class="mr-2 h-4 w-4" />
			{$t('sidebar.logIn')}
		</Button>
	{/if}
</div>
