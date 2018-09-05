import { trimSpacesNearParentheses } from '.';

describe('Module: trimSpacesNearParentheses', () => {
	const suites = [
		{
			str: 'foo(  )',
			expected: 'foo()',
		},
		{
			str: 'foo(     )',
			expected: 'foo()',
		},
		{
			str: 'foo(    ),  bar(    ),  baz(    )',
			expected: 'foo(),  bar(),  baz()',
		},
	];

	suites.forEach((suite) => {
		it(`should return string without extra spaces near parentheses ${suite.str}`, () => {
			expect(trimSpacesNearParentheses(suite.str)).toBe(suite.expected);
		});
	});
});
