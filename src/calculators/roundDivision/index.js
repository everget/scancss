export function roundDivision(totalSum, totalNumber, precision) {
	return totalNumber !== 0
		? Number.isInteger(precision)
			? Number((totalSum / totalNumber).toFixed(precision))
			: totalSum / totalNumber
		: 0;
}
