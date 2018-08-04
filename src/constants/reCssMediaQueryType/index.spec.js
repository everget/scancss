import { cssMediaQueryTypes } from '../cssMediaQueryTypes';
import { reCssMediaQueryType } from '.';

describe('Module: reCssMediaQueryType', () => {
	describe('Positives', () => {
		cssMediaQueryTypes.forEach((type) => {
			it(`should match ${type}`, () => {
				expect(type.match(reCssMediaQueryType)[0]).toBe(type);
			});
		});
	});
});
