import { trimTrailingZeros } from '.';

describe('Module: trimTrailingZeros', () => {
	const suites = [
		{
			str: 'foo, 0.00, 1.234000, 12345.678900, 123000000000000000000.00, baz',
			expected: 'foo, 0, 1.234, 12345.6789, 123000000000000000000, baz',
		},
		{
			str: 'foo 0.00 1.234000 12345.678900 123000000000000000000.00 baz',
			expected: 'foo 0 1.234 12345.6789 123000000000000000000 baz',
		},
	];

	suites.forEach((suite) => {
		it(`should return string with numbers without trailing zeros ${suite.str}`, () => {
			expect(trimTrailingZeros(suite.str)).toBe(suite.expected);
		});
	});
});
