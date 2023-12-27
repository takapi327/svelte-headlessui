<script lang="ts" context="module">
	import { getContext, hasContext, setContext, tick } from 'svelte'

	export enum DialogStates {
		Open,
		Closed
	}

	export type DialogContext = {
		readonly dialogState: DialogStates
		readonly titleId: string
		open: (id?: string) => void
		close: () => void
	}

	const DIALOG_CONTEXT_NAME = 'dialog-context'
	export const useDialogContext = (component: string): DialogContext => {
		if (!hasContext(DIALOG_CONTEXT_NAME)) {
			throw new Error(`<${component} /> is missing a parent <Dialog /> component.`)
		}
		return getContext<DialogContext>(DIALOG_CONTEXT_NAME)
	}
</script>

<script lang="ts" generics="TSlotProps">
	import Render from '@/internal/Render.svelte'
	import { uniqueId } from '@/internal/unique-id'
	import { Keyboard } from '@/internal/keyboard'

	let { open, onclose, children, ...restProps } = $props<{ open: boolean }>()

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
				onclose()
			}
		}
	}

	const dialogContext = dialogContextState()
	setContext<DialogContext>(DIALOG_CONTEXT_NAME, dialogContext)

	const unique = uniqueId()
	const id = `dialog-${unique}`
	const titleId = `dialog-title-${unique}`

	// Handle outside click
	async function handleWindowMousedown(event: MouseEvent) {
		const target = event.target as HTMLElement

		if (dialogContext.dialogState !== DialogStates.Open) return

		dialogContext.close()
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
	}

	function handleClick(e: CustomEvent) {
		const event = e as never as MouseEvent
		event.stopPropagation()
	}

	const visible = $derived<boolean>(dialogContext.dialogState === DialogStates.Open)

	const propsWeControl = $derived({
		id,
		'role': 'dialog',
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
			dialogContext.open(titleId)
		} else {
			dialogContext.close()
		}
	})
</script>

<svelte:window onmousedown={handleWindowMousedown} onkeydown={handleWindowKeydown} />
<Render
	name="Dialog"
	tag="div"
	{...{ ...restProps, ...slotProps, ...propsWeControl }}
	{...$$slots}
	{visible}
	onmousedown={handleClick}
>
	{@render children()}
</Render>
