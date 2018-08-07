import { reCssFunction } from '../../constants/reCssFunction';
import { reGradient } from '../../constants/reGradient';
import { reCubicBezier } from '../../constants/reCubicBezier';
import { reUrlFunctionWithArg } from '../../constants/reUrlFunctionWithArg';
import { reImageDataUri } from '../../constants/reImageDataUri';
import { rePrefixedString } from '../../constants/rePrefixedString';
import { countUsage } from '../../calculators/countUsage';
import { removeExtraSpaces } from '../../converters/removeExtraSpaces';
import { isValidCubicBezierArgs } from '../../predicates/isValidCubicBezierArgs';
import { handleVendorPrefix } from '../handleVendorPrefix';

function countFunctions(decl, report) {
	decl.value
		.match(reCssFunction)
		.map((func) => func.slice(0, func.indexOf('(')))
		.forEach((func) => {
			report.functions.total++;
			countUsage(func, report.functions.usage);

			if (rePrefixedString.test(func)) {
				report.functions.vendorPrefixed++;
				handleVendorPrefix(func, report);
			}
		});
}

function countDataUris(decl, report) {
	decl.value
		.match(reUrlFunctionWithArg)
		/* eslint-disable-next-line arrow-body-style */
		.map((func) => {
			return removeExtraSpaces(func)
				.replace(/^url\(['"]?/g, '')
				.replace(/['"]?\)/g, '');
		})
		.forEach((urlArg) => {
			if (urlArg.match(reImageDataUri) !== null) {
				report.dataUris.total++;
				report.dataUris.totalByteLength += Buffer.byteLength(urlArg, 'utf8');
				countUsage(urlArg, report.dataUris.usage);
			}
		});
}

function countGradients(decl, report) {
	decl.value
		.match(reGradient)
		.map((func) => removeExtraSpaces(func))
		.forEach((func) => {
			report.gradients.total++;
			countUsage(func, report.gradients.usage);
		});
}

function countCubicBeziers(decl, report, options) {
	const reportSection = decl.prop.includes('animation')
		? report.animations
		: report.transitions;

	decl.value
		.match(reCubicBezier)
		.forEach((func) => {
			const processedFunc = removeExtraSpaces(func);
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

export function handleFunctions(decl, report, options) {
	if (reCssFunction.test(decl.value)) {
		countFunctions(decl, report);

		if (
			options.collectDataUrisData &&
			reUrlFunctionWithArg.test(decl.value)
		) {
			countDataUris(decl, report);
		}

		if (
			options.collectGradientsData &&
			reGradient.test(decl.value)
		) {
			countGradients(decl, report);
		}

		if (
			options.collectTransitionsAndAnimationsData &&
			reCubicBezier.test(decl.value)
		) {
			countCubicBeziers(decl, report, options);
		}
	}
}
