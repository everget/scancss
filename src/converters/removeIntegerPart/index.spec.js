import { removeIntegerPart } from '.';

describe('Module: removeIntegerPart', () => {
	const suites = [
		{
			str: '0.001 0.01 0.1',
			expected: '001 01 1',
		},
		{
			str: '0.001, 0.01, 0.1',
			expected: '001, 01, 1',
		},
	];

	suites.forEach((suite) => {
		it(`should remove integer part from decimals in string ${suite.str}`, () => {
			expect(removeIntegerPart(suite.str)).toBe(suite.expected);
		});
	});
});
