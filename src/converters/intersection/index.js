import { unique } from '../unique';

export function intersection(array1, array2) {
	const set1 = unique(array1);
	const set2 = unique(array2);

	return Array.from(
		new Set(set1.filter((item) => set2.includes(item)))
	);
}
