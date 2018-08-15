import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { reCssFramesFunction } from '.';

describe('Module: reCssFramesFunction', () => {
	describe('Positives', () => {
		const framesFunctions = [
			'frames(10)',
			'frames(2.0)',
			'frames(2.0, 66)',
		];

		framesFunctions
			.reduce((acc, func) => {
				acc.push(
					func,
					addSpacesNearParentheses(func)
				);

				return acc;
			}, [])
			.forEach((func) => {
				it(`should match ${func}`, () => {
					expect(func.match(reCssFramesFunction)[0]).toBe(func);
				});
			});
	});

	describe('Negatives', () => {
		const nonFramesFunctions = [
			'cheese(1,1,1,1)',
			'cubic-bezier(0.47, 0, 0.745, 0.715)',
			'steps(2)',
			'farmes(10, 12)',
		];

		nonFramesFunctions.forEach((func) => {
			it(`should not match ${func}`, () => {
				expect(func.match(reCssFramesFunction)).toBe(null);
			});
		});
	});
});
