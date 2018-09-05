export function transformString(str, transformers) {
	return transformers.reduce(
		(acc, transformer) => transformer(acc),
		str
	);
}
