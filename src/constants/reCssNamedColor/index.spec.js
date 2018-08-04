import { cssColorNamesMap } from '../cssColorNamesMap';
import { reCssNamedColor } from '.';

describe('Module: reCssNamedColor', () => {
	describe('Positives', () => {
		describe('Matching lowercase color names', () => {
			Object.keys(cssColorNamesMap).forEach((color) => {
				it(`should match ${color}`, () => {
					expect(color.match(reCssNamedColor)[0]).toBe(color);
				});
			});
		});

		describe('Matching uppercase color names', () => {
			Object.keys(cssColorNamesMap)
				.map((color) => color.toUpperCase())
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reCssNamedColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching capitalized color names', () => {
			Object.keys(cssColorNamesMap)
				.map((color) => color.charAt(0).toUpperCase() + color.slice(1))
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reCssNamedColor)[0]).toBe(color);
					});
				});
		});
	});

	describe('Negatives', () => {
		const notCssNamedColors = [
			'foobar',
			'#ffff',
			'ffff',
			'fff',
			'#4g1',
			'4g1',
			'#zY1',
			'zY1',
			'#7f68ZY',
			'7f68ZY',
			'ffffff',
			'rgb(12, 34, 56)',
			'rgba(12, 34, 56, .8)',
			'hsl(123, 45%, 67%)',
			'hsla(123, 45%, 67%, .8)',
			'hwb(123, 45%, 67%)',
			'foo(123, 45%, 67%)',
			'rgb(,,)',
			'rgb()',
		];

		notCssNamedColors.forEach((color) => {
			it(`should not match ${color}`, () => {
				expect(color.match(reCssNamedColor)).toBe(null);
			});
		});
	});
});
