import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { reUrlFunctionWithArg } from '.';

describe('Module: reUrlFunctionWithArg', () => {
	describe('Positives', () => {
		const urlFunctions = [
			'url(tada)',
			'url(data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0)',
			'url(\'data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0\')',
			'url(\"data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0\")',
			'url(\"data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M224 387.814V512L32 320l192-192v126.912C447.375 260.152 437.794 103.016 380.93 0 521.287 151.707 491.48 394.785 224 387.814z"/></svg>\")',
		];

		urlFunctions
			.reduce((acc, func) => {
				acc.push(
					func,
					addSpacesNearParentheses(func)
				);

				return acc;
			}, [])
			.forEach((func) => {
				it(`should match ${func}`, () => {
					expect(func.match(reUrlFunctionWithArg)[0]).toBe(func);
				});
			});
	});
});
