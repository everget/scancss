import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { addSpacesNearCommas } from '../../converters/addSpacesNearCommas';
import { removeLeadingZero } from '../../converters/removeLeadingZero';
import { reCubicBezier } from '.';

describe('Module: reCubicBezier', () => {
	describe('Positives', () => {
		const cubicBeziers = [
			'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
			'cubic-bezier(0.23, 1, 0.32, 1)',
			'cubic-bezier(1, 0, 0, 1)',
			'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
			'cubic-bezier(0.1, red, 1.0, green)',
			'cubic-bezier(2.45, 0.6, 4, 0.1)',
			'cubic-bezier(-1.9, 0.3, -0.2, 2.1)',
			'cubic-bezier(0.3, 2.1)',
		];

		cubicBeziers
			.reduce((acc, func) => {
				acc.push(
					func,
					removeLeadingZero(func),
					addSpacesNearParentheses(func),
					addSpacesNearCommas(func)
				);

				return acc;
			}, [])
			.forEach((func) => {
				it(`should match ${func}`, () => {
					expect(func.match(reCubicBezier)[0]).toBe(func);
				});
			});
	});

	describe('Negatives', () => {
		const nonCubicBeziers = [
			'cheese(1,1,1,1)',
			'cubicbezier(0.47, 0, 0.745, 0.715)',
		];

		nonCubicBeziers.forEach((func) => {
			it(`should not match ${func}`, () => {
				expect(func.match(reCubicBezier)).toBe(null);
			});
		});
	});
});
