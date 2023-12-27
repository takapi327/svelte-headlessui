<svelte:options runes={true} />

<script lang="ts" generics="TaggedAs extends SupportedElements">
  import { isValidElement, type SupportedElements } from './element'

  let {
    name,
    tag,
    visible = true,
    style,
    children,
    ...restProps
  } = $props<{
    name: string
    tag: TaggedAs
    visible: boolean
    style?: string
  }>()

  if (!tag) {
    throw new Error(`<${name}> did not provide an tag value to <Render>`)
  }

  if (!isValidElement(tag)) {
    throw new Error(`<${name}> has an invalidator unsupported tag prop: ${tag}`)
  }

  const propsWeControl = $derived({
    style: `${style ?? ''}${visible ? '' : 'display: none'}`
  })
</script>

<svelte:element this={tag} {...restProps} {...$$slots} {...propsWeControl}>
  {@render children()}
</svelte:element>
