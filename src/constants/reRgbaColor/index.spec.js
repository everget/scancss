import { reRgbaColor } from '.';

describe('Module: reRgbaColor', () => {
	describe('Positives', () => {
		const rgbaColors = [
			'rgba(251, 50, 181, 0.59)',
			'rgba(113, 113, 71, 0.65)',
			'rgba(197, 175, 124, 0.28)',
			'rgba(223, 146, 33, 0.51)',
			'rgba(23, 129, 0, 0.58)',
			'rgba(230, 202, 87, 0.30)',
			'rgba(251, 39, 135, 0.29)',
			'rgba(233, 241, 97, 0.21)',
			'rgba(220, 230, 150, 0.51)',
			'rgba(43, 205, 180, 0.68)',
			'rgba(9, 217, 112, 0.05)',
			'rgba(79, 186, 81, 0.73)',
			'rgba(82, 226, 13, 0.71)',
			'rgba(182, 126, 180, 0.67)',
			'rgba(59, 8, 175, 0.84)',
		];

		rgbaColors
			.reduce((acc, color) => {
				acc.push(color);
				acc.push(color.replace(/0\./g, '.'));
				acc.push(color.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				acc.push(color.replace(/,\s/g, ','));
				acc.push(color.replace(/,/g, '  ,  '));
				acc.push(color.replace(/0\./g, '').replace(/\)/g, '%)'));
				return acc;
			}, [])
			.forEach((color) => {
				it(`should match RGBA color ${color}`, () => {
					expect(color.match(reRgbaColor)[0]).toBe(color);
				});
			});
	});

	describe('Negatives', () => {
		const notRgbaColors = [
			'#fff',
			'#ffffff',
			'#abcd',
			'#FC0C',
			'#f06d06ff',
			'#FFCC00CC',
			'rgb(12, 34, 56)',
			'hsl(123, 45%, 67%)',
			'hsla(123, 45%, 67%, .8)',
			'hwb(123, 45%, 67%)',
			'foo(123, 45%, 67%)',
			'rgba(,,)',
			'rgba()',
		];

		notRgbaColors.forEach((value) => {
			it(`should not match non-RGBA color ${value}`, () => {
				expect(value.match(reRgbaColor)).toBe(null);
			});
		});
	});
});
