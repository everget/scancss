import { cssFilterFunctions } from '../../constants/cssFilterFunctions';
import { reCssFunction } from '../../constants/reCssFunction';
import { reCssGradient } from '../../constants/reCssGradient';
import { reCubicBezier } from '../../constants/reCubicBezier';
import { reCssFramesFunction } from '../../constants/reCssFramesFunction';
import { reCssStepsFunction } from '../../constants/reCssStepsFunction';
import { reCssUrlFunctionWithArg } from '../../constants/reCssUrlFunctionWithArg';
import { reImageDataUri } from '../../constants/reImageDataUri';
import { rePrefixedString } from '../../constants/rePrefixedString';
import { countUsage } from '../../calculators/countUsage';
import { transformString } from '../../converters/transformString';
import { trimExtraSpaces } from '../../converters/trimExtraSpaces';
import { trimSpacesNearCommas } from '../../converters/trimSpacesNearCommas';
import { trimSpacesNearParentheses } from '../../converters/trimSpacesNearParentheses';
import { trimLeadingZeros } from '../../converters/trimLeadingZeros';
import { trimTrailingZeros } from '../../converters/trimTrailingZeros';

import { isValidCubicBezierArgs } from '../../predicates/isValidCubicBezierArgs';
import { isValidFramesFunctionArgs } from '../../predicates/isValidFramesFunctionArgs';
import { isValidStepsFunctionArgs } from '../../predicates/isValidStepsFunctionArgs';
import { handleVendorPrefix } from '../handleVendorPrefix';

function countFunctions(decl, report, options) {
	decl.value
		.match(reCssFunction)
		.forEach((func) => {
			const processedFunc = func.slice(0, func.indexOf('('));

			report.functions.total++;
			countUsage(processedFunc, report.functions.usage);

			if (rePrefixedString.test(processedFunc)) {
				report.functions.prefixed++;
				handleVendorPrefix(processedFunc, report);
			}

			if (cssFilterFunctions.includes(processedFunc) && options.filters) {
				report.filters.total++;
				countUsage(processedFunc, report.filters.usage);
			}
		});
}

function countDataUris(decl, report) {
	decl.value
		.match(reCssUrlFunctionWithArg)
		/* eslint-disable-next-line arrow-body-style */
		.map((func) => transformString(
			func
				.replace(/^url\(\s*['"]?\s*/g, '')
				.replace(/\s*['"]?\s*\)/g, '')
				.replace(/(\/?>)\s*(<\/?)/g, '$1$2'),
			[
				trimExtraSpaces,
				trimSpacesNearCommas,
				trimSpacesNearParentheses,
			]
		))
		.forEach((urlArg) => {
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
		});
}

function countGradients(decl, report) {
	decl.value
		.match(reCssGradient)
		.forEach((func) => {
			const processedFunc = transformString(
				func,
				[
					trimExtraSpaces,
					trimSpacesNearCommas,
					trimSpacesNearParentheses,
					trimTrailingZeros,
					trimLeadingZeros,
				]
			);

			report.gradients.total++;
			countUsage(processedFunc, report.gradients.usage);
		});
}

function countCubicBeziers(decl, report) {
	const reportSection = decl.prop.includes('animation')
		? report.animations
		: report.transitions;

	decl.value
		.match(reCubicBezier)
		.forEach((func) => {
			const processedFunc = transformString(
				func,
				[
					trimExtraSpaces,
					trimSpacesNearCommas,
					trimSpacesNearParentheses,
					trimTrailingZeros,
					trimLeadingZeros,
				]
			);

			countUsage(processedFunc, reportSection.timingFunctions);

			/**
			 * Count invalid cubic beziers
			 * https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Examples
			 */
			if (isValidCubicBezierArgs(processedFunc) === false) {
				countUsage(processedFunc, reportSection.invalidTimingFunctions);
			}
		});
}

function countStepsFunctions(decl, report) {
	const reportSection = decl.prop.includes('animation')
		? report.animations
		: report.transitions;

	decl.value
		.match(reCssStepsFunction)
		.forEach((func) => {
			const processedFunc = transformString(
				func,
				[
					trimExtraSpaces,
					trimSpacesNearCommas,
					trimSpacesNearParentheses,
				]
			);

			countUsage(processedFunc, reportSection.timingFunctions);

			/**
			 * Count invalid cubic beziers
			 * https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Examples
			 */
			if (isValidStepsFunctionArgs(processedFunc) === false) {
				countUsage(processedFunc, reportSection.invalidTimingFunctions);
			}
		});
}

function countFramesFunctions(decl, report) {
	const reportSection = decl.prop.includes('animation')
		? report.animations
		: report.transitions;

	decl.value
		.match(reCssFramesFunction)
		.forEach((func) => {
			const processedFunc = transformString(
				func,
				[
					trimExtraSpaces,
					trimSpacesNearCommas,
					trimSpacesNearParentheses,
				]
			);

			countUsage(processedFunc, reportSection.timingFunctions);

			/**
			 * Count invalid cubic beziers
			 * https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function#Examples
			 */
			if (isValidFramesFunctionArgs(processedFunc) === false) {
				countUsage(processedFunc, reportSection.invalidTimingFunctions);
			}
		});
}

export function handleFunctions(decl, report, options) {
	if (reCssFunction.test(decl.value)) {
		countFunctions(decl, report, options);

		if (
			reCssUrlFunctionWithArg.test(decl.value) &&
			options.dataUris
		) {
			countDataUris(decl, report);
		}

		if (
			reCssGradient.test(decl.value) &&
			options.gradients
		) {
			countGradients(decl, report);
		}

		if (
			reCubicBezier.test(decl.value) &&
			options.transitionsAndAnimations
		) {
			countCubicBeziers(decl, report);
		}

		if (
			reCssStepsFunction.test(decl.value) &&
			options.transitionsAndAnimations
		) {
			countStepsFunctions(decl, report);
		}

		if (
			reCssFramesFunction.test(decl.value) &&
			options.transitionsAndAnimations
		) {
			countFramesFunctions(decl, report);
		}
	}
}
