import { trimQuotes } from '.';

describe('Module: trimQuotes', () => {
	const suites = [
		{
			str: '\"navigation.css\"',
			expected: 'navigation.css',
		},
		{
			str: '\'printstyle.css\'',
			expected: 'printstyle.css',
		},
		{
			str: '     \"navigation.css\",    \'printstyle.css\' , \"\'bluish.css\'\"',
			expected: '     navigation.css,    printstyle.css , bluish.css',
		},
	];

	suites.forEach((suite) => {
		it(`should return string without quotes ${suite.str}`, () => {
			expect(trimQuotes(suite.str)).toBe(suite.expected);
		});
	});
});
