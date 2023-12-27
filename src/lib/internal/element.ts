import { type SvelteComponent } from 'svelte'

const ELEMENTS = [
	'a',
	'div',
	'ul',
	'ol',
	'li',
	'button',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
] as const

export type Elements = typeof ELEMENTS[number]
export type SupportedElements = Elements | SvelteComponent

export const isValidElement = (element: SupportedElements): boolean => {
  return !(typeof element === 'string' && !ELEMENTS.includes(element))
}
