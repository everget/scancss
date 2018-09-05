import { trimSpacesNearColon } from '.';

describe('Module: trimSpacesNearColon', () => {
	const suites = [
		{
			str: 'foo: bar',
			expected: 'foo:bar',
		},
		{
			str: 'foo : bar',
			expected: 'foo:bar',
		},
		{
			str: 'foo  :  bar',
			expected: 'foo:bar',
		},
		{
			str: 'foo : bar, foo : baz',
			expected: 'foo:bar, foo:baz',
		},
		{
			str: 'foo:\nbar, foo:\nbaz',
			expected: 'foo:bar, foo:baz',
		},
	];

	suites.forEach((suite) => {
		it(`should return string without extra spaces near colons ${suite.str}`, () => {
			expect(trimSpacesNearColon(suite.str)).toBe(suite.expected);
		});
	});
});
