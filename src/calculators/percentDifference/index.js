import { roundDivision } from '../roundDivision';

export function percentDifference(original, processed) {
	return roundDivision(100 * processed, original, 2) + '%';
}
