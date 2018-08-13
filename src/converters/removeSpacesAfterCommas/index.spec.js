import { removeSpacesAfterCommas } from '.';

describe('Module: removeSpacesAfterCommas', () => {
	const suites = [
		{
			str: 'foo , bar , baz',
			expected: 'foo ,bar ,baz',
		},
		{
			str: 'foo,  bar,  baz',
			expected: 'foo,bar,baz',
		},
		{
			str: 'foo,  bar,  baz',
			expected: 'foo,bar,baz',
		},
		{
			str: 'foo   ,   bar   ,   baz',
			expected: 'foo   ,bar   ,baz',
		},
		{
			str: 'foo,\nbar,\nbaz',
			expected: 'foo,bar,baz',
		},
	];

	suites.forEach((suite) => {
		it(`should return string without extra spaces ${suite.str}`, () => {
			expect(removeSpacesAfterCommas(suite.str)).toBe(suite.expected);
		});
	});
});
