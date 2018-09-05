export function trimExtraSpaces(str) {
	return str.trim().replace(/\s{2,}/g, ' ');
}
