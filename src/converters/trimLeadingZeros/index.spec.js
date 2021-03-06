import { trimLeadingZeros } from '.';

describe('Module: trimLeadingZeros', () => {
	const suites = [
		{
			str: '0.001 0.01 0.1',
			expected: '.001 .01 .1',
		},
		{
			str: '0.001, 0.01, 0.1',
			expected: '.001, .01, .1',
		},
	];

	suites.forEach((suite) => {
		it(`should remove leading zeros from decimals in string ${suite.str}`, () => {
			expect(trimLeadingZeros(suite.str)).toBe(suite.expected);
		});
	});
});
