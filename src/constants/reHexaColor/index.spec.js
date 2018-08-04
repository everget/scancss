import { reHexaColor } from '.';

describe('Module: reHexaColor', () => {
	describe('Positives', () => {
		describe('Matching 4-HEXA color', () => {
			const hexa4Colors = [
				'#abcd',
				'#ABCD',
				'#fc0c',
				'#FC0C',
				'#f09f',
				'#F09F',
			];

			hexa4Colors.forEach((color) => {
				it(`should match color ${color}`, () => {
					expect(color.match(reHexaColor)[0]).toBe(color);
				});
			});

			it('should match 4-HEXA color from string', () => {
				expect(reHexaColor.test('color: #f0d6')).toBe(true);
			});
		});

		describe('Matching 8-HEXA color', () => {
			const hexa8Colors = [
				'#f06d06ff',
				'#F06D06FF',
				'#ffcc00cc',
				'#FFCC00CC',
				'#ff0099ff',
				'#FF0099FF',
			];

			hexa8Colors.forEach((color) => {
				it(`should match color ${color}`, () => {
					expect(color.match(reHexaColor)[0]).toBe(color);
				});
			});

			it('should match 8-HEXA color from string', () => {
				expect(reHexaColor.test('color: #abcdabcd')).toBe(true);
			});
		});
	});

	describe('Negatives', () => {
		const notHexaColors = [
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

		notHexaColors.forEach((value) => {
			it(`should not match non-HEXA color ${value}`, () => {
				expect(value.match(reHexaColor)).toBe(null);
			});
		});
	});
});
