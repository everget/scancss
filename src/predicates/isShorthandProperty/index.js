import { cssShorthandProperties } from '../../constants/cssShorthandProperties';
import { rePrefixedString } from '../../constants/rePrefixedString';

export function isShorthandProperty(property) {
	if (rePrefixedString.test(property)) {
		return Object
			.keys(cssShorthandProperties)
			.includes(property.replace(rePrefixedString, ''));
	}

	return Object
		.keys(cssShorthandProperties)
		.includes(property);
}
