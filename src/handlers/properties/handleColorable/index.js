import { default as parser } from 'postcss-values-parser';

import { cssColorNamesMap } from '../../../constants/cssColorNamesMap';
import { cssSystemColors } from '../../../constants/cssSystemColors';
import { cssColorFunctions } from '../../../constants/cssColorFunctions';
import { countUsage } from '../../../calculators/countUsage';
import { restoreFullHex } from '../../../converters/restoreFullHex';
import { transformString } from '../../../converters/transformString';
import { trimExtraSpaces } from '../../../converters/trimExtraSpaces';
import { trimSpacesNearCommas } from '../../../converters/trimSpacesNearCommas';
import { trimSpacesNearParentheses } from '../../../converters/trimSpacesNearParentheses';
import { trimLeadingZeros } from '../../../converters/trimLeadingZeros';
import { trimTrailingZeros } from '../../../converters/trimTrailingZeros';
import { isSafeAst } from '../../../predicates/isSafeAst';

const cssColorNames = Object.keys(cssColorNamesMap);
const lowercasedCssSystemColors = cssSystemColors.map((color) => color.toLowerCase());

function countColorInSection(color, reportSection) {
	reportSection.total++;
	countUsage(color, reportSection.usage);
}

function countKeywordColor(prop, color, report, options) {
	const reportSectionName = color + 'Keyword';

	if (prop.startsWith('background') && options.backgroundColors) {
		countColorInSection(color, report.backgroundColors);
		report.backgroundColors[reportSectionName]++;
	} else if (prop.startsWith('background') === false && options.colors) {
		countColorInSection(color, report.colors);
		report.colors[reportSectionName]++;
	}

	/* istanbul ignore else */
	if (options.allColors) {
		countColorInSection(color, report.allColors);
		report.allColors[reportSectionName]++;
	}
}

/**
 * https://www.w3.org/TR/CSS22/ui.html#system-colors
 */
function countNamedColor(prop, color, report, options) {
	if (prop.startsWith('background') && options.backgroundColors) {
		countColorInSection(color, report.backgroundColors);
		countUsage(color, report.backgroundColors.named);
	} else if (prop.startsWith('background') === false && options.colors) {
		countColorInSection(color, report.colors);
		countUsage(color, report.colors.named);
	}

	if (options.allColors) {
		countColorInSection(color, report.allColors);
		countUsage(color, report.allColors.named);
	}
}

function normalizeModelColor(color) {
	if (color.startsWith('#')) {
		return color.length === 4 || color.length === 5
			? restoreFullHex(color)
			: color;
	}

	return transformString(
		color,
		[
			trimExtraSpaces,
			trimSpacesNearCommas,
			trimSpacesNearParentheses,
			trimTrailingZeros,
			trimLeadingZeros,
		]
	);
}

function countColorModel(prop, color, report, model, options) {
	const normalizedColor = normalizeModelColor(color);

	if (prop.startsWith('background') && options.backgroundColors) {
		countColorInSection(normalizedColor, report.backgroundColors);
		countUsage(model, report.backgroundColors.models);
	} else if (prop.startsWith('background') === false && options.colors) {
		countColorInSection(normalizedColor, report.colors);
		countUsage(model, report.colors.models);
	}

	if (options.allColors) {
		countColorInSection(normalizedColor, report.allColors);
		countUsage(model, report.allColors.models);
	}
}

function countSystemColor(prop, color, report, options) {
	if (prop.startsWith('background') && options.backgroundColors) {
		countColorInSection(color, report.backgroundColors);
		countUsage(color, report.backgroundColors.system);
	} else if (prop.startsWith('background') === false && options.colors) {
		countColorInSection(color, report.colors);
		countUsage(color, report.colors.system);
	}

	if (options.allColors) {
		countColorInSection(color, report.allColors);
		countUsage(color, report.allColors.system);
	}
}

function walkNodes(nodes, decl, report, options) {
	nodes.forEach((node) => {
		const lowerCasedValue = node.value.toLowerCase();

		if (node.type === 'word') {
			if (cssColorNames.includes(lowerCasedValue)) {
				countNamedColor(
					decl.prop,
					lowerCasedValue,
					report,
					options
				);

				return;
			}

			if (lowerCasedValue === 'transparent') {
				countKeywordColor(
					decl.prop,
					'transparent',
					report,
					options
				);

				return;
			}

			if (lowerCasedValue === 'currentcolor') {
				countKeywordColor(
					decl.prop,
					'currentColor',
					report,
					options
				);

				return;
			}

			if (lowerCasedValue.startsWith('#')) {
				if (lowerCasedValue.length === 4 || lowerCasedValue.length === 7) {
					countColorModel(
						decl.prop,
						lowerCasedValue,
						report,
						'hex',
						options
					);

					return;
				}

				/* istanbul ignore else */
				if (lowerCasedValue.length === 5 || lowerCasedValue.length === 9) {
					countColorModel(
						decl.prop,
						lowerCasedValue,
						report,
						'hexa',
						options
					);

					return;
				}
			}

			if (lowercasedCssSystemColors.includes(lowerCasedValue)) {
				countSystemColor(
					decl.prop,
					lowerCasedValue,
					report,
					options
				);

				return;
			}
		}

		if (node.type === 'func') {
			if (cssColorFunctions.includes(lowerCasedValue)) {
				countColorModel(
					decl.prop,
					node.toString(),
					report,
					lowerCasedValue,
					options
				);
			}

			/* istanbul ignore else */
			if (Array.isArray(node.nodes)) {
				walkNodes(node.nodes, decl, report, options);
			}
		}
	});
}

export function handleColorable(decl, report, options) {
	const ast = parser(decl.value).parse();

	/* istanbul ignore else */
	if (isSafeAst(ast)) {
		walkNodes(ast.nodes[0].nodes, decl, report, options);
	}
}
