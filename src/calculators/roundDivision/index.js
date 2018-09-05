export function roundDivision(totalSum, totalNumber, precision) {
	if (totalNumber !== 0) {
		return Number.isInteger(precision)
			? Number((totalSum / totalNumber).toFixed(precision))
			: totalSum / totalNumber;
	}

	return 0;
}
