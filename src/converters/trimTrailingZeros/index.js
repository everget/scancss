import { reNumberString } from '../../constants/reNumberString';

const reNumberStringSource = reNumberString.source.slice(1, -1);
const reNumberStringGlobal = new RegExp(reNumberStringSource, 'g');

export function trimTrailingZeros(str) {
	return str.replace(reNumberStringGlobal, (match) => {
		const parsed = parseFloat(match);
		return Number.isNaN(parsed) ? match : String(parsed);
	});
}
