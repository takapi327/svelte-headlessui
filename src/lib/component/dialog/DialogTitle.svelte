<script lang="ts" generics="TaggedAs extends SupportedElements">
	import Render from '@/internal/Render.svelte'
	import { DialogStates, useDialogContext } from './Dialog.svelte'
	import { uniqueId } from '@/internal/unique-id'

	let { tag = 'h2', children, ...restProps } = $props<{ tag: TaggedAs }>()

	const dialogContext = useDialogContext('DialogTitle')
	const id = dialogContext.titleId || `dialog-title-${ uniqueId() }`

	const propsWeControl = $derived({ id })
	const slotProps = $derived({ open: dialogContext.dialogState === DialogStates.Open })
</script>

<Render
	name="DialogTitle"
	{tag}
	{...slotProps}
	{...{ ...restProps, ...propsWeControl }}
>
	{@render children()}
</Render>
