import { reHexColor } from '.';

describe('Module: reHexColor', () => {
	describe('Positives', () => {
		describe('Matching 3-HEX color', () => {
			const hex3Colors = [
				'#fff',
				'#FFF',
				'#afe',
				'#AF3',
				'#3cb',
				'#3CB',
				'#b2f',
				'#5B2',
				'#708',
				'#68e',
				'#7AF',
				'#777',
				'#eee',
				'#111',
				'#c85',
				'#d0f',
				'#1bb',
				'#a58',
				'#b80',
				'#426',
				'#d1c',
				'#288',
				'#26d',
				'#6f9',
				'#703',
				'#b32',
				'#ce3',
				'#eec',
				'#4d1',
			];

			hex3Colors.forEach((color) => {
				it(`should match color ${color}`, () => {
					expect(color.match(reHexColor)[0]).toBe(color);
				});
			});

			hex3Colors
				.reduce((acc, color) => {
					acc.push('foo ' + color + ' bar');
					return acc;
				}, [])
				.forEach((stringWithColor) => {
					const matchedColor = stringWithColor.slice(4, -4);

					it(`should match color ${matchedColor} from string`, () => {
						expect(stringWithColor.match(reHexColor)[0]).toBe(matchedColor);
					});
				});
		});

		describe('Matching 6-HEX color', () => {
			const hex6Colors = [
				'#ffffff',
				'#FFFFFF',
				'#afebe3',
				'#AFEBE3',
				'#3cb371',
				'#3CB371',
				'#556b2f',
				'#556B2F',
				'#708090',
				'#7b68ee',
				'#7B68EE',
				'#eeeeee',
				'#111111',
				'#c8515a',
				'#d0f2f5',
				'#1bbe20',
				'#a5834f',
				'#b80cfc',
				'#4261cb',
				'#d1c8c7',
				'#2881c3',
				'#26dd33',
				'#6f9efa',
				'#703a00',
				'#b32335',
				'#ce36b8',
				'#eecfae',
				'#4d1f4f',
			];

			hex6Colors.forEach((color) => {
				it(`should match color ${color}`, () => {
					expect(color.match(reHexColor)[0]).toBe(color);
				});
			});

			hex6Colors
				.reduce((acc, color) => {
					acc.push('foo ' + color + ' bar');
					return acc;
				}, [])
				.forEach((stringWithColor) => {
					const matchedColor = stringWithColor.slice(4, -4);

					it(`should match color ${matchedColor} from string`, () => {
						expect(stringWithColor.match(reHexColor)[0]).toBe(matchedColor);
					});
				});
		});
	});

	describe('Negatives', () => {
		const notHexColors = [
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

		notHexColors.forEach((value) => {
			it(`should not match non-HEX color ${value}`, () => {
				expect(value.match(reHexColor)).toBe(null);
			});
		});
	});
});
