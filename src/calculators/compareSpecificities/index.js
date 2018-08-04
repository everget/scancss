export function compareSpecificities(specArray1, specArray2) {
	if (specArray1[0] < specArray2[0]) {
		return 1;
	}

	if (specArray1[0] > specArray2[0]) {
		return -1;
	}

	if (specArray1[1] < specArray2[1]) {
		return 1;
	}

	if (specArray1[1] > specArray2[1]) {
		return -1;
	}

	if (specArray1[2] < specArray2[2]) {
		return 1;
	}

	if (specArray1[2] > specArray2[2]) {
		return -1;
	}

	return 0;
}
