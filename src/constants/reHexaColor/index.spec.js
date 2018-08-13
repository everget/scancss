import { reHexaColor } from '.';

describe('Module: reHexaColor', () => {
	describe('Positives', () => {
		describe('Matching 4-HEXA color', () => {
			const hexa4Colors = [
				'#abcd',
				'#ABCD',
				'#fc0c',
				'#FC0C',
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
			'4g1',
			'#ff',
			'#fff',
			'#ffffff',
			'#4g1',
			'#zY1',
			'rgb(12, 34, 56)',
		];

		notHexaColors.forEach((value) => {
			it(`should not match non-HEXA color ${value}`, () => {
				expect(value.match(reHexaColor)).toBe(null);
			});
		});
	});
});
