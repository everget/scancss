import postcss from 'postcss';
import { expandShorthandProperty } from 'css-property-parser';

import { cssGenericFonts } from '../../constants/cssGenericFonts';
import { cssSystemFonts } from '../../constants/cssSystemFonts';
import { reExistingVendorPrefix } from '../../constants/reExistingVendorPrefix';
import { countUsage } from '../../calculators/countUsage';
import { removeExtraSpaces } from '../../converters/removeExtraSpaces';
import { handleVendorPrefix } from '../handleVendorPrefix';
import { isNumber } from '../../predicates/isNumber';

function countFontSizes(propValue, report) {
	report.fontSizes.total++;
	countUsage(propValue, report.fontSizes.usage);
}

function countLineHeights(propValue, report) {
	report.lineHeights.total++;
	countUsage(propValue, report.lineHeights.usage);

	/** Count hard-coded line-heights, i.e `line-height: 16px` */
	if (isNumber(Number(propValue)) === false) {
		report.lineHeights.hardCoded++;
	}
}

function countFontFamilies(propValue, report) {
	const familiesList = postcss.list.comma(propValue);

	familiesList
		.map((family) => family.trim().replace(/['"]/g, '').trim())
		.forEach((family) => {
			report.fontFamilies.total++;

			if (reExistingVendorPrefix.test(family)) {
				handleVendorPrefix(family, report);
			}

			if (cssGenericFonts.includes(family)) {
				countUsage(family, report.fontFamilies.generic);
			}

			countUsage(family, report.fontFamilies.usage);
		});

	if (familiesList.length === 1) {
		report.fontFamilies.withoutFallbackFonts++;
	}
}

export function handleFontProperties(decl, report) {
	const cleanedValue = removeExtraSpaces(decl.value);

	if (decl.prop === 'font') {
		// http://nicolasgallagher.com/another-css-image-replacement-technique/
		if (/^0\/0 [a-z]/.test(cleanedValue)) {
			report.fontFamilies.imageReplacementHacks++;
		}

		if (cssSystemFonts.includes(decl.value)) {
			countUsage(decl.value, report.fontFamilies.system);
			return;
		}

		const fontLonghand = expandShorthandProperty(decl.prop, cleanedValue);

		if (typeof fontLonghand['font-size'] === 'string') {
			countFontSizes(
				removeExtraSpaces(fontLonghand['font-size']),
				report
			);
		}

		if (typeof fontLonghand['line-height'] === 'string') {
			countLineHeights(
				removeExtraSpaces(fontLonghand['line-height']),
				report
			);
		}

		if (typeof fontLonghand['font-family'] === 'string') {
			countFontFamilies(
				removeExtraSpaces(fontLonghand['font-family']),
				report
			);
		}
	}

	if (decl.prop === 'font-size') {
		countFontSizes(cleanedValue, report);
	}

	if (decl.prop === 'line-height') {
		countLineHeights(cleanedValue, report);
	}

	if (decl.prop === 'font-family') {
		countFontFamilies(cleanedValue, report);
	}
}
