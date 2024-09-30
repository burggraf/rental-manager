<script lang="ts">
	import { page } from '$app/stores';
	import * as Accordion from "$lib/components/ui/accordion/index.js";

	export let sidebarNavigation: Array<{
		category: string;
		icon: any;
		items: Array<{ label: string; href: string }>;
	}>;
	export let closeSheet: () => void;

	function handleNavClick(event: Event) {
		setTimeout(() => closeSheet(), 100);
	}
</script>

<nav class="flex-1 py-2">
	<Accordion.Root type="single" collapsible>
		{#each sidebarNavigation as { category, icon: Icon, items }, index}
			{#if items.length > 0}
				<Accordion.Item value={category.toLowerCase()} class="border-none">
					<Accordion.Trigger
						class="flex w-full items-center justify-start px-2 py-2 text-sm hover:bg-muted/50 data-[state=open]:bg-muted no-underline"
					>
						<Icon class="mr-2 h-4 w-4" />
						{category}
					</Accordion.Trigger>
					<Accordion.Content class="py-1">
						{#each items as { label, href }}
							<a 
								{href} 
								class="block py-2 px-6 text-sm hover:bg-muted/50 no-underline" 
								class:bg-muted={$page.url.pathname === href}
								onclick={handleNavClick}
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
