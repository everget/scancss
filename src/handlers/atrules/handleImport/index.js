import { reCssUrlFunctionWithArg } from '../../../constants/reCssUrlFunctionWithArg';
import { handleMediaQueryParams } from '../handleMediaQueryParams';

const reCssFileString = /['"]?.+\.css['"]?/g;

export function handleImport(atRule, report, options) {
	let cleanedParams = atRule.params;

	if (reCssUrlFunctionWithArg.test(cleanedParams)) {
		cleanedParams = cleanedParams.replace(reCssUrlFunctionWithArg, '');
	}

	if (reCssFileString.test(cleanedParams)) {
		cleanedParams = cleanedParams.replace(reCssFileString, '');
	}

	if (cleanedParams.trim().length !== 0) {
		handleMediaQueryParams(cleanedParams, report, options);
	}
}
