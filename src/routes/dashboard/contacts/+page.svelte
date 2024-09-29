<script lang="ts">
	import { goto } from '$app/navigation'
	import ContactsList from '$lib/components/ContactsList.svelte'
	import { Button } from '$lib/components/ui/button'
	import type { PageData } from './$types'
	import { t } from '$lib/i18n'
	import MainLayout from '../MainLayout.svelte'
	import { 
		UserPlus,
		Menu,
		Search,
    } from 'lucide-svelte';
	export let data: PageData

	function handleNewContact() {
		goto('/dashboard/contacts/new')
	}
</script>

<MainLayout>
	<div slot="title">{$t('contacts.title')}</div>

	<div slot="top-right">
		<Button onclick={handleNewContact} variant="ghost" size="icon">
			<UserPlus class="h-5 w-5" />
			<!-- <svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="w-4 h-4"
			>
				<path d="M5 12h14" />
				<path d="M12 5v14" />
			</svg> -->
			<span class="sr-only">New Contact</span>
		</Button>

	</div>

	<div slot="content">
		{#if data.error}
			<p class="error">{data.error}</p>
		{:else if data.contacts.length === 0}
			<p>{$t('contacts.noContacts')}</p>
		{:else}
			<ContactsList contacts={data.contacts} />
		{/if}
	</div>
</MainLayout>
