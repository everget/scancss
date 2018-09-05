import { intersection } from '.';

describe('Module: intersection', () => {
	const suites = [
		{
			arrays: [
				[2, 1],
				[2, 3],
			],
			expected: [2],
		},
		{
			arrays: [
				[1, 2, 1, 1, 3],
				[1],
			],
			expected: [1],
		},
		{
			arrays: [
				[0, 345, 324],
				[1, 0, 324],
			],
			expected: [0, 324],
		},
		{
			arrays: [
				[0, 1],
				[2, 3],
			],
			expected: [],
		},
		{
			arrays: [
				['Clementine', 'Clementine', 'Kenny'],
				['Kenny', 'Kenny', 'Clementine'],
			],
			expected: ['Clementine', 'Kenny'],
		},
		{
			arrays: [
				['cannavaro', 'maldini', 'nesta', 'delpiero', 'pirlo'],
				['delpiero', 'derossi', 'gattuso', 'totti', 'buffon', 'cannavaro'],
			],
			expected: ['cannavaro', 'delpiero'],
		},
	];

	suites.forEach((suite) => {
		it(`should correctly find intersection of arrays: ${JSON.stringify(suite.arrays)}`, () => {
			expect(intersection(...suite.arrays)).toStrictEqual(suite.expected);
		});
	});
});
