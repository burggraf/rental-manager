<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import MainLayout from '../../MainLayout.svelte';
	import { t } from '$lib/i18n';

	let { data } = $props();
	let contactDetail = $state(data.contact);
	let isEditing = $state(false);

	async function handleSave() {
		const { error } = await supabase.from('contacts').update(contactDetail).eq('id', contactDetail.id);

		if (error) {
			console.error('Error updating contact:', error);
			} else {
			isEditing = false;
		}
	}

	async function handleDelete() {
		if (confirm($t('contactDetail.deleteConfirmation'))) {
			const { error } = await supabase.from('contacts').delete().eq('id', contactDetail.id);

			if (error) {
				console.error('Error deleting contact:', error);
			} else {
				goto('/dashboard/contacts');
			}
		}
	}
</script>

<MainLayout>
	<div slot="title">{isEditing ? $t('contactDetail.editContact') : $t('contactDetail.contactDetails')}</div>
	<div slot="content">
		<div class="max-w-2xl mx-auto mt-8">
			<h1 class="text-2xl font-bold mb-4">
				{isEditing ? $t('contactDetail.editContact') : $t('contactDetail.contactDetails')}
			</h1>

			{#if isEditing}
				<form on:submit|preventDefault={handleSave} class="space-y-4">
					<input
						bind:value={contactDetail.firstname}
						placeholder={$t('contactDetail.firstName')}
						required
						class="w-full p-2 border rounded"
					/>
					<input
						bind:value={contactDetail.lastname}
						placeholder={$t('contactDetail.lastName')}
						required
						class="w-full p-2 border rounded"
					/>
					<input
						bind:value={contactDetail.email}
						type="email"
						placeholder={$t('contactDetail.email')}
						required
						class="w-full p-2 border rounded"
					/>
					<textarea
						bind:value={contactDetail.notes}
						placeholder={$t('contactDetail.notes')}
						class="w-full p-2 border rounded h-32"
					></textarea>
					<div class="flex justify-between">
						<button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">{$t('common.save')}</button>
						<button
							type="button"
							on:click={() => (isEditing = false)}
							class="bg-gray-500 text-white px-4 py-2 rounded">{$t('common.cancel')}</button
						>
					</div>
				</form>
			{:else}
				<div class="space-y-2">
					<p><strong>{$t('contactDetail.name')}:</strong> {contactDetail.firstname} {contactDetail.lastname}</p>
					<p><strong>{$t('contactDetail.email')}:</strong> {contactDetail.email}</p>
					<p><strong>{$t('contactDetail.notes')}:</strong> {contactDetail.notes || $t('contactDetail.noNotes')}</p>
				</div>
				<div class="mt-4 space-x-2">
					<button
						on:click={() => (isEditing = true)}
						class="bg-blue-500 text-white px-4 py-2 rounded">{$t('common.edit')}</button
					>
					<button on:click={handleDelete} class="bg-red-500 text-white px-4 py-2 rounded"
						>{$t('common.delete')}</button
					>
				</div>
			{/if}

			<a href="/dashboard/contacts" class="mt-4 inline-block text-blue-500 hover:underline"
				>{$t('contactDetail.backToContacts')}</a
			>
		</div>
	</div>
</MainLayout>
