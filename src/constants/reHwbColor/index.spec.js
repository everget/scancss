import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { addSpacesNearCommas } from '../../converters/addSpacesNearCommas';
import { trimSpacesNearCommas } from '../../converters/trimSpacesNearCommas';
import { addUnitToFirstArgument } from '../../converters/addUnitToFirstArgument';
import { trimLeadingZeros } from '../../converters/trimLeadingZeros';
import { trimIntegerPart } from '../../converters/trimIntegerPart';
import { reHwbColor } from '.';

describe('Module: reHwbColor', () => {
	describe('Positives', () => {
		describe('Matching HWB color without alpha', () => {
			const hwbColors = [
				'hwb(0, 88%, 18%)',
				'hwb(51, 3%, 78%)',
				'hwb(100, 38%, 50%)',
				'hwb(216, 95%, 25%)',
				'hwb(0.75, 60%, 70%)',
				'hwb(4.71239, 60%, 70%)',
			];

			hwbColors
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
						expect(color.match(reHwbColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching HWB color whitespace syntax without alpha', () => {
			const hwbColors = [
				'hwb(0 88% 18%)',
				'hwb(51 3% 78%)',
				'hwb(100 38% 50%)',
				'hwb(216 95% 25%)',
				'hwb(0.75 60% 70%)',
				'hwb(4.71239 60% 70%)',
			];

			hwbColors
				.reduce((acc, color) => {
					acc.push(
						color,
						addSpacesNearParentheses(color),
						addUnitToFirstArgument(color, 'deg'),
						addUnitToFirstArgument(color, 'grad'),
						addUnitToFirstArgument(color, 'rad'),
						addUnitToFirstArgument(color, 'turn')
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reHwbColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching HWB color with alpha', () => {
			const hwbColors = [
				'hwb(0, 88%, 18%, 0.18)',
				'hwb(51, 3%, 78%, 0.05)',
				'hwb(100, 38%, 50%, 0.75)',
				'hwb(216, 95%, 25%, 0.10)',
				'hwb(0.75, 60%, 70%, 0.05)',
				'hwb(4.71239, 60%, 70%, 0.20)',
			];

			hwbColors
				.reduce((acc, color) => {
					acc.push(
						color,
						trimLeadingZeros(color),
						trimIntegerPart(color).replace(/\)/g, '%)'),
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
						expect(color.match(reHwbColor)[0]).toBe(color);
					});
				});
		});

		describe('Matching HWB color whitespace syntax with alpha', () => {
			const hwbColors = [
				'hwb(0 88% 18% / 0.18)',
				'hwb(51 3% 78% / 0.05)',
				'hwb(100 38% 50% / 0.75)',
				'hwb(216 95% 25% / 0.10)',
				'hwb(0.75 60% 70% / 0.05)',
				'hwb(4.71239 60% 70% / 0.20)',
			];

			hwbColors
				.reduce((acc, color) => {
					acc.push(
						color,
						trimLeadingZeros(color),
						trimIntegerPart(color).replace(/\)/g, '%)'),
						addSpacesNearParentheses(color),
						addUnitToFirstArgument(color, 'deg'),
						addUnitToFirstArgument(color, 'grad'),
						addUnitToFirstArgument(color, 'rad'),
						addUnitToFirstArgument(color, 'turn')
					);

					return acc;
				}, [])
				.forEach((color) => {
					it(`should match ${color}`, () => {
						expect(color.match(reHwbColor)[0]).toBe(color);
					});
				});
		});
	});

	describe('Negatives', () => {
		const notHwbColors = [
			'hwb()',
			'hwb(,,)',
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
		];

		notHwbColors.forEach((value) => {
			it(`should not match non-HWB color ${value}`, () => {
				expect(value.match(reHwbColor)).toBe(null);
			});
		});
	});
});
