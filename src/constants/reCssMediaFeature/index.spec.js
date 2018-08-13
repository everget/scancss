import { cssMediaFeatures } from '../cssMediaFeatures';
import { reCssMediaFeature } from '.';

describe('Module: reCssMediaFeature', () => {
	describe('Positives', () => {
		cssMediaFeatures.forEach((feature) => {
			it(`should match ${feature}`, () => {
				expect(feature.match(reCssMediaFeature)[0]).toBe(feature);
			});
		});
	});
});
