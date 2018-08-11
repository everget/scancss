export function intersection(array1, array2) {
	const set1 = new Set(array1);
	const set2 = new Set(array2);

	return Array.from(new Set([...set1].filter((item) => set2.has(item))));
}
