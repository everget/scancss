import { cssSystemColors } from '../cssSystemColors';
import { reCssSystemColor } from '.';

describe('Module: reCssSystemColor', () => {
	describe('Positives', () => {
		cssSystemColors.forEach((color) => {
			it(`should match ${color}`, () => {
				expect(color.match(reCssSystemColor)[0]).toBe(color);
			});
		});
	});

	describe.skip('Negatives', () => {
		const notCssSystemColors = [
		];

		notCssSystemColors.forEach((color) => {
			it(`should not match non-system color ${color}`, () => {
				expect(color.match(reCssSystemColor)).toBe(null);
			});
		});
	});
});
