import { reHexColor } from '.';

describe('Module: reHexColor', () => {
	describe('Positives', () => {
		describe('Matching 3-HEX color', () => {
			const hex3Colors = [
				'#fff',
				'#FFF',
				'#afe',
				'#3cb',
				'#3CB',
				'#eee',
				'#111',
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

					it(`should match color from string ${matchedColor}`, () => {
						expect(stringWithColor.match(reHexColor)[0]).toBe(matchedColor);
					});
				});
		});

		describe('Matching 6-HEX color', () => {
			const hex6Colors = [
				'#ffffff',
				'#FFFFFF',
				'#afebe3',
				'#3cb371',
				'#3CB371',
				'#eeeeee',
				'#111111',
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
			'fff',
			'ffff',
			'3g1',
			'#ffff',
			'#ffffff00',
			'#4g10',
			'#zY10',
		];

		notHexColors.forEach((value) => {
			it(`should not match non-HEX color ${value}`, () => {
				expect(value.match(reHexColor)).toBe(null);
			});
		});
	});
});
