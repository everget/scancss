import { isValidFramesFunctionArgs } from '.';

describe('Module: isValidFramesFunctionArgs', () => {
	describe('Positives', () => {
		const validFramesFunctions = [
			'frames(10)',
		];

		validFramesFunctions.forEach((func) => {
			it(`should return 'true' for ${func}`, () => {
				expect(isValidFramesFunctionArgs(func)).toBe(true);
			});
		});
	});

	describe('Negatives', () => {
		const invalidFramesFunctions = [
			'frames(2.0)',
			'frames(-3)',
			'frames(0)',
		];

		invalidFramesFunctions.forEach((func) => {
			it(`should return 'false' for ${func}`, () => {
				expect(isValidFramesFunctionArgs(func)).toBe(false);
			});
		});
	});
});
