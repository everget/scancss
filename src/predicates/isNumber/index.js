export function isNumber(value) {
	return typeof value === 'number' && Number.isFinite(value);
}
