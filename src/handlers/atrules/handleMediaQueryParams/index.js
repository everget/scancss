import { cssBrowserHacks } from '../../../constants/cssBrowserHacks';
import { reCssMediaQueryFeature } from '../../../constants/reCssMediaQueryFeature';
import { reCssMediaQueryType } from '../../../constants/reCssMediaQueryType';
import { rePrefixedString } from '../../../constants/rePrefixedString';
import { countUsage } from '../../../calculators/countUsage';
import { removeExtraSpaces } from '../../../converters/removeExtraSpaces';
import { handleVendorPrefix } from '../../handleVendorPrefix';

const reOnlyKeyword = /\bonly\b/g;
const cssMediaBrowserHacks = cssBrowserHacks.filter((hack) => hack.type === 'media');

export function handleMediaQueryParams(params, report, options) {
	report.mediaQueries.total++;

	const cleanedParams = removeExtraSpaces(params);

	if (reOnlyKeyword.test(cleanedParams)) {
		report.mediaQueries.onlyKeyword += cleanedParams.match(reOnlyKeyword).length;
	}

	if (reCssMediaQueryType.test(cleanedParams)) {
		cleanedParams
			.match(reCssMediaQueryType)
			.forEach((type) => {
				report.mediaQueries.types.total++;
				countUsage(type, report.mediaQueries.types.usage);
			});
	}

	if (reCssMediaQueryFeature.test(cleanedParams)) {
		cleanedParams
			.match(reCssMediaQueryFeature)
			.forEach((feature) => {
				if (/^(min|max)--moz-/.test(feature)) {
					report.mediaQueries.features.prefixed++;
					handleVendorPrefix('-moz-', report);
				} else if (rePrefixedString.test(feature)) {
					report.mediaQueries.features.prefixed++;
					handleVendorPrefix(feature, report);
				}

				report.mediaQueries.features.total++;
				countUsage(feature, report.mediaQueries.features.usage);
			});
	}

	countUsage(cleanedParams, report.mediaQueries.usage);

	if (options.browserHacks) {
		cssMediaBrowserHacks.forEach((hack) => {
			if (hack.regex.test(cleanedParams)) {
				cleanedParams
					.match(hack.regex)
					.forEach((match) => {
						report.browserHacks.total++;
						countUsage(match, report.browserHacks.usage.media);
					});
			}
		});
	}
}
