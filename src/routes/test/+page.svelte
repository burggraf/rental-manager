<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Content from "$lib/components/Content.svelte";
    import StatusBar from "$lib/components/StatusBar.svelte";
</script>

<div class="flex flex-col min-h-screen pt-[var(--header-height)]">
    <Navbar>
        <div slot="title">
            Test Page
        </div>
        <div slot="top-right">TR</div>
    </Navbar>
    <Content>
        <div class="pl-1 pr-1 pt-4 pb-4">
            <h1 class="text-2xl font-bold mb-4">Test Content</h1>
            <p class="mb-4">This content should start at the top, just below the Navbar.</p>
            {#each Array(20) as _, i}
                <p class="mb-4">Paragraph {i + 1}</p>
            {/each}
        </div>
    </Content>
    <StatusBar />
</div>
