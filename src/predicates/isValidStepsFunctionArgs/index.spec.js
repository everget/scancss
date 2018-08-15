import { isValidStepsFunctionArgs } from '.';

describe('Module: isValidStepsFunctionArgs', () => {
	describe('Positives', () => {
		const validStepsFunctions = [
			'steps(5, end)',
			'steps(5,end)',
			'steps(2, start)',
			'steps(2,start)',
			'steps(2)',
		];

		validStepsFunctions.forEach((func) => {
			it(`should return 'true' for ${func}`, () => {
				expect(isValidStepsFunctionArgs(func)).toBe(true);
			});
		});
	});

	describe('Negatives', () => {
		const invalidStepsFunctions = [
			'steps(2.0, end)',
			'steps(2.0,end)',
			'steps(-3, start)',
			'steps(-3,start)',
			'steps(0, end)',
			'steps(0,end)',
			'steps(0, foo)',
			'steps(0,foo)',
			'steps(0,)',
		];

		invalidStepsFunctions.forEach((func) => {
			it(`should return 'false' for ${func}`, () => {
				expect(isValidStepsFunctionArgs(func)).toBe(false);
			});
		});
	});
});
