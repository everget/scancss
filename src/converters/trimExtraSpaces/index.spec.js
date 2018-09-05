import { trimExtraSpaces } from '.';

describe('Module: trimExtraSpaces', () => {
	const suites = [
		{
			str: '',
			expected: '',
		},
		{
			str: ' foo , bar , baz ',
			expected: 'foo , bar , baz',
		},
		{
			str: '  foo  ',
			expected: 'foo',
		},
		{
			str: 'foo,  bar,  baz',
			expected: 'foo, bar, baz',
		},
		{
			str: '  foo,  bar,  baz  ',
			expected: 'foo, bar, baz',
		},
		{
			str: '   foo   ,   bar   ,   baz   ',
			expected: 'foo , bar , baz',
		},
		{
			str: 'foo,\n\nbar,\n\nbaz',
			expected: 'foo, bar, baz',
		},
		{
			str: '   foo   \n,   \nbar   ,   baz\n   ',
			expected: 'foo , bar , baz',
		},
		{
			str: 'cubic-bezier(  .47  ,   0   ,   .745   ,  .715  )',
			expected: 'cubic-bezier( .47 , 0 , .745 , .715 )',
		},
		{
			str: '@media  screen  and  (   min-width:   992px   ) {}',
			expected: '@media screen and ( min-width: 992px ) {}',
		},
	];

	suites.forEach((suite) => {
		it(`should return string without extra spaces ${suite.str}`, () => {
			expect(trimExtraSpaces(suite.str)).toBe(suite.expected);
		});
	});
});
