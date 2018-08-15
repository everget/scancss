import { cssSystemColors } from '../cssSystemColors';
import { reCssSystemColor } from '.';

describe('Module: reCssSystemColor', () => {
	describe('Positives', () => {
		describe('Matching default color names', () => {
			cssSystemColors.forEach((color) => {
				it(`should match ${color}`, () => {
					expect(color.match(reCssSystemColor)[0]).toBe(color);
				});
			});
		});

		describe('Matching uppercased color names', () => {
			cssSystemColors
				.map((color) => color.toUpperCase())
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reCssSystemColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching lowercased color names', () => {
			cssSystemColors
				.map((color) => color.toLowerCase())
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reCssSystemColor)[0]).toBe(color);
					});
				});
		});
	});

	describe('Negatives', () => {
		const notCssSystemColors = [
			'aliceblue',
			'red',
			'crimson',
			'foobar',
		];

		notCssSystemColors.forEach((color) => {
			it(`should not match non-system color ${color}`, () => {
				expect(color.match(reCssSystemColor)).toBe(null);
			});
		});
	});
});
