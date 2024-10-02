<script lang="ts">
	import { LogOut, LogIn } from 'lucide-svelte';
	import { Button } from "$lib/components/ui/button/index.js";
	import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar/index.js";
	import { user } from '$lib/stores/userStore';
	import { t } from '$lib/i18n';
	import { signOut } from '$lib/backend';
	export let loginModalOpen: boolean;

	async function handleLogout() {
		await signOut();
		user.set(null);
	}

	// Placeholder for user's plan type
	const userPlan = "Free Account";
</script>

<div class="px-2 py-4 border-b">
	{#if $user}
		<div class="flex items-center mb-2">
			<Avatar class="h-10 w-10 mr-3">
				<AvatarImage src="{$user.avatar || $user?.user_metadata?.picture || ''}" alt={$user.email} />
				<AvatarFallback>{$user.email[0].toUpperCase()}</AvatarFallback>
			</Avatar>
			<div>
				<p class="text-sm font-medium">{$user.email}</p>
				<p class="text-xs text-muted-foreground">{userPlan}</p>
			</div>
		</div>
		<Button variant="outline" size="sm" class="w-full" onclick={handleLogout}>
			<LogOut class="mr-2 h-4 w-4" />
			{$t('sidebar.logOut')}
		</Button>
	{:else}
		<Button variant="outline" size="sm" class="w-full" onclick={() => loginModalOpen = true}>
			<LogIn class="mr-2 h-4 w-4" />
			{$t('sidebar.logIn')}
		</Button>
	{/if}
</div>
