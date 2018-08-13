import { addSpacesNearCommas } from '../../converters/addSpacesNearCommas';
import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { addUnitToNumbers } from '../../converters/addUnitToNumbers';
import { removeSpacesAfterCommas } from '../../converters/removeSpacesAfterCommas';
import { removeLeadingZero } from '../../converters/removeLeadingZero';
import { removeIntegerPart } from '../../converters/removeIntegerPart';
import { reRgbaColor } from '.';

describe('Module: reRgbaColor', () => {
	describe('Positives', () => {
		describe('Matching RGBA color', () => {
			const rgbaColors = [
				'rgba(9, 217, 112, 0.05)',
				'rgba(23, 129, 0, 0.28)',
				'rgba(59, 8, 175, 0.67)',
				'rgba(113, 113, 71, 0.10)',
			];

			rgbaColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addSpacesNearParentheses(color),
						addSpacesNearCommas(color),
						removeSpacesAfterCommas(color),
						removeLeadingZero(color),
						removeIntegerPart(color).replace(/\)/g, '%)'),
						addUnitToNumbers(removeIntegerPart(color), '%')
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reRgbaColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching RGBA color with whitespace syntax', () => {
			const rgbaColors = [
				'rgba(9 217 112 / 0.05)',
				'rgba(23 129 0 / 0.28)',
				'rgba(59 8 175 / 0.67)',
				'rgba(113 113 71 / 0.10)',
			];

			rgbaColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addSpacesNearParentheses(color),
						addSpacesNearCommas(color),
						removeSpacesAfterCommas(color),
						removeLeadingZero(color),
						removeIntegerPart(color).replace(/\)/g, '%)'),
						addUnitToNumbers(removeIntegerPart(color), '%')
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reRgbaColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching RGBA color with arguments in exponential notation', () => {
			const rgbColors = [
				'rgba(1e2, .5e1, .5e0, +.25e2)',
				'rgba(.5e1, .7e1, .2e0, .66e2)',
			];

			rgbColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addSpacesNearParentheses(color),
						addUnitToNumbers(color, '%')
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reRgbaColor)[0]).toBe(color);
					});
				});
		});
	});

	describe('Negatives', () => {
		const notRgbaColors = [
			'rgba()',
			'rgba(,,)',
			'#fff',
			'#ffffff',
			'#abcd',
			'#FFCC00CC',
			'rgb(12, 34, 56)',
			'hsl(123, 45%, 67%)',
			'hsla(123, 45%, 67%, .8)',
			'hwb(123, 45%, 67%)',
			'foo(123, 45%, 67%)',
		];

		notRgbaColors.forEach((value) => {
			it(`should not match non-RGBA color ${value}`, () => {
				expect(value.match(reRgbaColor)).toBe(null);
			});
		});
	});
});
