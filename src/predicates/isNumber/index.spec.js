import { isNumber } from '.';

describe('Module: isNumber', () => {
	describe('Positives', () => {
		const finiteNumbers = [
			2,
			0.2410,
			3.14159,
			2.71828,
			0.5772156649,
			Number.MAX_SAFE_INTEGER,
			Number.MIN_SAFE_INTEGER,
			Number.EPSILON,
		];

		finiteNumbers.forEach((value) => {
			it(`should return 'true' for ${value}`, () => {
				expect(isNumber(value)).toBe(true);
			});
		});
	});

	describe('Negatives', () => {
		const notFiniteNumbers = [
			NaN,
			'NaN',
			Infinity,
			'Infinity',
			-Infinity,
			'-Infinity',
			'0',
			'px',
		];

		notFiniteNumbers.forEach((value) => {
			it(`should return 'false' for ${value}`, () => {
				expect(isNumber(value)).toBe(false);
			});
		});
	});
});
