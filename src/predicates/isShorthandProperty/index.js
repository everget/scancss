import { cssShorthandPropertiesMap } from '../../constants/cssShorthandPropertiesMap';
import { rePrefixedString } from '../../constants/rePrefixedString';

export function isShorthandProperty(property) {
	if (rePrefixedString.test(property)) {
		return Object
			.keys(cssShorthandPropertiesMap)
			.includes(property.replace(rePrefixedString, ''));
	}

	return Object
		.keys(cssShorthandPropertiesMap)
		.includes(property);
}
