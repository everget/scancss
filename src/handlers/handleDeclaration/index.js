import { isShorthandProperty } from 'css-property-parser';

import { cssEngineTriggerProperties } from '../../constants/cssEngineTriggerProperties';
import { cssColorableProperties } from '../../constants/cssColorableProperties';
import { reCssExplicitDefaultingKeyword } from '../../constants/reCssExplicitDefaultingKeyword';
import { rePrefixedString } from '../../constants/rePrefixedString';
import { handleColorableProperty } from '../handleColorableProperty';
import { handleFontProperties } from '../handleFontProperties';
import { handleTransitionsAndAnimations } from '../handleTransitionsAndAnimations';
import { handleFunctions } from '../handleFunctions';
import { handleUnits } from '../handleUnits';
import { handleVariables } from '../handleVariables';
import { handlePerformanceHackProperties } from '../handlePerformanceHackProperties';
import { handleZIndexProperty } from '../handleZIndexProperty';
import { handleDisplayProperty } from '../handleDisplayProperty';
import { handlePositionProperty } from '../handlePositionProperty';
import { handleFloatProperty } from '../handleFloatProperty';
import { handleLetterSpacingProperty } from '../handleLetterSpacingProperty';
import { handleBorderRadiusProperties } from '../handleBorderRadiusProperties';
import { handleVendorPrefix } from '../handleVendorPrefix';
import { countUsage } from '../../calculators/countUsage';
import { removeExtraSpaces } from '../../converters/removeExtraSpaces';

const cssFontProperties = [
	'font',
	'font-size',
	'line-height',
	'font-family',
];

function countEngineTriggerProperties(prop, report) {
	if (Object.keys(cssEngineTriggerProperties).includes(prop)) {
		const engineTriggers = cssEngineTriggerProperties[prop];

		Object
			.keys(engineTriggers)
			.forEach((engine) => {
				if (engineTriggers[engine].layout === true) {
					report.properties.engineTriggers.layout[engine]++;
				}
				if (engineTriggers[engine].paint === true) {
					report.properties.engineTriggers.paint[engine]++;
				}
				if (engineTriggers[engine].composite === true) {
					report.properties.engineTriggers.composite[engine]++;
				}
			});
	}
}

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
	const propValue = decl.value;

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

	if (
		(options.collectColorsData || options.collectBackgroundColorsData || options.collectAllColorsData) &&
		cssColorableProperties.includes(prop)
	) {
		handleColorableProperty(decl, report, options);
	}

	if (options.collectEngineTriggerProperties) {
		countEngineTriggerProperties(prop, report);
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

	/** Count displays */
	if (prop === 'display') {
		handleDisplayProperty(decl, report);
	}

	/** Count positions */
	if (prop === 'position') {
		handlePositionProperty(decl, report);
	}

	/** Count floats */
	if (prop === 'float') {
		handleFloatProperty(decl, report);
	}

	/** Count border radiuses */
	if (
		prop.startsWith('--') === false &&
		prop.includes('border-') &&
		prop.endsWith('-radius')
	) {
		handleBorderRadiusProperties(decl, report);
	}

	/** Count letter spacings */
	if (prop === 'letter-spacing') {
		handleLetterSpacingProperty(decl, report);
	}

	/** Count z-indices */
	if (prop === 'z-index') {
		handleZIndexProperty(decl, report);
	}

	if (options.collectFontsData && cssFontProperties.includes(prop)) {
		handleFontProperties(decl, report);
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
		handlePerformanceHackProperties(decl, report);
	}

	if (reCssExplicitDefaultingKeyword.test(propValue)) {
		propValue
			.match(reCssExplicitDefaultingKeyword)
			.forEach((match) => {
				report.properties.explicitDefaultingKeywords.total++;
				countUsage(match, report.properties.explicitDefaultingKeywords.usage);
			});
	}
}
