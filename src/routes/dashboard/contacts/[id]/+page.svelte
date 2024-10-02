<script lang="ts">
	import { goto } from '$app/navigation'
	import MainLayout from '$lib/components/MainLayout.svelte'
	import { t } from '$lib/i18n'
	import { cn } from '$lib/utils'
	import { Check, X } from 'lucide-svelte'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { showToast } from '$lib/utils/toast'
	import { saveContact, deleteContact } from '$lib/backend'
	let { data } = $props()
	let contactDetail = $state(data.contact || { firstname: '', lastname: '', email: '', notes: '' })
	let notesTextarea: HTMLTextAreaElement
	console.log('$page.url.pathname', $page.url.pathname)
	let isNewContact = $derived($page.url.pathname.split('/').pop() === 'new')
	console.log($page.url.pathname.split('/').pop())

	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	async function handleSave() {
		if (!contactDetail.email) {
			showToast($t('contactDetail.emailMissing'), { type: 'error' })
			return
		}

		if (!isValidEmail(contactDetail.email)) {
			showToast($t('contactDetail.emailInvalid'), { type: 'error' })
			return
		}

		const { error } = await saveContact(contactDetail)
		if (error) {
			console.error('Error saving contact:', error)
			showToast($t('contactDetail.saveError'), { type: 'error' })
		} else {
			setTimeout(() => {
				showToast($t('contactDetail.saveSuccess'), { type: 'success' })
			}, 100)
			goto('/dashboard/contacts')
		}
	}

	async function handleDelete() {
		if (confirm($t('contactDetail.deleteConfirmation'))) {
			const { error } = await deleteContact(contactDetail.id)
			if (error) {
				console.error('Error deleting contact:', error)
			} else {
				goto('/dashboard/contacts')
			}
		}
	}

	function handleBackToContacts() {
		goto('/dashboard/contacts')
	}

	function handleSubmit(event: Event) {
		event.preventDefault()
		handleSave()
	}

	function autoGrow() {
		if (notesTextarea) {
			notesTextarea.style.height = 'auto'
			notesTextarea.style.height = notesTextarea.scrollHeight + 'px'
		}
	}

	onMount(() => {
		autoGrow()
	})

	$effect(() => {
		autoGrow()
	})
</script>

<MainLayout>
	<div slot="top-right" class="flex space-x-2">
		<button
			onclick={handleBackToContacts}
			class="p-2 rounded-full hover:bg-muted transition-colors duration-200"
			aria-label={$t('common.cancel')}
		>
			<X class="w-6 h-6" />
		</button>
		<button
			onclick={handleSave}
			class="p-2 rounded-full hover:bg-muted transition-colors duration-200"
			aria-label={$t('common.save')}
		>
			<Check class="w-6 h-6" />
		</button>
	</div>
	<div slot="title">
		{isNewContact ? $t('contactDetail.createNew') : $t('contactDetail.editContact')}
	</div>
	<div slot="content">
		<div class="max-w-2xl mx-auto mt-8">
			<form class="space-y-4" onsubmit={handleSubmit}>
				<div class="w-full p-2 border rounded bg-background">
					<label for="firstname" class="block text-sm font-medium text-foreground"
						>{$t('contactDetail.firstName')}</label
					>
					<input
						id="firstname"
						type="text"
						bind:value={contactDetail.firstname}
						class={cn(
							'mt-1 p-2 w-full bg-background border rounded',
							'text-foreground placeholder:text-muted-foreground',
							'focus:ring-ring focus:border-ring'
						)}
					/>
				</div>

				<div class="w-full p-2 border rounded bg-background">
					<label for="lastname" class="block text-sm font-medium text-foreground"
						>{$t('contactDetail.lastName')}</label
					>
					<input
						id="lastname"
						type="text"
						bind:value={contactDetail.lastname}
						class={cn(
							'mt-1 p-2 w-full bg-background border rounded',
							'text-foreground placeholder:text-muted-foreground',
							'focus:ring-ring focus:border-ring'
						)}
					/>
				</div>

				<div class="w-full p-2 border rounded bg-background">
					<label for="email" class="block text-sm font-medium text-foreground"
						>{$t('contactDetail.email')}</label
					>
					<input
						id="email"
						type="email"
						bind:value={contactDetail.email}
						class={cn(
							'mt-1 p-2 w-full bg-background border rounded',
							'text-foreground placeholder:text-muted-foreground',
							'focus:ring-ring focus:border-ring'
						)}
					/>
				</div>

				<div class="w-full p-2 border rounded bg-background">
					<label for="notes" class="block text-sm font-medium text-foreground"
						>{$t('contactDetail.notes')}</label
					>
					<textarea
						id="notes"
						bind:value={contactDetail.notes}
						bind:this={notesTextarea}
						oninput={autoGrow}
						rows="1"
						class={cn(
							'mt-1 p-2 w-full bg-background border rounded',
							'text-foreground placeholder:text-muted-foreground',
							'resize-none overflow-hidden'
						)}
					></textarea>
				</div>

				{#if !isNewContact}
					<div class="flex justify-start mt-4">
						<button
							type="button"
							onclick={handleDelete}
							class="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
						>
							{$t('common.delete')}
						</button>
					</div>
				{/if}
			</form>
		</div>
	</div>
</MainLayout>
