import { rePercentage } from '../../constants/rePercentage';
import { trimSpacesNearCommas } from '../../converters/trimSpacesNearCommas';

export function isKeyframeSelector(selector) {
	return trimSpacesNearCommas(selector)
		.split(',')
		.map((selectorPart) => selectorPart.trim())
		.some((selectorPart) => /^(from|to)$/.test(selectorPart) || rePercentage.test(selectorPart));
}
