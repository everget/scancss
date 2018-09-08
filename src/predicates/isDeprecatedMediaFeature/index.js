import { cssDeprecatedMediaFeatures } from '../../constants/cssDeprecatedMediaFeatures';

export function isDeprecatedMediaFeature(feature) {
	return cssDeprecatedMediaFeatures.some((deprecatedFeature) => feature.endsWith(deprecatedFeature));
}
