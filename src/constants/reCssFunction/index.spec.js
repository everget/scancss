import { cssFunctions } from '../cssFunctions';
import { reCssFunction } from '.';

describe('Module: reCssFunction', () => {
	describe('Positives', () => {
		describe('Matching CSS function', () => {
			cssFunctions
				.map((func) => func + '(...)')
				.forEach((func) => {
					it(`should match ${func}`, () => {
						expect(func.match(reCssFunction)[0].slice(0, -1)).toBe(func.slice(0, func.indexOf('(')));
					});
				});
		});

		describe('Matching many CSS functions from string', () => {
			const suites = [
				{
					str: 'transform: translateY(-150%) scale(.8) rotate(180deg);',
					expected: [
						'translateY',
						'scale',
						'rotate',
					],
				},
				{
					str: 'background: hsl(var(--hue), 90%, 52%);',
					expected: [
						'hsl',
						'var',
					],
				},
			];

			suites.forEach((suite) => {
				expect(suite.str.match(reCssFunction).map((func) => func.slice(0, -1))).toEqual(suite.expected);
			});
		});
	});

	describe('Negatives', () => {
		const notCssFunctions = [
			'foo()',
			'foobar()',
			'baz()',
			'tada123()',
			'matrix2d()',
		];

		notCssFunctions.forEach((func) => {
			it(`should not match ${func}`, () => {
				expect(func.match(reCssFunction)).toBe(null);
			});
		});
	});
});
