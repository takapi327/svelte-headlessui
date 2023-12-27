export function match<
	TValue extends string | number = string,
	TReturnValue = unknown
>(
	value: TValue,
	lookup: Record<TValue, TReturnValue | ((...args: never[]) => TReturnValue)>,
	...args: never[]
): TReturnValue {
	if (value in lookup) {
		let returnValue = lookup[value];
		return typeof returnValue === "function"
			? returnValue(...args)
			: returnValue
	}

	const error = new Error(
		`Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${Object.keys(
			lookup
		)
			.map((key: never) => `"${key}"`)
			.join(", ")}.`
	)
	if (Error.captureStackTrace) Error.captureStackTrace(error, match)
	throw error
}
