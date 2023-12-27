/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'quotes': [2, 'single'],
		'no-console': 2,
		'no-var': 2,
		'max-len': [2, { code: 180 }],
		'no-inner-declarations': 2,
		'no-throw-literal': 2,
		'prefer-const': 2,
		'prefer-object-spread': 2,
		'quote-props': [2, 'consistent'],
		'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
		'comma-spacing': [2, { 'before': false, 'after': true }],
		'key-spacing': [2, { 'beforeColon': false, 'afterColon': true, 'align': 'value'  }],
		'keyword-spacing': [2, { 'before': true }],
		'space-infix-ops': 2,
		'semi': [2, 'never', {'beforeStatementContinuationChars': 'never'}],
		'semi-spacing': [2, {'after': true, 'before': false}],
		'semi-style': [2, 'first'],
		'no-extra-semi': 2,
		'no-unexpected-multiline': 2,
		'no-unreachable': 2,
		'svelte/no-dupe-else-if-blocks': 2,
		'svelte/button-has-type': 2,
		'svelte/no-at-debug-tags': 2,
		'svelte/spaced-html-comment': 2,
	}
}
