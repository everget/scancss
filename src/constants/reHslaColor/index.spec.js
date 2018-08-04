import { reHslaColor } from '.';

describe('Module: reHslaColor', () => {
	describe('Positives', () => {
		const hslaColors = [
			'hsla(100, 38%, 50%, 0.18)',
			'hsla(216, 95%, 25%, 0.68)',
			'hsla(175, 94%, 48%, 0.58)',
			'hsla(55, 14%, 37%, 0.81)',
			'hsla(194, 36%, 55%, 0.11)',
			'hsla(178, 20%, 66%, 0.13)',
			'hsla(102, 48%, 16%, 0.76)',
			'hsla(82, 23%, 46%, 0.05)',
			'hsla(68, 12%, 16%, 0.37)',
			'hsla(51, 3%, 78%, 0.73)',
			'hsla(0, 88%, 18%, 0.86)',
			'hsla(83, 67%, 93%, 0.75)',
			'hsla(109, 41%, 82%, 0.20)',
			'hsla(152, 21%, 11%, 0.51)',
			'hsla(0, 63%, 26%, 0.38)',
		];

		hslaColors
			.reduce((acc, color) => {
				acc.push(color);
				acc.push(color.replace(/0\./g, '.'));
				acc.push(color.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				acc.push(color.replace(/,\s/g, ','));
				acc.push(color.replace(/,/g, '  ,  '));
				acc.push(color.replace(/0\./g, '').replace(/\)/g, '%)'));
				acc.push(color.replace(/(hsla\([0-9]{1,3})/g, '$1deg'));
				acc.push(color.replace(/(hsla\([0-9]{1,3})/g, '$1grad'));
				acc.push(color.replace(/(hsla\([0-9]{1,3})/g, '$1rad'));
				acc.push(color.replace(/(hsla\([0-9]{1,3})/g, '$1turn'));
				return acc;
			}, [])
			.forEach((color) => {
				it(`should match HSLA color ${color}`, () => {
					expect(color.match(reHslaColor)[0]).toBe(color);
				});
			});
	});

	describe('Negatives', () => {
		const notHslaColors = [
			'#fff',
			'#ffffff',
			'#abcd',
			'#FC0C',
			'#f06d06ff',
			'#FFCC00CC',
			'rgb(12, 34, 56)',
			'rgba(12, 34, 56, .8)',
			'hsl(123, 45%, 67%)',
			'hwb(123, 45%, 67%)',
			'foo(123, 45%, 67%)',
			'hsla(,,)',
			'hsla()',
		];

		notHslaColors.forEach((value) => {
			it(`should not match non-HSLA color ${value}`, () => {
				expect(value.match(reHslaColor)).toBe(null);
			});
		});
	});
});
