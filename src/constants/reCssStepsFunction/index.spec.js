import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { reCssStepsFunction } from '.';

describe('Module: reCssStepsFunction', () => {
	describe('Positives', () => {
		const stepsFunctions = [
			'steps(4,end)',
			'steps(2)',
			'steps(-3,start)',
		];

		stepsFunctions
			.reduce((acc, func) => {
				acc.push(
					func,
					addSpacesNearParentheses(func)
				);

				return acc;
			}, [])
			.forEach((func) => {
				it(`should match ${func}`, () => {
					expect(func.match(reCssStepsFunction)[0]).toBe(func);
				});
			});
	});

	describe('Negatives', () => {
		const nonStepsFunctions = [
			'cheese(1,1,1,1)',
			'cubicbezier(0.47, 0, 0.745, 0.715)',
			'cubic-bezier(0.47, 0, 0.745, 0.715)',
			'frames(10)',
			'frames(2.0)',
		];

		nonStepsFunctions.forEach((func) => {
			it(`should not match ${func}`, () => {
				expect(func.match(reCssStepsFunction)).toBe(null);
			});
		});
	});
});
