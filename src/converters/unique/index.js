export function unique(array) {
	return array.filter((item, pos, thisArray) => thisArray.indexOf(item) === pos);
}
