export function trimIntegerPart(str) {
	return str.replace(/(^|[^0-9])[0-9]+\.([0-9]+)/g, '$1$2');
}
