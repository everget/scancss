import { cssShorthandPropertiesMap } from '../../constants/cssShorthandPropertiesMap';
import { isShorthandProperty } from '.';

describe('Module: isShorthandProperty', () => {
	describe('Positives', () => {
		Object
			.keys(cssShorthandPropertiesMap)
			.forEach((prop) => {
				it(`should return 'true' for ${prop}`, () => {
					expect(isShorthandProperty(prop)).toBe(true);
				});
			});
	});

	describe('Negatives', () => {
		Object
			.values(cssShorthandPropertiesMap)
			.reduce((acc, props) => acc.concat(props), [])
			/* eslint-disable-next-line arrow-body-style */
			.filter((prop) => {
				return [
					'background-position',
					'border-color',
					'border-style',
					'border-width',
					'font-variant',
				].includes(prop) === false;
			})
			.forEach((prop) => {
				it(`should return 'false' for ${prop}`, () => {
					expect(isShorthandProperty(prop)).toBe(false);
				});
			});
	});
});
