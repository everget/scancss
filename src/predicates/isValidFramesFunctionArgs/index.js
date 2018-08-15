import { reIntegerString } from '../../constants/reIntegerString';

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Examples_3
 *
 * 1) The parameter must be an <integer> and cannot be a real value, even if it is equal to one.
 * 2) The amount of frames must be non-negative.
 * 3) There must be at least two frames.
 */

export function isValidFramesFunctionArgs(func) {
	const arg = func.slice(7, -1);

	if (
		reIntegerString.test(arg) &&
		Number(arg) >= 2
	) {
		return true;
	}

	return false;
}
