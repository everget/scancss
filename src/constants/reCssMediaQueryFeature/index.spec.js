import { cssMediaQueryFeatures } from '../cssMediaQueryFeatures';
import { reCssMediaQueryFeature } from '.';

describe('Module: reCssMediaQueryFeature', () => {
	describe('Positives', () => {
		cssMediaQueryFeatures.forEach((feature) => {
			it(`should match ${feature}`, () => {
				expect(feature.match(reCssMediaQueryFeature)[0]).toBe(feature);
			});
		});
	});
});
