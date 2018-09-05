import { compareSpecificities } from '.';

describe('Module: compareSpecificities', () => {
	const suites = [
		{
			arrays: [
				[0, 0, 1],
				[0, 1, 0],
			],
			expected: 1,
		},
		{
			arrays: [
				[1, 0, 1],
				[0, 1, 0],
			],
			expected: -1,
		},
		{
			arrays: [
				[0, 1, 1],
				[0, 1, 0],
			],
			expected: -1,
		},
		{
			arrays: [
				[0, 0, 1],
				[0, 0, 2],
			],
			expected: 1,
		},
		{
			arrays: [
				[0, 1, 1],
				[0, 1, 1],
			],
			expected: 0,
		},
		{
			arrays: [
				[1, 1, 1],
				[1, 1, 1],
			],
			expected: 0,
		},
	];

	suites.forEach((suite) => {
		it(`should correctly compare arrays: ${JSON.stringify(suite.arrays)}`, () => {
			expect(compareSpecificities(...suite.arrays)).toStrictEqual(suite.expected);
		});
	});
});
