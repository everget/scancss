import { reCssVariable } from '.';

describe('Module: reCssVariable', () => {
	describe('Positives', () => {
		const cssVariables = [
			'--m',
			'--var',
			'--foo',
			'---bar',
			'--header-color',
			'--main-bg-color',
			'--COLOR',
			'--h1color',
			'--h1-color',
			'--h1_color',
			'--h-1_color',
		];

		cssVariables.forEach((value) => {
			it(`should match CSS variable ${value}`, () => {
				expect(value.match(reCssVariable)[0]).toBe(value);
			});
		});

		describe('Matching CSS variable from strings', () => {
			const suites = [
				{
					str: 'border-color:--color-black',
					expected: '--color-black',
				},
				{
					str: 'color: --color-red',
					expected: '--color-red',
				},
				{
					str: 'background: none 0% 0% --color-blue',
					expected: '--color-blue',
				},
			];

			suites.forEach((suite) => {
				it(`should match CSS variable from string ${suite.str}`, () => {
					expect(suite.str.match(reCssVariable)[0]).toBe(suite.expected);
				});
			});
		});
	});

	describe('Negatives', () => {
		const notCssVariables = [
			'foo',
			'-bar',
			'-webkit',
			'--4g1',
			'--#7f68ZY',
		];

		notCssVariables.forEach((value) => {
			it(`should not match non-CSS variable ${value}`, () => {
				expect(value.match(reCssVariable)).toBe(null);
			});
		});
	});
});
