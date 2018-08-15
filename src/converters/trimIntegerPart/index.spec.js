import { trimIntegerPart } from '.';

describe('Module: trimIntegerPart', () => {
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
			expect(trimIntegerPart(suite.str)).toBe(suite.expected);
		});
	});
});
