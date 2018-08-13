import { addSpacesNearCommas } from '../../converters/addSpacesNearCommas';
import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { addUnitToFirstArgument } from '../../converters/addUnitToFirstArgument';
import { removeSpacesAfterCommas } from '../../converters/removeSpacesAfterCommas';
import { removeLeadingZero } from '../../converters/removeLeadingZero';
import { reHslaColor } from '.';

describe('Module: reHslaColor', () => {
	describe('Positives', () => {
		describe('Matching HSLA color without angle units in hue', () => {
			const hslaColors = [
				'hsla(0, 63%, 26%, 0.38)',
				'hsla(82, 23%, 46%, 0.05)',
				'hsla(109, 41%, 82%, 0.20)',
				'hsla(0.75, 60%, 70%, 0.05)',
				'hsla(4.71239, 60%, 70%, 0.20)',
			];

			hslaColors
				.reduce((acc, color) => {
					acc.push(
						color,
						removeLeadingZero(color),
						color.replace(/0\.0+/g, '').replace(/\)/g, '%)'),
						addSpacesNearParentheses(color),
						addSpacesNearCommas(color),
						removeSpacesAfterCommas(color)
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reHslaColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching HSLA color with angle units in hue', () => {
			const hslaColors = [
				'hsla(0, 63%, 26%, 0.38)',
				'hsla(82, 23%, 46%, .05)',
				'hsla(109, 41%, 82%, 0.20)',
				'hsla(152, 21%, 11%, 1)',
				'hsla(.75, 60%, 70%, .05)',
				'hsla(4.71239, 60%, 70%, 0.20)',
			];

			hslaColors
				.reduce((acc, color) => {
					acc.push(
						addUnitToFirstArgument(color, 'deg'),
						addSpacesNearParentheses(addUnitToFirstArgument(color, 'deg')),
						addSpacesNearCommas(addUnitToFirstArgument(color, 'deg')),
						removeSpacesAfterCommas(addUnitToFirstArgument(color, 'deg')),

						addUnitToFirstArgument(color, 'grad'),
						addSpacesNearParentheses(addUnitToFirstArgument(color, 'grad')),
						addSpacesNearCommas(addUnitToFirstArgument(color, 'grad')),
						removeSpacesAfterCommas(addUnitToFirstArgument(color, 'grad')),

						addUnitToFirstArgument(color, 'rad'),
						addSpacesNearParentheses(addUnitToFirstArgument(color, 'rad')),
						addSpacesNearCommas(addUnitToFirstArgument(color, 'rad')),
						removeSpacesAfterCommas(addUnitToFirstArgument(color, 'rad')),

						addUnitToFirstArgument(color, 'turn'),
						addSpacesNearParentheses(addUnitToFirstArgument(color, 'turn')),
						addSpacesNearCommas(addUnitToFirstArgument(color, 'turn')),
						removeSpacesAfterCommas(addUnitToFirstArgument(color, 'turn'))
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reHslaColor)[0]).toBe(color);
					});
				});
		});
	});

	describe('Negatives', () => {
		const notHslaColors = [
			'hsla()',
			'hsla(,,)',
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
		];

		notHslaColors.forEach((value) => {
			it(`should not match ${value}`, () => {
				expect(value.match(reHslaColor)).toBe(null);
			});
		});
	});
});
