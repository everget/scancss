import { reUrlFunctionWithArg } from '.';

describe('Module: reUrlFunctionWithArg', () => {
	describe('Positives', () => {
		const urlFunctions = [
			'url(tada)',
			'url(data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0)',
			'url(\'data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0\')',
			'url(\"data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0\")',
		];

		urlFunctions
			.reduce((acc, func) => {
				acc.push(func);
				acc.push(func.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				return acc;
			}, [])
			.forEach((func) => {
				it(`should match ${func}`, () => {
					expect(func.match(reUrlFunctionWithArg)[0]).toBe(func);
				});
			});
	});
});
