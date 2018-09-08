import { isDeprecatedMediaFeature } from '.';

describe('Module: isDeprecatedMediaFeature', () => {
	describe('Positives', () => {
		const deprecatedFeatures = [
			'device-aspect-ratio',
			'device-height',
			'device-width',
			'max-device-aspect-ratio',
			'max-device-height',
			'max-device-width',
			'min-device-aspect-ratio',
			'min-device-height',
			'min-device-width',
			'-webkit-device-aspect-ratio',
			'-webkit-device-height',
			'-webkit-device-width',
			'min--moz-device-aspect-ratio',
			'min--moz-device-height',
			'min--moz-device-width',
		];

		deprecatedFeatures.forEach((feature) => {
			it(`should return 'true' for ${feature}`, () => {
				expect(isDeprecatedMediaFeature(feature)).toBe(true);
			});
		});
	});

	describe('Negatives', () => {
		const nonDeprecatedFeatures = [
			'any-hover',
			'any-pointer',
			'aspect-ratio',
			'color-gamut',
			'color-index',
			'color',
			'device-pixel-ratio',
			'discrete',
			'display-mode',
			'grid',
			'height',
			'hover',
			'inverted-colors',
			'light-level',
		];

		nonDeprecatedFeatures.forEach((feature) => {
			it(`should return 'false' for ${feature}`, () => {
				expect(isDeprecatedMediaFeature(feature)).toBe(false);
			});
		});
	});
});
