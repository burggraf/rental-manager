<script lang="ts">
	import { LogOut, Home, LogIn, Settings, Users } from 'lucide-svelte';
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import LoginModal from "$lib/components/LoginModal.svelte";
	import { supabase } from '$lib/supabase';
	import { user } from '$lib/stores/userStore';
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';

	export let closeSheet: () => void;
	let loginModalOpen = false;

	async function handleLogout() {
		await supabase.auth.signOut();
		user.set(null);
	}

	// Updated sidebar navigation structure
	$: sidebarNavigation = [
		{
			category: $t('sidebar.people'),
			icon: Users,
			items: [
				{ label: $t('sidebar.contacts'), href: "/dashboard/contacts" },
				{ label: $t('sidebar.myAccount'), href: "/dashboard/account" }
			]
		},
		{
			category: $t('sidebar.dashboard'),
			icon: Home,
			items: [
				{ label: $t('sidebar.overview'), href: "/dashboard" },
				{ label: $t('sidebar.analytics'), href: "/dashboard/analytics" }
			]
		},
		{
			category: $t('sidebar.settings'),
			icon: Settings,
			items: [
				...$user ? [{ label: $t('sidebar.account'), href: "/dashboard/account" }] : [],
				{ label: $t('sidebar.language'), href: "/dashboard/language" },
			]
		}
	];

	function handleNavClick(event: Event) {
		setTimeout(() => closeSheet(), 100);
	}
</script>

<div class="px-4 py-6 border-b">
	<h2 class="text-lg font-semibold">{$t('sidebar.companyName')}</h2>
	<p class="text-sm text-muted-foreground">{$t('sidebar.dashboard')}</p>
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

<nav class="flex-1 px-2 py-4">
	<Accordion.Root type="single" collapsible>
		{#each sidebarNavigation as { category, icon: Icon, items }, index}
			{#if items.length > 0}
				<Accordion.Item value={category.toLowerCase()} class="border-none">
					<Accordion.Trigger
						class="flex w-full items-center justify-start px-4 py-3 text-base hover:bg-muted/50 data-[state=open]:bg-muted no-underline"
					>
						<Icon class="mr-3 h-5 w-5" />
						{category}
					</Accordion.Trigger>
					<Accordion.Content class="pt-1 pb-2">
						{#each items as { label, href }}
							<a 
								{href} 
								class="block py-3 px-8 text-base hover:bg-muted/50 no-underline" 
								class:bg-muted={$page.url.pathname === href}
								on:click={handleNavClick}
							>
								{label}
							</a>
						{/each}
					</Accordion.Content>
				</Accordion.Item>
			{/if}
		{/each}
	</Accordion.Root>
</nav>

<div class="mt-auto px-4 py-6 border-t">
	<div class="flex items-center justify-between mb-4">
		<div>
			<p class="text-sm font-medium">{$t('sidebar.currentPlan')}</p>
			<p class="text-xs text-muted-foreground">Pro</p>
		</div>
		<Button size="sm">{$t('sidebar.upgrade')}</Button>
	</div>
	<div class="flex justify-between text-xs text-muted-foreground">
		<a href="/terms">{$t('sidebar.termsOfService')}</a>
		<a href="/privacy">{$t('sidebar.privacyPolicy')}</a>
	</div>
</div>

<!-- Login Modal -->
<LoginModal bind:open={loginModalOpen} />
