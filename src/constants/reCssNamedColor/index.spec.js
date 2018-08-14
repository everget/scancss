import { cssColorNamesMap } from '../cssColorNamesMap';
import { cssSystemColors } from '../cssSystemColors';
import { reCssNamedColor } from '.';

describe('Module: reCssNamedColor', () => {
	describe('Positives', () => {
		describe('Matching lowercased color names', () => {
			Object
				.keys(cssColorNamesMap)
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reCssNamedColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching uppercased color names', () => {
			Object
				.keys(cssColorNamesMap)
				.map((color) => color.toUpperCase())
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reCssNamedColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching capitalized color names', () => {
			Object
				.keys(cssColorNamesMap)
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
			'ffff',
			'fff',
			'7f68ZY',
			'ffffff',
			...cssSystemColors,
		];

		notCssNamedColors.forEach((color) => {
			it(`should not match ${color}`, () => {
				expect(color.match(reCssNamedColor)).toBe(null);
			});
		});
	});
});
