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
	report.declarations.length.total += declarationByteLength;

	const normalizedDecl = removeExtraSpaces(decl.toString());

	if (report.declarations.length.longest < declarationByteLength) {
		report.declarations.length.longest = declarationByteLength;
		report.declarations.length.longestDeclaration = normalizedDecl;
	}

	if (report.declarations.list.includes(normalizedDecl) === false) {
		report.declarations.list.push(normalizedDecl);
	}

	if (decl.important) {
		report.declarations.important++;
	}

	const prop = decl.prop;

	if (options.properties) {
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

		if (reCssExplicitDefaultingKeyword.test(decl.value)) {
			decl.value
				.match(reCssExplicitDefaultingKeyword)
				.forEach((match) => {
					report.properties.explicitDefaultingKeywords.total++;
					countUsage(match, report.properties.explicitDefaultingKeywords.usage);
				});
		}

		if (options.engineTriggerProperties) {
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

		if (options.performanceHacks) {
			handlePerformanceHacks(decl, report);
		}
	}

	const shouldHandleAnyColors = options.colors ||
		options.backgroundColors ||
		options.allColors;

	if (shouldHandleAnyColors && cssColorableProperties.includes(prop)) {
		handleColorable(decl, report, options);
	}

	if (prop === 'display' && options.displays) {
		handleDisplay(decl, report);
	}

	if (prop === 'position' && options.positions) {
		handlePosition(decl, report);
	}

	if (prop === 'z-index' && options.zIndices) {
		handleZIndex(decl, report);
	}

	if (prop === 'float' && options.floats) {
		handleFloat(decl, report);
	}

	if (
		prop.startsWith('--') === false &&
		prop.includes('border-') &&
		prop.endsWith('-radius') &&
		options.borderRadiuses
	) {
		handleBorderRadiuses(decl, report);
	}

	if (prop === 'letter-spacing' && options.letterSpacings) {
		handleLetterSpacing(decl, report);
	}

	if (cssFontProperties.includes(prop) && options.fonts) {
		handleFonts(decl, report);
	}

	if (options.functions) {
		handleFunctions(decl, report, options);
	}

	if (
		(prop.includes('transition') || prop.includes('animation')) &&
		options.transitionsAndAnimations
	) {
		handleTransitionsAndAnimations(decl, report);
	}

	if (options.variables) {
		handleVariables(decl, report);
	}

	if (options.units) {
		handleUnits(decl, report, options);
	}
}
