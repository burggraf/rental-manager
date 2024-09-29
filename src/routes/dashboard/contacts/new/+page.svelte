<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button } from '$lib/components/ui/button'
	import ContactForm from '$lib/components/ContactForm.svelte'
	import { t } from '$lib/i18n'
	import MainLayout from '../../MainLayout.svelte'

	function handleCancel() {
		goto('/dashboard/contacts')
	}

	function handleSubmit(event: CustomEvent) {
		const formData = event.detail
		// After successful creation, navigate back to the contacts list
		goto('/dashboard/contacts')
	}
</script>

<MainLayout>
	<div slot="title">{$t('contacts.createNew')}</div>
	<div slot="content">
		<h1 class="text-2xl font-bold mb-4">{$t('contacts.createNew')}</h1>

		<ContactForm on:submit={handleSubmit} />

		<div class="flex justify-end space-x-4 mt-6">
			<Button variant="outline" on:click={handleCancel}>{$t('contacts.cancel')}</Button>
		</div>
	</div>
</MainLayout>
