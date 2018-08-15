import { reCssUrlFunctionWithArg } from '../../../constants/reCssUrlFunctionWithArg';
import { reCssFileName } from '../../../constants/reCssFileName';
import { handleMediaQueryParams } from '../handleMediaQueryParams';

export function handleImport(atRule, report, options) {
	let cleanedParams = atRule.params;

	if (reCssUrlFunctionWithArg.test(cleanedParams)) {
		cleanedParams = cleanedParams.replace(reCssUrlFunctionWithArg, '');
	}

	if (reCssFileName.test(cleanedParams)) {
		cleanedParams = cleanedParams.replace(reCssFileName, '');
	}

	if (cleanedParams.trim().length !== 0) {
		handleMediaQueryParams(cleanedParams, report, options);
	}
}
