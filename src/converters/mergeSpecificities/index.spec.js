import { mergeSpecificities } from '.';

describe('Module: mergeSpecificities', () => {
	const suites = [
		{
			arrays: [
				[0, 0, 1],
				[0, 1, 0],
			],
			expected: [0, 1, 1],
		},
		{
			arrays: [
				[0, 0, 1],
				[0, 1, 0],
				[1, 0, 0],
			],
			expected: [1, 1, 1],
		},
		{
			arrays: [
				[0, 0, 1],
				[0, 1, 0],
				[0, 1, 1],
				[1, 0, 0],
			],
			expected: [1, 2, 2],
		},
		{
			arrays: [
				[0, 0, 1],
				[0, 1, 0],
				[0, 1, 1],
				[1, 0, 0],
				[1, 0, 1],
			],
			expected: [2, 2, 3],
		},
	];

	suites.forEach((suite) => {
		it(`should correctly merge arrays: ${JSON.stringify(suite.arrays)}`, () => {
			expect(mergeSpecificities(...suite.arrays)).toStrictEqual(suite.expected);
		});
	});
});
