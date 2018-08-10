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
import { removeExtraSpaces } from '../../../converters/removeExtraSpaces';

/**
 * https://www.w3.org/TR/css-color-3/#currentcolor
 * https://www.w3.org/TR/css-color-4/#currentcolor-color
 */
const reCurrentColor = /\bcurrent[cC]olor\b/g;

function countCurrentColors(prop, match, report, options) {
	const reportSection = prop.startsWith('background')
		? report.backgroundColors
		: report.colors;

	match.forEach((keyword) => {
		reportSection.total++;
		reportSection.currentColorKeyword++;
		countUsage(keyword, reportSection.usage);

		if (options.collectAllColorsData) {
			report.allColors.total++;
			report.allColors.currentColorKeyword++;
			countUsage(keyword, report.allColors.usage);
		}
	});
}

const reTransparentColor = /\btransparent\b/g;

function countTransparentColors(prop, match, report, options) {
	const reportSection = prop.startsWith('background')
		? report.backgroundColors
		: report.colors;

	match.forEach((keyword) => {
		reportSection.total++;
		reportSection.transparentKeyword++;
		countUsage(keyword, reportSection.usage);

		if (options.collectAllColorsData) {
			report.allColors.total++;
			report.allColors.transparentKeyword++;
			countUsage(keyword, report.allColors.usage);
		}
	});
}

function countNamedColors(prop, match, report, options) {
	const reportSection = prop.startsWith('background')
		? report.backgroundColors
		: report.colors;

	match.forEach((color) => {
		reportSection.total++;

		/** Color name declaration is not case sensitive */
		const lowerCasedColor = color.toLowerCase();
		countUsage(lowerCasedColor, reportSection.usage);
		countUsage(lowerCasedColor, reportSection.named);

		if (options.collectAllColorsData) {
			report.allColors.total++;
			countUsage(lowerCasedColor, report.allColors.usage);
			countUsage(lowerCasedColor, report.allColors.named);
		}
	});
}

function countColorModels(prop, match, report, model, options) {
	const reportSection = prop.startsWith('background')
		? report.backgroundColors
		: report.colors;

	match.forEach((color) => {
		let normalizedColor;

		if (color.startsWith('#')) {
			normalizedColor = color.length === 4 || color.length === 5
				? restoreFullHex(color).toLowerCase()
				: color.toLowerCase();
		} else {
			normalizedColor = removeExtraSpaces(color);
		}

		reportSection.total++;
		countUsage(normalizedColor, reportSection.usage);
		countUsage(model, reportSection.models);

		if (options.collectAllColorsData) {
			report.allColors.total++;
			countUsage(normalizedColor, report.allColors.usage);
			countUsage(model, report.allColors.models);
		}
	});
}

function countSystemColors(prop, match, report, options) {
	const reportSection = prop.startsWith('background')
		? report.backgroundColors
		: report.colors;

	match.forEach((color) => {
		reportSection.total++;
		countUsage(color, reportSection.usage);
		countUsage(color, reportSection.system);

		if (options.collectAllColorsData) {
			report.allColors.total++;
			countUsage(color, report.allColors.usage);
			countUsage(color, report.allColors.system);
		}
	});
}

export function handleColorable(decl, report, options) {
	const prop = decl.prop;
	const propValue = decl.value;

	if (reCurrentColor.test(propValue)) {
		countCurrentColors(
			prop,
			propValue.match(reCurrentColor),
			report,
			options
		);
	}

	if (reTransparentColor.test(propValue)) {
		countTransparentColors(
			prop,
			propValue.match(reTransparentColor),
			report,
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
