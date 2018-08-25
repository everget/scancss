import { reCssNamedColor } from '../../../constants/reCssNamedColor';
import { reCssSystemColor } from '../../../constants/reCssSystemColor';
import { reHexColor } from '../../../constants/reHexColor';
import { reHexaColor } from '../../../constants/reHexaColor';
import { reRgbColor } from '../../../constants/reRgbColor';
import { reRgbaColor } from '../../../constants/reRgbaColor';
import { reHslColor } from '../../../constants/reHslColor';
import { reHslaColor } from '../../../constants/reHslaColor';
import { reHwbColor } from '../../../constants/reHwbColor';
import { countUsage } from '../../../calculators/countUsage';
import { restoreFullHex } from '../../../converters/restoreFullHex';
import { transformString } from '../../../converters/transformString';
import { trimExtraSpaces } from '../../../converters/trimExtraSpaces';
import { trimSpacesNearCommas } from '../../../converters/trimSpacesNearCommas';
import { trimSpacesNearParentheses } from '../../../converters/trimSpacesNearParentheses';
import { trimLeadingZeros } from '../../../converters/trimLeadingZeros';
import { trimTrailingZeros } from '../../../converters/trimTrailingZeros';

function countColorInSection(color, reportSection) {
	reportSection.total++;
	countUsage(color, reportSection.usage);
}

/**
 * https://www.w3.org/TR/css-color-3/#currentcolor
 * https://www.w3.org/TR/css-color-4/#currentcolor-color
 */
const reCurrentColor = /\bcurrentcolor\b/gi;
const reTransparentColor = /\btransparent\b/gi;

function countKeywordColors(prop, match, report, keyword, options) {
	const reportSectionName = keyword + 'Keyword';

	if (prop.startsWith('background') && options.backgroundColors) {
		match.forEach(() => {
			countColorInSection(keyword, report.backgroundColors);
			report.backgroundColors[reportSectionName]++;
		});
	} else if (prop.startsWith('background') === false && options.colors) {
		match.forEach(() => {
			countColorInSection(keyword, report.colors);
			report.colors[reportSectionName]++;
		});
	}

	if (options.allColors) {
		match.forEach(() => {
			if (options.allColors) {
				countColorInSection(keyword, report.allColors);
				report.allColors[reportSectionName]++;
			}
		});
	}
}

/**
 * https://www.w3.org/TR/CSS22/ui.html#system-colors
 */
function countNamedColors(prop, match, report, options) {
	if (prop.startsWith('background') && options.backgroundColors) {
		match.forEach((color) => {
			const lowerCasedColor = color.toLowerCase();

			countColorInSection(lowerCasedColor, report.backgroundColors);
			countUsage(lowerCasedColor, report.backgroundColors.named);
		});
	} else if (prop.startsWith('background') === false && options.colors) {
		match.forEach((color) => {
			const lowerCasedColor = color.toLowerCase();

			countColorInSection(lowerCasedColor, report.colors);
			countUsage(lowerCasedColor, report.colors.named);
		});
	}

	if (options.allColors) {
		match.forEach((color) => {
			const lowerCasedColor = color.toLowerCase();

			countColorInSection(lowerCasedColor, report.allColors);
			countUsage(lowerCasedColor, report.allColors.named);
		});
	}
}

function normalizeModelColor(color) {
	if (color.startsWith('#')) {
		return color.length === 4 || color.length === 5
			? restoreFullHex(color).toLowerCase()
			: color.toLowerCase();
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

function countColorModels(prop, match, report, model, options) {
	if (prop.startsWith('background') && options.backgroundColors) {
		match.forEach((color) => {
			const normalizedColor = normalizeModelColor(color);

			countColorInSection(normalizedColor, report.backgroundColors);
			countUsage(model, report.backgroundColors.models);
		});
	} else if (prop.startsWith('background') === false && options.colors) {
		match.forEach((color) => {
			const normalizedColor = normalizeModelColor(color);

			countColorInSection(normalizedColor, report.colors);
			countUsage(model, report.colors.models);
		});
	}

	if (options.allColors) {
		match.forEach((color) => {
			const normalizedColor = normalizeModelColor(color);

			countColorInSection(normalizedColor, report.allColors);
			countUsage(model, report.allColors.models);
		});
	}
}

function countSystemColors(prop, match, report, options) {
	if (prop.startsWith('background') && options.backgroundColors) {
		match.forEach((color) => {
			const lowerCasedColor = color.toLowerCase();

			countColorInSection(lowerCasedColor, report.backgroundColors);
			countUsage(lowerCasedColor, report.backgroundColors.system);
		});
	} else if (prop.startsWith('background') === false && options.colors) {
		match.forEach((color) => {
			const lowerCasedColor = color.toLowerCase();

			countColorInSection(lowerCasedColor, report.colors);
			countUsage(lowerCasedColor, report.colors.system);
		});
	}

	if (options.allColors) {
		match.forEach((color) => {
			const lowerCasedColor = color.toLowerCase();

			countColorInSection(lowerCasedColor, report.allColors);
			countUsage(lowerCasedColor, report.allColors.system);
		});
	}
}

export function handleColorable(decl, report, options) {
	const prop = decl.prop;
	const propValue = decl.value;

	if (reCurrentColor.test(propValue)) {
		countKeywordColors(
			prop,
			propValue.match(reCurrentColor),
			report,
			'currentColor',
			options
		);
	}

	if (reTransparentColor.test(propValue)) {
		countKeywordColors(
			prop,
			propValue.match(reTransparentColor),
			report,
			'transparent',
			options
		);
	}

	if (reCssNamedColor.test(propValue)) {
		countNamedColors(
			prop,
			propValue.match(reCssNamedColor),
			report,
			options
		);
	}

	if (reHexColor.test(propValue)) {
		countColorModels(
			prop,
			propValue.match(reHexColor),
			report,
			'hex',
			options
		);
	}

	if (reHexaColor.test(propValue)) {
		countColorModels(
			prop,
			propValue.match(reHexaColor),
			report,
			'hexa',
			options
		);
	}

	if (reRgbColor.test(propValue)) {
		countColorModels(
			prop,
			propValue.match(reRgbColor),
			report,
			'rgb',
			options
		);
	}

	if (reRgbaColor.test(propValue)) {
		countColorModels(
			prop,
			propValue.match(reRgbaColor),
			report,
			'rgba',
			options
		);
	}

	if (reHslColor.test(propValue)) {
		countColorModels(
			prop,
			propValue.match(reHslColor),
			report,
			'hsl',
			options
		);
	}

	if (reHslaColor.test(propValue)) {
		countColorModels(
			prop,
			propValue.match(reHslaColor),
			report,
			'hsla',
			options
		);
	}

	if (reHwbColor.test(propValue)) {
		countColorModels(
			prop,
			propValue.match(reHwbColor),
			report,
			'hwb',
			options
		);
	}

	if (reCssSystemColor.test(propValue)) {
		countSystemColors(
			prop,
			propValue.match(reCssSystemColor),
			report,
			options
		);
	}
}
