import { cssVendorPrefixes } from '../cssVendorPrefixes';
import { reCssGradientFunctionName } from '.';

describe('Module: reCssGradientFunctionName', () => {
	describe('Positives', () => {
		const gradientFunctions = [
			'linear-gradient',
			'repeating-linear-gradient',
			'radial-gradient',
			'repeating-radial-gradient',
			'conic-gradient',
			'repeating-conic-gradient',
		];

		gradientFunctions
			.reduce((acc, func) => {
				acc.push(
					func,
					...cssVendorPrefixes.map((prefix) => prefix + func)
				);

				return acc;
			}, [])
			.forEach((func) => {
				it(`should match ${func}`, () => {
					expect(func.match(reCssGradientFunctionName)[0]).toBe(func);
				});
			});
	});
});
