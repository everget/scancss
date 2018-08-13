import { addSpacesNearCommas } from '../../converters/addSpacesNearCommas';
import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { addUnitToNumbers } from '../../converters/addUnitToNumbers';
import { removeSpacesAfterCommas } from '../../converters/removeSpacesAfterCommas';
import { removeLeadingZero } from '../../converters/removeLeadingZero';
import { removeIntegerPart } from '../../converters/removeIntegerPart';
import { reRgbColor } from '.';

describe('Module: reRgbColor', () => {
	describe('Positives', () => {
		describe('Matching RGB color without percentages', () => {
			const rgbColors = [
				'rgb(9, 217, 112)',
				'rgb(0, 8, 175)',
				'rgb(255, 0, 153)',
				'rgb(23, 129, 0)',
			];

			rgbColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addSpacesNearParentheses(color),
						addSpacesNearCommas(color),
						removeSpacesAfterCommas(color)
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reRgbColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching RGB color with percentages', () => {
			const rgbColors = [
				'rgb(9%, 17%, 12%)',
				'rgb(0%, 8%, 75%)',
				'rgb(25%, 0%, 53%)',
				'rgb(23%, 29%, 0%)',
			];

			rgbColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addSpacesNearParentheses(color),
						addSpacesNearCommas(color),
						removeSpacesAfterCommas(color)
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reRgbColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching RGB color with alpha', () => {
			const rgbColors = [
				'rgb(9, 17, 12, 0.0)',
				'rgb(9, 17, 12, 0.10)',
				'rgb(0, 8, 75, 0.24)',
				'rgb(25, 0, 53, 0.55)',
				'rgb(23, 29, 0, 0.100)',
				'rgb(23, 29, 0, 1.0)',
			];

			rgbColors
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
						expect(color.match(reRgbColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching RGB color with whitespace syntax', () => {
			const rgbColors = [
				'rgb(9 17 12)',
				'rgb(0 8 75)',
				'rgb(25 0 53)',
				'rgb(23 29 0)',
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
						expect(color.match(reRgbColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching RGB color with whitespace syntax and alpha', () => {
			const rgbColors = [
				'rgb(9 17 12 / 0.0)',
				'rgb(9 17 12 / 0.0)',
				'rgb(0 8 75 / 0.10)',
				'rgb(25 0 53 / 0.55)',
				'rgb(23 29 0 / 0.100)',
			];

			rgbColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addSpacesNearParentheses(color),
						removeLeadingZero(color),
						removeIntegerPart(color).replace(/\)/g, '%)'),
						addUnitToNumbers(removeIntegerPart(color), '%')
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reRgbColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching RGB color with arguments in exponential notation', () => {
			const rgbColors = [
				'rgb(1e2, .5e1, .5e0, +.25e2)',
				'rgb(.5e1, .7e1, .2e0, .66e2)',
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
						expect(color.match(reRgbColor)[0]).toBe(color);
					});
				});
		});
	});

	describe('Negatives', () => {
		const notRgbColors = [
			'rgb()',
			'rgb(,,)',
			'#fff',
			'#ffffff',
			'#abcd',
			'#FFCC00CC',
			'rgba(12, 34, 56, .8)',
			'hsl(123, 45%, 67%)',
			'hsla(123, 45%, 67%, .8)',
			'hwb(123, 45%, 67%)',
			'foo(123, 45%, 67%)',
		];

		notRgbColors.forEach((value) => {
			it(`should not match non-RGB color ${value}`, () => {
				expect(value.match(reRgbColor)).toBe(null);
			});
		});
	});
});
