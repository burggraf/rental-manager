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

	function handleEdit() {
		isEditing = true;
	}

	function handleCancel() {
		isEditing = false;
	}
</script>

<MainLayout>
	<div slot="title">{isEditing ? $t('contactDetail.editContact') : $t('contactDetail.contactDetails')}</div>
	<div slot="content">
		<div class="max-w-2xl mx-auto mt-8">
			<h1 class="text-2xl font-bold mb-4">
				{isEditing ? $t('contactDetail.editContact') : $t('contactDetail.contactDetails')}
				</h1>

			<div class="space-y-4">
				{#if isEditing}
					<form class="space-y-4">
						<div class="w-full p-2 border rounded">
							<label for="firstname" class="block text-sm font-medium text-gray-700">{$t('contactDetail.firstName')}</label>
							<input
								id="firstname"
								type="text"
								bind:value={contactDetail.firstname}
								class="mt-1 p-2 w-full bg-white border rounded focus:ring-primary focus:border-primary"
							/>
						</div>

						<div class="w-full p-2 border rounded">
							<label for="lastname" class="block text-sm font-medium text-gray-700">{$t('contactDetail.lastName')}</label>
							<input
								id="lastname"
								type="text"
								bind:value={contactDetail.lastname}
								class="mt-1 p-2 w-full bg-white border rounded focus:ring-primary focus:border-primary"
							/>
						</div>

						<div class="w-full p-2 border rounded">
							<label for="email" class="block text-sm font-medium text-gray-700">{$t('contactDetail.email')}</label>
							<input
								id="email"
								type="email"
								bind:value={contactDetail.email}
								class="mt-1 p-2 w-full bg-white border rounded focus:ring-primary focus:border-primary"
							/>
						</div>

						<div class="w-full p-2 border rounded">
							<label for="phone" class="block text-sm font-medium text-gray-700">{$t('contactDetail.phone')}</label>
							<input
								id="phone"
								type="tel"
								bind:value={contactDetail.phone}
								class="mt-1 p-2 w-full bg-white border rounded focus:ring-primary focus:border-primary"
							/>
						</div>

						<div class="w-full p-2 border rounded">
							<label for="notes" class="block text-sm font-medium text-gray-700">{$t('contactDetail.notes')}</label>
							<textarea
								id="notes"
								bind:value={contactDetail.notes}
								rows="4"
								class="mt-1 p-2 w-full bg-white border rounded focus:ring-primary focus:border-primary resize-y"
							></textarea>
						</div>

						<!-- Add more fields as needed -->

						<div class="flex justify-end space-x-4 mt-4">
							<button
								type="button"
								class="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
								onclick={handleCancel}
							>
								{$t('common.cancel')}
							</button>
							<button
								type="submit"
								class="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
								onclick={handleSave}
							>
								{$t('common.save')}
							</button>
						</div>
					</form>
				{:else}
					<div class="space-y-4">
						<div class="w-full p-2 border rounded">
							<label class="block text-sm font-medium text-gray-700">{$t('contactDetail.firstName')}</label>
								<div class="mt-1 p-2 bg-gray-100 rounded">{contactDetail.firstname}</div>
						</div>
						<div class="w-full p-2 border rounded">
								<label class="block text-sm font-medium text-gray-700">{$t('contactDetail.lastName')}</label>
								<div class="mt-1 p-2 bg-gray-100 rounded">{contactDetail.lastname}</div>
						</div>
						<div class="w-full p-2 border rounded">
								<label class="block text-sm font-medium text-gray-700">{$t('contactDetail.email')}</label>
								<div class="mt-1 p-2 bg-gray-100 rounded">{contactDetail.email}</div>
						</div>
						<div class="w-full p-2 border rounded">
								<label id="notes-label" class="block text-sm font-medium text-gray-700">{$t('contactDetail.notes')}</label>
								<div 
									aria-labelledby="notes-label" 
									class="mt-1 p-2 bg-gray-100 rounded whitespace-pre-wrap"
								>
									{contactDetail.notes}
								</div>
						</div>
						<div class="flex justify-between">
							<button
								onclick={handleEdit}
								class="bg-blue-500 text-white px-4 py-2 rounded">{$t('common.edit')}</button>
							<button
								onclick={handleDelete}
								class="bg-red-500 text-white px-4 py-2 rounded">{$t('common.delete')}</button>
						</div>
					</div>
				{/if}

				<a href="/dashboard/contacts" class="mt-4 inline-block text-blue-500 hover:underline"
					>{$t('contactDetail.backToContacts')}</a
				>
			</div>
		</div>
	</div>
</MainLayout>
