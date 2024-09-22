<script lang="ts">
	import { LogOut, Home, ShoppingCart, Package, UsersRound } from 'lucide-svelte';
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import { page } from '$app/stores';

	export let closeSheet: () => void;

	// Define the sidebar navigation structure
	const sidebarNavigation = [
		{
			category: "Dashboard",
			icon: Home,
			items: [
				{ label: "Overview", href: "/dashboard" },
				{ label: "Analytics", href: "/dashboard/analytics" }
			]
		},
		{
			category: "Orders",
			icon: ShoppingCart,
			items: [
				{ label: "Recent Orders", href: "/dashboard/orders" },
				{ label: "Returns", href: "/dashboard/orders/returns" }
			]
		},
		{
			category: "Products",
			icon: Package,
			items: [
				{ label: "Inventory", href: "/dashboard/products" },
				{ label: "Categories", href: "/dashboard/products/categories" }
			]
		},
		{
			category: "Customers",
			icon: UsersRound,
			items: [
				{ label: "List", href: "/dashboard/customers" },
				{ label: "Segments", href: "/dashboard/customers/segments" }
			]
		}
	];

	function handleNavClick(event: Event) {
		// Close the sheet after a short delay to allow the click event to propagate
		setTimeout(() => closeSheet(), 100);
	}
</script>

<div class="px-4 py-6 border-b">
	<h2 class="text-lg font-semibold">Acme Inc</h2>
	<p class="text-sm text-muted-foreground">Dashboard</p>
	<p class="mt-2 text-sm">user@example.com</p>
	<Button variant="outline" size="sm" class="mt-2">
		<LogOut class="mr-2 h-4 w-4" />
		Log out
	</Button>
</div>

<nav class="flex-1 px-2 py-4">
	<Accordion.Root type="single" collapsible>
		{#each sidebarNavigation as { category, icon: Icon, items }, index}
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
		{/each}
	</Accordion.Root>
</nav>

<div class="mt-auto px-4 py-6 border-t">
	<div class="flex items-center justify-between mb-4">
		<div>
			<p class="text-sm font-medium">Current Plan</p>
			<p class="text-xs text-muted-foreground">Pro</p>
		</div>
		<Button size="sm">Upgrade</Button>
	</div>
	<div class="flex justify-between text-xs text-muted-foreground">
		<a href="##">Terms of Service</a>
		<a href="##">Privacy Policy</a>
	</div>
</div>
