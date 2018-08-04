export function removeExtraSpaces(str) {
	return str.trim()
		.replace(/\s{2,}/g, '')
		.replace(/\s?,\s?/g, ',')
		.replace(/\(\s/g, '(')
		.replace(/\s\)/g, ')')
		.replace(/:\s/g, ':');
}
