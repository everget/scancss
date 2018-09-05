import { difference } from '.';

describe('Module: difference', () => {
	const suites = [
		{
			arrays: [
				[2, 1],
				[2, 3],
			],
			expected: [1],
		},
		{
			arrays: [
				[2, 3],
				[2, 1],
			],
			expected: [3],
		},
		{
			arrays: [
				[1, 2, 1, 1, 3],
				[1],
			],
			expected: [2, 3],
		},
		{
			arrays: [
				[0, 345, 324],
				[1, 0, 324],
			],
			expected: [345],
		},
		{
			arrays: [
				[0, 1],
				[2, 3],
			],
			expected: [0, 1],
		},
		{
			arrays: [
				[2, 3],
				[0, 1],
			],
			expected: [2, 3],
		},
		{
			arrays: [
				['Clementine', 'Clementine', 'Kenny'],
				['Kenny', 'Kenny', 'Clementine'],
			],
			expected: [],
		},
		{
			arrays: [
				['cannavaro', 'maldini', 'nesta', 'delpiero', 'pirlo'],
				['delpiero', 'derossi', 'gattuso', 'totti', 'buffon', 'cannavaro'],
			],
			expected: ['maldini', 'nesta', 'pirlo'],
		},
		{
			arrays: [
				['delpiero', 'derossi', 'gattuso', 'totti', 'buffon', 'cannavaro'],
				['cannavaro', 'maldini', 'nesta', 'delpiero', 'pirlo'],
			],
			expected: ['derossi', 'gattuso', 'totti', 'buffon'],
		},
	];

	suites.forEach((suite) => {
		it(`should correctly find difference of arrays: ${JSON.stringify(suite.arrays)}`, () => {
			expect(difference(...suite.arrays)).toStrictEqual(suite.expected);
		});
	});
});
