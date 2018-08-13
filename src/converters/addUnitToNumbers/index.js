import { reNumberString } from '../../constants/reNumberString';

/**
 * https://drafts.csswg.org/css-color/#the-hsl-notation
 */

const reNumberStringSource = reNumberString.source.slice(1, -1);

export function addUnitToNumbers(str, unit) {
	return str.replace(new RegExp('(' + reNumberStringSource + ')', 'g'), '$1' + unit);
}
