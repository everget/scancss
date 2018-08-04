import { reHslColor } from '.';

describe('Module: reHslColor', () => {
	describe('Positives', () => {
		const hslColors = [
			'hsl(100, 38%, 50%)',
			'hsl(216, 95%, 25%)',
			'hsl(175, 94%, 48%)',
			'hsl(55, 14%, 37%)',
			'hsl(194, 36%, 55%)',
			'hsl(178, 20%, 66%)',
			'hsl(102, 48%, 16%)',
			'hsl(82, 23%, 46%)',
			'hsl(68, 12%, 16%)',
			'hsl(51, 3%, 78%)',
			'hsl(0, 88%, 18%)',
			'hsl(83, 67%, 93%)',
			'hsl(109, 41%, 82%)',
			'hsl(152, 21%, 11%)',
			'hsl(0, 63%, 26%)',
		];

		hslColors
			.reduce((acc, color) => {
				acc.push(color);
				acc.push(color.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				acc.push(color.replace(/,\s/g, ','));
				acc.push(color.replace(/,/g, '  ,  '));
				acc.push(color.replace(/(hsl\([0-9]{1,3})/g, '$1deg'));
				acc.push(color.replace(/(hsl\([0-9]{1,3})/g, '$1grad'));
				acc.push(color.replace(/(hsl\([0-9]{1,3})/g, '$1rad'));
				acc.push(color.replace(/(hsl\([0-9]{1,3})/g, '$1turn'));
				return acc;
			}, [])
			.forEach((color) => {
				it(`should match HSL color ${color}`, () => {
					expect(color.match(reHslColor)[0]).toBe(color);
				});
			});
	});

	describe('Negatives', () => {
		const notHslColors = [
			'#fff',
			'#ffffff',
			'#abcd',
			'#FC0C',
			'#f06d06ff',
			'#FFCC00CC',
			'rgb(12, 34, 56)',
			'rgba(12, 34, 56, .8)',
			'hsla(123, 45%, 67%, .8)',
			'hwb(123, 45%, 67%)',
			'foo(123, 45%, 67%)',
			'hsl(,,)',
			'hsl()',
		];

		notHslColors.forEach((value) => {
			it(`should not match non-HSL color ${value}`, () => {
				expect(value.match(reHslColor)).toBe(null);
			});
		});
	});
});
