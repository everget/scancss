import { cssMediaTypes } from '../cssMediaTypes';
import { reCssMediaType } from '.';

describe('Module: reCssMediaType', () => {
	describe('Positives', () => {
		cssMediaTypes.forEach((type) => {
			it(`should match ${type}`, () => {
				expect(type.match(reCssMediaType)[0]).toBe(type);
			});
		});
	});
});
