export function addSpacesNearCommas(str, before = 2, after = 2) {
	return str.replace(/,/g, ' '.repeat(before) + ',' + ' '.repeat(after));
}

