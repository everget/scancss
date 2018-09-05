import { isCustomProperty } from '.';

describe('Module: isCustomProperty', () => {
	describe('Positives', () => {
		const properties = [
			'--COLOR',
			'--alert-color',
			'--bgcolour',
			'--bqindents',
			'--color',
		];

		properties.forEach((prop) => {
			it(`should return 'true' for ${prop}`, () => {
				expect(isCustomProperty(prop)).toBe(true);
			});
		});
	});

	describe('Negatives', () => {
		const notCustomProperties = [
			'content',
			'display',
			'position',
			'z-index',
			'float',
		];

		notCustomProperties.forEach((prop) => {
			it(`should return 'false' for ${prop}`, () => {
				expect(isCustomProperty(prop)).toBe(false);
			});
		});
	});
});
