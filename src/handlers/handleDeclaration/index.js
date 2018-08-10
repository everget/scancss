import { isShorthandProperty } from 'css-property-parser';

import { cssColorableProperties } from '../../constants/cssColorableProperties';
import { reCssExplicitDefaultingKeyword } from '../../constants/reCssExplicitDefaultingKeyword';
import { rePrefixedString } from '../../constants/rePrefixedString';
import { handleEngineTriggers } from '../properties/handleEngineTriggers';
import { handleColorable } from '../properties/handleColorable';
import { handleFonts } from '../properties/handleFonts';
import { handleTransitionsAndAnimations } from '../properties/handleTransitionsAndAnimations';
import { handleDisplay } from '../properties/handleDisplay';
import { handlePosition } from '../properties/handlePosition';
import { handleZIndex } from '../properties/handleZIndex';
import { handleFloat } from '../properties/handleFloat';
import { handleBorderRadiuses } from '../properties/handleBorderRadiuses';
import { handleLetterSpacing } from '../properties/handleLetterSpacing';
import { handlePerformanceHacks } from '../properties/handlePerformanceHacks';
import { handleFunctions } from '../handleFunctions';
import { handleUnits } from '../handleUnits';
import { handleVariables } from '../handleVariables';
import { handleVendorPrefix } from '../handleVendorPrefix';
import { countUsage } from '../../calculators/countUsage';
import { removeExtraSpaces } from '../../converters/removeExtraSpaces';

const cssFontProperties = [
	'font',
	'font-size',
	'line-height',
	'font-family',
];

export function handleDeclaration(decl, report, options) {
	report.declarations.total++;

	const declarationByteLength = Buffer.byteLength(decl.toString(), 'utf8');
	report.declarations.totalByteLength += declarationByteLength;

	const normalizedDecl = removeExtraSpaces(decl.toString());

	if (report.declarations.longestByteLength < declarationByteLength) {
		report.declarations.longestByteLength = declarationByteLength;
		report.declarations.longestByteLengthDeclaration = normalizedDecl;
	}

	if (report.declarations.list.includes(normalizedDecl) === false) {
		report.declarations.list.push(normalizedDecl);
	}

	if (decl.important) {
		report.declarations.important++;
	}

	const prop = decl.prop;

	/** Count properties excluding variables */
	if (prop.startsWith('--') === false) {
		report.properties.total++;
		countUsage(prop, report.properties.usage);
	}

	/** Count properties with vendor prefixes */
	if (rePrefixedString.test(prop)) {
		report.properties.prefixed++;
		handleVendorPrefix(prop, report);

		/** Count property shorthands */
		// https://github.com/mahirshah/css-property-parser/issues/31
		const unprefixedProp = prop.replace(rePrefixedString, '');
		if (isShorthandProperty(unprefixedProp)) {
			report.properties.shorthands++;
		}
	} else if (isShorthandProperty(prop)) {
		report.properties.shorthands++;
	}

	const shouldHandleAnyColors = options.collectColorsData ||
		options.collectBackgroundColorsData ||
		options.collectAllColorsData;

	if (shouldHandleAnyColors && cssColorableProperties.includes(prop)) {
		handleColorable(decl, report, options);
	}

	if (options.collectEngineTriggerProperties) {
		handleEngineTriggers(prop, report);
	}

	/**
	 * Count property values resets via `all` property
	 * https://drafts.csswg.org/css-cascade-4/#all-shorthand
	 */
	if (prop === 'all') {
		report.properties.resetsViaAll++;
	}

	/**
	 * Count anonymous replaced elements
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element
	 */
	if (prop === 'content') {
		report.properties.anonymousReplacedElements++;
	}

	if (prop === 'display') {
		handleDisplay(decl, report);
	}

	if (prop === 'position') {
		handlePosition(decl, report);
	}

	if (prop === 'z-index') {
		handleZIndex(decl, report);
	}

	if (prop === 'float') {
		handleFloat(decl, report);
	}

	if (
		prop.startsWith('--') === false &&
		prop.includes('border-') &&
		prop.endsWith('-radius')
	) {
		handleBorderRadiuses(decl, report);
	}

	if (prop === 'letter-spacing') {
		handleLetterSpacing(decl, report);
	}

	if (options.collectFontsData && cssFontProperties.includes(prop)) {
		handleFonts(decl, report);
	}

	if (options.collectFunctionsData) {
		handleFunctions(decl, report, options);
	}

	if (
		options.collectTransitionsAndAnimationsData &&
		(prop.includes('transition') || prop.includes('animation'))
	) {
		handleTransitionsAndAnimations(decl, report);
	}

	if (options.collectVariablesData) {
		handleVariables(decl, report);
	}

	if (options.collectUnitsData) {
		handleUnits(decl, report);
	}

	if (options.collectPerformanceHacksData) {
		handlePerformanceHacks(decl, report);
	}

	if (reCssExplicitDefaultingKeyword.test(decl.value)) {
		decl.value
			.match(reCssExplicitDefaultingKeyword)
			.forEach((match) => {
				report.properties.explicitDefaultingKeywords.total++;
				countUsage(match, report.properties.explicitDefaultingKeywords.usage);
			});
	}
}
