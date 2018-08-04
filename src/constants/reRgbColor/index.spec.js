import { reRgbColor } from '.';

describe('Module: reRgbColor', () => {
	describe('Positives', () => {
		const rgbColors = [
			'rgb(251, 50, 181)',
			'rgb(113, 113, 71)',
			'rgb(197, 175, 124)',
			'rgb(223, 146, 33)',
			'rgb(23, 129, 0)',
			'rgb(230, 202, 87)',
			'rgb(251, 39, 135)',
			'rgb(233, 241, 97)',
			'rgb(220, 230, 150)',
			'rgb(43, 205, 180)',
			'rgb(9, 217, 112)',
			'rgb(79, 186, 81)',
			'rgb(82, 226, 13)',
			'rgb(182, 126, 180)',
			'rgb(59, 8, 175)',
		];

		rgbColors
			.reduce((acc, color) => {
				acc.push(color);
				acc.push(color.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				acc.push(color.replace(/,\s/g, ','));
				acc.push(color.replace(/,/g, '  ,  '));
				return acc;
			}, [])
			.forEach((color) => {
				it(`should match RGB color ${color}`, () => {
					expect(color.match(reRgbColor)[0]).toBe(color);
				});
			});
	});

	describe('Negatives', () => {
		const notRgbColors = [
			'#fff',
			'#ffffff',
			'#abcd',
			'#FC0C',
			'#f06d06ff',
			'#FFCC00CC',
			'rgba(12, 34, 56, .8)',
			'hsl(123, 45%, 67%)',
			'hsla(123, 45%, 67%, .8)',
			'hwb(123, 45%, 67%)',
			'foo(123, 45%, 67%)',
			'rgb(,,)',
			'rgb()',
		];

		notRgbColors.forEach((value) => {
			it(`should not match non-RGB color ${value}`, () => {
				expect(value.match(reRgbColor)).toBe(null);
			});
		});
	});
});
