import { reCssFunction } from '../../constants/reCssFunction';
import { reGradient } from '../../constants/reGradient';
import { reCubicBezier } from '../../constants/reCubicBezier';
import { reUrlFunctionWithArg } from '../../constants/reUrlFunctionWithArg';
import { reImageDataUri } from '../../constants/reImageDataUri';
import { countUsage } from '../../calculators/countUsage';
import { removeExtraSpaces } from '../../converters/removeExtraSpaces';
import { isValidCubicBezierArgs } from '../../predicates/isValidCubicBezierArgs';

function countCubicBeziers(decl, report, options) {
	if (options.collectTransitionsAndAnimationsData) {
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
}

export function handleFunctions(decl, report, options) {
	if (reCssFunction.test(decl.value)) {
		decl.value
			.match(reCssFunction)
			.map((func) => func.slice(0, func.indexOf('(')))
			.forEach((func) => {
				report.functions.total++;
				countUsage(func, report.functions.usage);
			});

		if (
			options.collectDataUrisData &&
			reUrlFunctionWithArg.test(decl.value)
		) {
			decl.value
				.match(reUrlFunctionWithArg)
				.map((func) => removeExtraSpaces(func).replace(/^url\(['"]?/g, '').replace(/['"]?\)/g, ''))
				.forEach((urlArg) => {
					if (urlArg.match(reImageDataUri) !== null) {
						report.dataUris.total++;
						report.dataUris.totalByteLength += Buffer.byteLength(urlArg, 'utf8');
						countUsage(urlArg, report.dataUris.usage);
					}
				});
		}

		if (
			options.collectGradientsData &&
			reGradient.test(decl.value)
		) {
			decl.value
				.match(reGradient)
				.map((gradient) => removeExtraSpaces(gradient))
				.forEach((gradient) => {
					report.gradients.total++;
					countUsage(gradient, report.gradients.usage);
				});
		}

		if (reCubicBezier.test(decl.value)) {
			countCubicBeziers(decl, report, options);
		}
	}
}
