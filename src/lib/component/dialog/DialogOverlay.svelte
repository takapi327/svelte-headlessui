<script lang="ts" generics="TSlotProps, TaggedAs extends SupportedElements">
	import Render from '@/internal/Render.svelte'
	import { DialogStates, useDialogContext } from './Dialog.svelte'
	import { uniqueId } from '@/internal/unique-id'

	let { tag = 'div', children, ...restProps } = $props<{ tag: TaggedAs }>()

	const id = `dialog-overlay-${ uniqueId() }`
	const dialogContext = useDialogContext('DialogOverlay')

	function onclick(e: CustomEvent) {
		let event = e as never as MouseEvent
		if (event.target !== event.currentTarget) return
		event.preventDefault()
		event.stopPropagation()
		dialogContext.close()
	}

	const visible = $derived<boolean>(dialogContext.dialogState === DialogStates.Open)

	const propsWeControl = $derived({
		id,
		'aria-hidden': true,
	})

	const slotProps = $derived({ open: dialogContext.dialogState === DialogStates.Open })
</script>

<Render
	name="DialogOverlay"
	{tag}
	{...{ ...restProps, ...propsWeControl }}
	{...slotProps}
	{visible}
	{onclick}
>
	{#if (children)}
		{@render children(slotProps)}
	{/if}
</Render>
