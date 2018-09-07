import { default as parser } from 'postcss-values-parser';

import { cssColorableProperties } from '../../constants/cssColorableProperties';
import { cssExplicitDefaultingKeywords } from '../../constants/cssExplicitDefaultingKeywords';
import { rePrefixedString } from '../../constants/rePrefixedString';
import { isSafeAst } from '../../predicates/isSafeAst';
import { isShorthandProperty } from '../../predicates/isShorthandProperty';
import { isCustomProperty } from '../../predicates/isCustomProperty';
import { countUsage } from '../../calculators/countUsage';
import { transformString } from '../../converters/transformString';
import { trimExtraSpaces } from '../../converters/trimExtraSpaces';
import { trimSpacesNearColon } from '../../converters/trimSpacesNearColon';
import { trimSpacesNearCommas } from '../../converters/trimSpacesNearCommas';
import { trimSpacesNearParentheses } from '../../converters/trimSpacesNearParentheses';

import { handleEngineTriggers } from '../properties/handleEngineTriggers';
import { handleColorable } from '../properties/handleColorable';
import { handleFonts } from '../properties/handleFonts';
import { handleTransitionsAndAnimations } from '../properties/handleTransitionsAndAnimations';
import { handleDisplay } from '../properties/handleDisplay';
import { handlePosition } from '../properties/handlePosition';
import { handleZIndex } from '../properties/handleZIndex';
import { handleFloat } from '../properties/handleFloat';
import { handleBorderRadiuses } from '../properties/handleBorderRadiuses';
import { handleWidth } from '../properties/handleWidth';
import { handleHeight } from '../properties/handleHeight';
import { handleLetterSpacing } from '../properties/handleLetterSpacing';
import { handlePerformanceHacks } from '../properties/handlePerformanceHacks';
import { handleFunctions } from '../handleFunctions';
import { handleUnits } from '../handleUnits';
import { handleVariables } from '../handleVariables';
import { handleVendorPrefix } from '../handleVendorPrefix';

const supportedCssFontProperties = [
	'font',
	'font-size',
	'line-height',
	'font-family',
];

/* eslint-disable-next-line complexity */
export function handleDeclaration(decl, report, options) {
	report.declarations.total++;

	const declarationByteLength = Buffer.byteLength(decl.toString(), 'utf8');
	report.declarations.length.total += declarationByteLength;

	const normalizedDecl = transformString(
		decl.toString(),
		[
			trimExtraSpaces,
			trimSpacesNearColon,
			trimSpacesNearCommas,
			trimSpacesNearParentheses,
		]
	);

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
		if (isCustomProperty(prop) === false) {
			report.properties.total++;
			countUsage(prop, report.properties.usage);
		}

		/** Count properties with vendor prefixes */
		if (rePrefixedString.test(prop)) {
			report.properties.prefixed++;
			handleVendorPrefix(prop, report);
		}

		/** Count property shorthands */
		if (isShorthandProperty(prop)) {
			report.properties.shorthands++;
		}

		try {
			const ast = parser(decl.value).parse();

			if (isSafeAst(ast)) {
				ast.nodes[0].nodes
					.forEach((node) => {
						const nodeValue = node.value.toLowerCase();

						if (node.type === 'word' && cssExplicitDefaultingKeywords.includes(nodeValue)) {
							const keyword = nodeValue + 'Keyword';
							report.properties[keyword]++;
						}

						if (node.type === 'word' && nodeValue === 'auto') {
							report.properties.autoKeyword++;
						}
					});
			}
		} catch (err) {
			/* eslint-disable-next-line no-console */
			console.log(`'postcss-values-parser' module error\n${err}`);
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
		isCustomProperty(prop) === false &&
		prop.includes('border-') &&
		prop.endsWith('-radius') &&
		options.borderRadiuses
	) {
		handleBorderRadiuses(decl, report);
	}

	if (prop === 'width' && options.widths) {
		handleWidth(decl, report);
	}

	if (prop === 'height' && options.heights) {
		handleHeight(decl, report);
	}

	if (prop === 'letter-spacing' && options.letterSpacings) {
		handleLetterSpacing(decl, report);
	}

	if (supportedCssFontProperties.includes(prop) && options.fonts) {
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
