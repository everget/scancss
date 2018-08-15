import { addSpacesNearCommas } from '../../converters/addSpacesNearCommas';
import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { addUnitToFirstArgument } from '../../converters/addUnitToFirstArgument';
import { trimSpacesNearCommas } from '../../converters/trimSpacesNearCommas';
import { reHslColor } from '.';

describe('Module: reHslColor', () => {
	describe('Positives', () => {
		describe('Matching HSL color without angle units in hue', () => {
			const hslColors = [
				'hsl(0, 1%, 1%)',
				'hsl(100, 38%, 50%)',
				'hsl(216, 95%, 2%)',
				'hsl(.75, 60%, 70%)',
				'hsl(4.71239, 60%, 70%)',
			];

			hslColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addSpacesNearParentheses(color),
						addSpacesNearCommas(color),
						trimSpacesNearCommas(color)
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reHslColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching HSL color with angle units in hue', () => {
			const hslColors = [
				'hsl(0, 1%, 1%)',
				'hsl(100, 38%, 50%)',
				'hsl(216, 95%, 2%)',
				'hsl(.75, 60%, 70%)',
				'hsl(4.71239, 60%, 70%)',
			];

			hslColors
				.reduce((acc, color) => {
					acc.push(
						addUnitToFirstArgument(color, 'deg'),
						addSpacesNearParentheses(addUnitToFirstArgument(color, 'deg')),
						addSpacesNearCommas(addUnitToFirstArgument(color, 'deg')),
						trimSpacesNearCommas(addUnitToFirstArgument(color, 'deg')),

						addUnitToFirstArgument(color, 'grad'),
						addSpacesNearParentheses(addUnitToFirstArgument(color, 'grad')),
						addSpacesNearCommas(addUnitToFirstArgument(color, 'grad')),
						trimSpacesNearCommas(addUnitToFirstArgument(color, 'grad')),

						addUnitToFirstArgument(color, 'rad'),
						addSpacesNearParentheses(addUnitToFirstArgument(color, 'rad')),
						addSpacesNearCommas(addUnitToFirstArgument(color, 'rad')),
						trimSpacesNearCommas(addUnitToFirstArgument(color, 'rad')),

						addUnitToFirstArgument(color, 'turn'),
						addSpacesNearParentheses(addUnitToFirstArgument(color, 'turn')),
						addSpacesNearCommas(addUnitToFirstArgument(color, 'turn')),
						trimSpacesNearCommas(addUnitToFirstArgument(color, 'turn'))
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reHslColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching HSL color with alpha', () => {
			const hslColors = [
				'hsl(240, 100%, 50%, .05)',
				'hsl(270, 60%, 50%, .15)',
				'hsl(240, 100%, 50%, 1)',
				'hsl(270, 60%, 50%, 15%)',
				'hsl(270, 60%, 50%, 0.0)',
				'hsl(270, 60%, 50%, 0.5)',
				'hsl(270, 60%, 50%, 1.0)',
				'hsl(.75, 60%, 70%, .05)',
				'hsl(4.71239, 60%, 70%, 15%)',
			];

			hslColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addSpacesNearParentheses(color),
						addSpacesNearCommas(color),
						trimSpacesNearCommas(color),
						addUnitToFirstArgument(color, 'deg'),
						addUnitToFirstArgument(color, 'grad'),
						addUnitToFirstArgument(color, 'rad'),
						addUnitToFirstArgument(color, 'turn')
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reHslColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching HSL color with whitespace syntax', () => {
			const hslColors = [
				'hsl(270 60% 70%)',
				'hsl(.75 60% 70%)',
				'hsl(4.71239 60% 70%)',
			];

			hslColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addUnitToFirstArgument(color, 'deg'),
						addUnitToFirstArgument(color, 'grad'),
						addUnitToFirstArgument(color, 'rad'),
						addUnitToFirstArgument(color, 'turn')
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reHslColor)[0]).toBe(color);
					});
				});
		});


		describe('Matching HSL color with whitespace syntax and alpha', () => {
			const hslColors = [
				'hsl(80 40% 30% / .0)',
				'hsl(270 60% 50% / .15)',
				'hsl(270 60% 50% / 1)',
				'hsl(270 60% 50% / 15%)',
				'hsl(.75 60% 70% / .05)',
				'hsl(4.71239 60% 70% / 15%)',
			];

			hslColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addUnitToFirstArgument(color, 'deg'),
						addUnitToFirstArgument(color, 'grad'),
						addUnitToFirstArgument(color, 'rad'),
						addUnitToFirstArgument(color, 'turn')
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reHslColor)[0]).toBe(color);
					});
				});
		});
	});

	describe('Negatives', () => {
		const notHslColors = [
			'hsl()',
			'hsl(,,)',
			'rgb(12, 34, 56)',
			'rgba(12, 34, 56, .8)',
			'hsla(123, 45%, 67%, .8)',
			'hwb(123, 45%, 67%)',
			'foo(123, 45%, 67%)',
			'#fff',
			'#ffffff',
			'#abcd',
			'#FC0C',
			'#f06d06ff',
			'#FFCC00CC',
		];

		notHslColors.forEach((value) => {
			it(`should not match non-HSL color ${value}`, () => {
				expect(value.match(reHslColor)).toBe(null);
			});
		});
	});
});
