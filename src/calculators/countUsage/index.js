export function countUsage(value, usageCounter) {
	if (usageCounter[value] !== undefined) {
		usageCounter[value] += 1;
	} else {
		usageCounter[value] = 1;
	}
}
