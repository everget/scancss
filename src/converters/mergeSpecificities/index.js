export function mergeSpecificities(...arrays) {
	return arrays.reduce((acc, array) => {
		acc[0] += array[0];
		acc[1] += array[1];
		acc[2] += array[2];
		return acc;
	}, [0, 0, 0]);
}
