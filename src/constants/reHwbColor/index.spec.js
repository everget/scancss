import { reHwbColor } from '.';

describe('Module: reHwbColor', () => {
	describe('Positives', () => {
		const hwbColors = [
			'hwb(100, 38%, 50%)',
			'hwb(216, 95%, 25%)',
			'hwb(175, 94%, 48%)',
			'hwb(55, 14%, 37%)',
			'hwb(194, 36%, 55%)',
			'hwb(178, 20%, 66%)',
			'hwb(102, 48%, 16%)',
			'hwb(82, 23%, 46%)',
			'hwb(68, 12%, 16%)',
			'hwb(51, 3%, 78%)',
			'hwb(0, 88%, 18%)',
			'hwb(83, 67%, 93%)',
			'hwb(109, 41%, 82%)',
			'hwb(152, 21%, 11%)',
			'hwb(0, 63%, 26%)',
		];

		const hwbaColors = [
			'hwb(100, 38%, 50%, 0.18)',
			'hwb(216, 95%, 25%, 0.68)',
			'hwb(175, 94%, 48%, 0.58)',
			'hwb(55, 14%, 37%, 0.81)',
			'hwb(194, 36%, 55%, 0.11)',
			'hwb(178, 20%, 66%, 0.13)',
			'hwb(102, 48%, 16%, 0.76)',
			'hwb(82, 23%, 46%, 0.05)',
			'hwb(68, 12%, 16%, 0.37)',
			'hwb(51, 3%, 78%, 0.73)',
			'hwb(0, 88%, 18%, 0.86)',
			'hwb(83, 67%, 93%, 0.75)',
			'hwb(109, 41%, 82%, 0.20)',
			'hwb(152, 21%, 11%, 0.51)',
			'hwb(0, 63%, 26%, 0.38)',
		];

		hwbColors
			.reduce((acc, color) => {
				acc.push(color);
				acc.push(color.replace(/0\./g, '.'));
				acc.push(color.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				acc.push(color.replace(/,\s/g, ','));
				acc.push(color.replace(/,/g, '  ,  '));
				acc.push(color.replace(/(hwb\([0-9]{1,3})/g, '$1deg'));
				acc.push(color.replace(/(hwb\([0-9]{1,3})/g, '$1grad'));
				acc.push(color.replace(/(hwb\([0-9]{1,3})/g, '$1rad'));
				acc.push(color.replace(/(hwb\([0-9]{1,3})/g, '$1turn'));
				return acc;
			}, [])
			.forEach((color) => {
				it(`should match HWB color ${color}`, () => {
					expect(color.match(reHwbColor)[0]).toBe(color);
				});
			});

		hwbaColors
			.reduce((acc, color) => {
				acc.push(color);
				acc.push(color.replace(/0\./g, '.'));
				acc.push(color.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				acc.push(color.replace(/,\s/g, ','));
				acc.push(color.replace(/,/g, '  ,  '));
				acc.push(color.replace(/0\./g, '').replace(/\)/g, '%)'));
				acc.push(color.replace(/(hwb\([0-9]{1,3})/g, '$1deg'));
				acc.push(color.replace(/(hwb\([0-9]{1,3})/g, '$1grad'));
				acc.push(color.replace(/(hwb\([0-9]{1,3})/g, '$1rad'));
				acc.push(color.replace(/(hwb\([0-9]{1,3})/g, '$1turn'));
				return acc;
			}, [])
			.forEach((color) => {
				it(`should match HWB color ${color}`, () => {
					expect(color.match(reHwbColor)[0]).toBe(color);
				});
			});
	});

	describe('Negatives', () => {
		const notHwbColors = [
			'#fff',
			'#ffffff',
			'#abcd',
			'#FC0C',
			'#f06d06ff',
			'#FFCC00CC',
			'rgb(12, 34, 56)',
			'rgba(12, 34, 56, .8)',
			'hsl(123, 45%, 67%)',
			'hsla(123, 45%, 67%, .8)',
			'foo(123, 45%, 67%)',
			'hwb(,,)',
			'hwb()',
		];

		notHwbColors.forEach((value) => {
			it(`should not match non-HWB color ${value}`, () => {
				expect(value.match(reHwbColor)).toBe(null);
			});
		});
	});
});
