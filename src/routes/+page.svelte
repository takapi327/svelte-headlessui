<script lang="ts">
	import Render from '@/internal/Render.svelte'
	import { Dialog, DialogTitle, DialogOverlay } from '@/component/dialog'

	let isOpen = true
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Render name="Div" tag="div" class="test" style="color: red">
	<p>Rendered with a custom component</p>
</Render>

<p>Dialog open {isOpen}</p>

{#if !isOpen}
	<button on:click={() => (isOpen = true)}>Open Dialog</button>
{/if}

<DialogOverlay style="position: fixed; top: 0; left: 0; background-color: rgb(0 0 0); opacity: 0.3; height: 100vh; width: 100vw;"/>
<Dialog
	open={isOpen}
	onclose={ () => isOpen = false }
	class="test"
	style="position: fixed; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%); background-color: white; width: 400px; height: 120px; padding: 8px; border-radius: 8px;"
>

	<DialogTitle>Dialog Title</DialogTitle>
	<button on:click={() => (isOpen = false)}>Deactivate</button>
	<button on:click={() => (isOpen = false)}>Cancel</button>
</Dialog>
