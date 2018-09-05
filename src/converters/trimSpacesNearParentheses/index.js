export function trimSpacesNearParentheses(str) {
	return str.replace(/\(\s*/g, '(').replace(/\s*\)/g, ')');
}
