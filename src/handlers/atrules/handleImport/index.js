import { reCssUrlFunctionWithArg } from '../../../constants/reCssUrlFunctionWithArg';
import { reCssFileName } from '../../../constants/reCssFileName';
import { countUsage } from '../../../calculators/countUsage';
import { trimExtraSpaces } from '../../../converters/trimExtraSpaces';
import { handleMediaQueryParams } from '../handleMediaQueryParams';

export function handleImport(atRule, report, options) {
	report.imports.total++;
	countUsage(atRule.params, report.imports.usage);

	let cleanedParams = atRule.params;

	if (reCssUrlFunctionWithArg.test(cleanedParams)) {
		cleanedParams
			.match(reCssUrlFunctionWithArg)
			.forEach((func) => {
				const url = trimExtraSpaces(func)
					.replace(/^url\(['"]?/g, '')
					.replace(/['"]?\)/g, '');

				countUsage(url, report.imports.urls);
			});

		cleanedParams = cleanedParams.replace(reCssUrlFunctionWithArg, '');
	}

	if (reCssFileName.test(cleanedParams)) {
		cleanedParams
			.match(reCssFileName)
			.forEach((url) => {
				const cleanedUrl = url
					.replace(/['"]/g, '')
					.replace(/['"]/g, '');

				countUsage(cleanedUrl, report.imports.urls);
			});

		cleanedParams = cleanedParams.replace(reCssFileName, '');
	}

	if (cleanedParams.trim().length !== 0) {
		handleMediaQueryParams(cleanedParams, report, options);
	}
}
