import { reIntegerString } from '../../constants/reIntegerString';

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Examples_2
 *
 * 1) The first parameter must be an <integer> and cannot be a real value, even if it is equal to one.
 * 2) The amount of steps must be non-negative.
 * 3) There must be at least one step.
 */

export function isValidStepsFunctionArgs(func) {
	const args = func.slice(6, -1).split(',');
	const firstArg = args[0];
	const secondArg = args[1];

	if (args.length !== 1 && args.length !== 2) {
		return false;
	}

	if (reIntegerString.test(firstArg) === false || Number(firstArg) < 1) {
		return false;
	}

	if (
		secondArg !== undefined &&
		['start', 'end'].includes(secondArg.trim()) === false
	) {
		return false;
	}

	return true;
}
