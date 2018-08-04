import { isValidCubicBezierArgs } from '.';

describe('Module: isValidCubicBezierArgs', () => {
	describe('Positives', () => {
		const validCubicBeziers = [
			'cubic-bezier(0.1, 0.7, 1.0, 0.1)',
			'cubic-bezier(0, 0, 1, 1)',
			'cubic-bezier(0.1, -0.6, 0.2, 0)',
			'cubic-bezier(0, 1.1, 0.8, 4)',
		];

		validCubicBeziers.forEach((func) => {
			it(`should return 'true' for ${func}`, () => {
				expect(isValidCubicBezierArgs(func)).toBe(true);
			});
		});
	});

	describe('Negatives', () => {
		const invalidCubicBeziers = [
			'cubic-bezier(0.1, red, 1.0, green)',
			'cubic-bezier(2.45, 0.6, 4, 0.1)',
			'cubic-bezier(0.3, 2.1)',
			'cubic-bezier(-1.9, 0.3, -0.2, 2.1)',
		];

		invalidCubicBeziers.forEach((func) => {
			it(`should return 'false' for ${func}`, () => {
				expect(isValidCubicBezierArgs(func)).toBe(false);
			});
		});
	});
});
