export function removeIntegerPart(str) {
	return str.replace(/[0-9]+\./g, '');
}
