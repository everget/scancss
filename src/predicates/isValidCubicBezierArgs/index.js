import { isNumber } from '../isNumber';

export function isValidCubicBezierArgs(func) {
	const funcArgs = func.slice(13, -1).split(',');

	if (
		funcArgs.length !== 4 ||
		funcArgs.some((arg) => isNumber(Number(arg)) === false) ||
		(Number(funcArgs[0]) < 0 || Number(funcArgs[0]) > 1) ||
		(Number(funcArgs[2]) < 0 || Number(funcArgs[2]) > 1)
	) {
		return false;
	}

	return true;
}
