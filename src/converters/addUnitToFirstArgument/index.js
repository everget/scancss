import { reNumberString } from '../../constants/reNumberString';

const reNumberStringSource = reNumberString.source.slice(1, -1);

export function addUnitToFirstArgument(str, unit) {
	return str.replace(new RegExp('(\\(' + reNumberStringSource + ')', 'g'), '$1' + unit);
}
