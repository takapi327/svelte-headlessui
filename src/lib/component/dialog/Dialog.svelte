<script lang="ts" context="module">
	import { tick } from 'svelte'

	export enum DialogStates {
		Open,
		Closed,
	}

	export type DialogContext = {
		readonly dialogState: DialogStates
		readonly titleId: string
		open: (id?: string) => void
		close: () => void
	}

	const dialogContextState = (): DialogContext => {
		let dialogState = $state<DialogStates>(DialogStates.Closed)
		let titleId = $state<string>(undefined)

		return {
			get dialogState() {
				return dialogState
			},
			get titleId() {
				return titleId
			},
			open: (id?: string) => {
				titleId = id
				dialogState = DialogStates.Open
			},
			close: () => {
				dialogState = DialogStates.Closed
			},
		}
	}

	export const dialogContext = dialogContextState()
</script>

<script lang="ts" generics="TSlotProps">
	import Render from '@/internal/Render.svelte'
	import { uniqueId } from '@/internal/unique-id'
	import { Keyboard } from '@/internal/keyboard'

	let { open, onclose, children, ...restProps } = $props<{ open: boolean }>()

	const id = `dialog-${ uniqueId() }`

	// Handle outside click
	async function handleWindowMousedown(event: MouseEvent) {
	  const target = event.target as HTMLElement

		if (dialogContext.dialogState !== DialogStates.Open) return

		dialogContext.close()
		onclose()
		await tick()
		target?.focus()
	}

	// Handle `Escape` to close
	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key !== Keyboard.Escape) return
		if (dialogContext.dialogState !== DialogStates.Open) return
		event.preventDefault()
		event.stopPropagation()
		dialogContext.close()
		onclose()
	}

	function onclick(e: CustomEvent) {
		console.log('Element was clicked')
		const event = e as never as MouseEvent
		event.stopPropagation()
	}

	const visible = $derived<boolean>(dialogContext.dialogState === DialogStates.Open)

	const propsWeControl = $derived({
		id,
		role: 'dialog',
		'aria-modal': dialogContext.dialogState === DialogStates.Open ? true : undefined,
		'aria-labelledby': dialogContext.titleId
	})

	const slotProps = $derived({ open })

	$effect(() => {
		if (typeof open !== 'boolean') {
			throw new Error(
				`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${open}`
			)
		}

		if (open) {
			dialogContext.open(id)
		} else {
		  dialogContext.close()
			onclose()
		}
	})
</script>

<svelte:window
	onMousedown={handleWindowMousedown}
	onKeydown={handleWindowKeydown}
/>
<Render
	name="Dialog"
	tag="div"
	{...{ ...restProps, ...slotProps, ...propsWeControl }}
	{...$$slots}
	{visible}
	{onclick}
>
	{@render children(slotProps)}
</Render>
