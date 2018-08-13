import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { addSpacesNearCommas } from '../../converters/addSpacesNearCommas';
import { reGradient } from '.';

describe('Module: reGradient', () => {
	describe('Positives', () => {
		const gradientFunctions = [
			'linear-gradient(90deg,#34aae0,#47c3e9)',
			'linear-gradient(90deg,#fff 0,#fff)',
			'linear-gradient(90deg,#1c2030 0,#1c2030)',
			'linear-gradient(90deg,transparent 0,#7db9e8)',
			'repeating-linear-gradient(90deg,rgba(37,39,51,.99) 0,rgba(37,39,51,.99) 85%,#252733)',
			'radial-gradient(circle,#fff 100%,#000 0)',
			'repeating-radial-gradient(circle at 4% -18%,#7cd0f2,#3bb3e4 47%,#31a3d1)',
		];

		gradientFunctions
			.reduce((acc, func) => {
				acc.push(
					func,
					addSpacesNearParentheses(func),
					addSpacesNearCommas(func)
				);

				return acc;
			}, [])
			.forEach((func) => {
				it(`should match ${func}`, () => {
					expect(func.match(reGradient)[0]).toBe(func);
				});
			});
	});
});
