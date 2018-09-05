import { default as parser } from 'postcss-values-parser';

import { cssFilterFunctions } from '../../constants/cssFilterFunctions';
import { reCssGradientFunctionName } from '../../constants/reCssGradientFunctionName';
import { reImageDataUri } from '../../constants/reImageDataUri';
import { rePrefixedString } from '../../constants/rePrefixedString';
import { countUsage } from '../../calculators/countUsage';
import { transformString } from '../../converters/transformString';
import { trimExtraSpaces } from '../../converters/trimExtraSpaces';
import { trimSpacesNearCommas } from '../../converters/trimSpacesNearCommas';
import { trimSpacesNearParentheses } from '../../converters/trimSpacesNearParentheses';
import { trimLeadingZeros } from '../../converters/trimLeadingZeros';
import { trimTrailingZeros } from '../../converters/trimTrailingZeros';

import { isSafeAst } from '../../predicates/isSafeAst';
import { isValidCubicBezierArgs } from '../../predicates/isValidCubicBezierArgs';
import { isValidFramesFunctionArgs } from '../../predicates/isValidFramesFunctionArgs';
import { isValidStepsFunctionArgs } from '../../predicates/isValidStepsFunctionArgs';
import { handleVendorPrefix } from '../handleVendorPrefix';

function countFunction(func, report) {
	report.functions.total++;
	countUsage(func, report.functions.usage);

	if (rePrefixedString.test(func)) {
		report.functions.prefixed++;
		handleVendorPrefix(func, report);
	}
}

function countFilter(funcWithArgs, report) {
	report.filters.total++;
	countUsage(funcWithArgs, report.filters.usage);
}

function countDataUri(funcWithArgs, report) {
	const processedFunc = transformString(
		funcWithArgs,
		[
			trimExtraSpaces,
			trimSpacesNearCommas,
			trimSpacesNearParentheses,
		]
	);

	const urlArg = processedFunc
		.replace(/^url\(\s*['"]?\s*/g, '')
		.replace(/\s*['"]?\s*\)/g, '')
		.replace(/(\/?>)\s*(<\/?)/g, '$1$2');


	if (urlArg.match(reImageDataUri) !== null) {
		report.dataUris.total++;

		const dataUriByteLength = Buffer.byteLength(urlArg, 'utf8');
		report.dataUris.length.total += dataUriByteLength;

		if (report.dataUris.length.longest < dataUriByteLength) {
			report.dataUris.length.longest = dataUriByteLength;
			report.dataUris.length.longestDataUri = urlArg;
		}

		countUsage(urlArg, report.dataUris.usage);
	}
}

function countGradient(funcWithArgs, report) {
	report.gradients.total++;
	countUsage(funcWithArgs, report.gradients.usage);
}

function countCubicBezier(funcWithArgs, prop, report) {
	const reportSection = prop.includes('animation')
		? report.animations
		: report.transitions;

	countUsage(funcWithArgs, reportSection.timingFunctions);

	const processedFunc = transformString(
		funcWithArgs,
		[
			trimExtraSpaces,
			trimSpacesNearCommas,
			trimSpacesNearParentheses,
			trimTrailingZeros,
			trimLeadingZeros,
		]
	);

	/**
	 * Count invalid cubic beziers
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Examples
	 */
	if (isValidCubicBezierArgs(processedFunc) === false) {
		countUsage(funcWithArgs, reportSection.invalidTimingFunctions);
	}
}

function countStepsFunction(funcWithArgs, prop, report) {
	const reportSection = prop.includes('animation')
		? report.animations
		: report.transitions;

	countUsage(funcWithArgs, reportSection.timingFunctions);

	const processedFunc = transformString(
		funcWithArgs,
		[
			trimExtraSpaces,
			trimSpacesNearCommas,
			trimSpacesNearParentheses,
		]
	);

	/**
	 * Count invalid cubic beziers
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Examples
	 */
	if (isValidStepsFunctionArgs(processedFunc) === false) {
		countUsage(funcWithArgs, reportSection.invalidTimingFunctions);
	}
}

function countFramesFunction(funcWithArgs, prop, report) {
	const reportSection = prop.includes('animation')
		? report.animations
		: report.transitions;

	countUsage(funcWithArgs, reportSection.timingFunctions);

	const processedFunc = transformString(
		funcWithArgs,
		[
			trimExtraSpaces,
			trimSpacesNearCommas,
			trimSpacesNearParentheses,
		]
	);

	/**
	 * Count invalid cubic beziers
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Examples
	 */
	if (isValidFramesFunctionArgs(processedFunc) === false) {
		countUsage(funcWithArgs, reportSection.invalidTimingFunctions);
	}
}

function walkFunctionNodes(nodes, decl, report, options) {
	/* eslint-disable-next-line complexity */
	nodes.forEach((node) => {
		if (node.type === 'func') {
			const funcName = node.value.toLowerCase();
			const funcWithArgs = node.toString().trim();

			countFunction(funcName, report);

			if (cssFilterFunctions.includes(funcName) && options.filters) {
				countFilter(funcWithArgs, report);
			}

			if (funcName.match(reCssGradientFunctionName) !== null && options.gradients) {
				countGradient(funcWithArgs, report);
			}

			if (funcName === 'cubic-bezier' && options.transitionsAndAnimations) {
				countCubicBezier(funcWithArgs, decl.prop, report);
			}

			if (funcName === 'steps' && options.transitionsAndAnimations) {
				countStepsFunction(funcWithArgs, decl.prop, report);
			}

			if (funcName === 'frames' && options.transitionsAndAnimations) {
				countFramesFunction(funcWithArgs, decl.prop, report);
			}

			if (funcName === 'url' && options.dataUris) {
				countDataUri(funcWithArgs, report);
			}

			if (Array.isArray(node.nodes)) {
				walkFunctionNodes(node.nodes, decl, report, options);
			}
		}
	});
}

export function handleFunctions(decl, report, options) {
	try {
		const ast = parser(decl.value).parse();

		if (isSafeAst(ast)) {
			walkFunctionNodes(ast.nodes[0].nodes, decl, report, options);
		}
	} catch (err) {
		/* eslint-disable-next-line no-console */
		console.log(`'postcss-values-parser' module error\n${err}`);
	}
}
