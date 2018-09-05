import { trimExtraSpaces } from '../trimExtraSpaces';
import { trimSpacesNearColon } from '../trimSpacesNearColon';
import { trimSpacesNearCommas } from '../trimSpacesNearCommas';
import { trimSpacesNearParentheses } from '../trimSpacesNearParentheses';
import { trimTrailingZeros } from '../trimTrailingZeros';
import { trimLeadingZeros } from '../trimLeadingZeros';
import { transformString } from '.';

describe('Module: transformString', () => {
	const suites = [
		{
			str: '',
			expected: '',
		},
		{
			str: '  foo  ',
			expected: 'foo',
		},
		{
			str: '   foo   ,   bar   ,   baz   ',
			expected: 'foo,bar,baz',
		},
		{
			str: 'foo,\n\nbar,\n\nbaz',
			expected: 'foo,bar,baz',
		},
		{
			str: '   foo   \n,   \nbar   ,   baz\n   ',
			expected: 'foo,bar,baz',
		},
		{
			str: 'cubic-bezier(  0.470  ,   0   ,   0.740   ,  0.7150  )',
			expected: 'cubic-bezier(.47,0,.74,.715)',
		},
		{
			str: 'only   screen   and    (  max-height:     440px  )  ,   only   screen     and (           max-width:   600px )',
			expected: 'only screen and (max-height:440px),only screen and (max-width:600px)',
		},
		{
			str: '  screen  and  (   min-width:   0.100dpcm   )',
			expected: 'screen and (min-width:.1dpcm)',
		},
	];

	suites.forEach((suite) => {
		it(`should return string with applied transformers ${suite.str}`, () => {
			const processedString = transformString(
				suite.str,
				[
					trimExtraSpaces,
					trimSpacesNearCommas,
					trimSpacesNearParentheses,
					trimSpacesNearColon,
					trimTrailingZeros,
					trimLeadingZeros,
				]
			);

			expect(processedString).toBe(suite.expected);
		});
	});
});
