import { reUrlFunctionWithArg } from '../../../constants/reUrlFunctionWithArg';
import { handleMediaQueryParams } from '../handleMediaQueryParams';

const reCssFileString = /['"]?.+\.css['"]?/g;

export function handleImport(atRule, report, options) {
	let cleanedParams = atRule.params;

	if (reUrlFunctionWithArg.test(cleanedParams)) {
		cleanedParams = cleanedParams.replace(reUrlFunctionWithArg, '');
	}

	if (reCssFileString.test(cleanedParams)) {
		cleanedParams = cleanedParams.replace(reCssFileString, '');
	}

	if (cleanedParams.trim().length !== 0) {
		handleMediaQueryParams(cleanedParams, report, options);
	}
}
