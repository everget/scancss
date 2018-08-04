export function restoreFullHex(hexColor) {
	const fullHex = ''.concat(
		'#',
		hexColor.charAt(1),
		hexColor.charAt(1),
		hexColor.charAt(2),
		hexColor.charAt(2),
		hexColor.charAt(3),
		hexColor.charAt(3)
	);

	if (hexColor.length === 5) {
		return fullHex.concat(
			hexColor.charAt(4),
			hexColor.charAt(4)
		);
	}

	return fullHex;
}
