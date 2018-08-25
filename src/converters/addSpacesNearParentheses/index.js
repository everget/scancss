export function addSpacesNearParentheses(str, before = 2, after = 2) {
	return str
		.replace(/\(/g, '(' + ' '.repeat(after))
		.replace(/\)/g, ' '.repeat(before) + ')');
}
