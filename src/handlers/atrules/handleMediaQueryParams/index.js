import postcss from 'postcss';

import { cssBrowserHacks } from '../../../constants/cssBrowserHacks';
import { reCssMediaFeature } from '../../../constants/reCssMediaFeature';
import { reCssMediaType } from '../../../constants/reCssMediaType';
import { rePrefixedString } from '../../../constants/rePrefixedString';
import { countUsage } from '../../../calculators/countUsage';
import { transformString } from '../../../converters/transformString';
import { trimExtraSpaces } from '../../../converters/trimExtraSpaces';
import { trimSpacesNearColon } from '../../../converters/trimSpacesNearColon';
import { trimSpacesNearCommas } from '../../../converters/trimSpacesNearCommas';
import { trimSpacesNearParentheses } from '../../../converters/trimSpacesNearParentheses';
import { trimTrailingZeros } from '../../../converters/trimTrailingZeros';
import { trimLeadingZeros } from '../../../converters/trimLeadingZeros';
import { isDeprecatedMediaFeature } from '../../../predicates/isDeprecatedMediaFeature';
import { handleVendorPrefix } from '../../handleVendorPrefix';

const reOnlyKeyword = /\bonly\b/g;
const cssMediaBrowserHacks = cssBrowserHacks.filter((hack) => hack.type === 'media');

export function handleMediaQueryParams(params, report, options) {
	postcss
		.list
		.comma(params)
		.forEach((mediaQuery) => {
			report.mediaQueries.total++;

			const cleanedMediaQuery = transformString(
				mediaQuery,
				[
					trimExtraSpaces,
					trimSpacesNearCommas,
					trimSpacesNearParentheses,
					trimSpacesNearColon,
					trimTrailingZeros,
					trimLeadingZeros,
				]
			);

			if (reOnlyKeyword.test(cleanedMediaQuery)) {
				report.mediaQueries.onlyKeyword += cleanedMediaQuery.match(reOnlyKeyword).length;
			}

			if (reCssMediaType.test(cleanedMediaQuery)) {
				cleanedMediaQuery
					.match(reCssMediaType)
					.forEach((type) => {
						report.mediaQueries.types.total++;
						countUsage(type, report.mediaQueries.types.usage);
					});
			}

			if (reCssMediaFeature.test(cleanedMediaQuery)) {
				cleanedMediaQuery
					.match(reCssMediaFeature)
					.forEach((feature) => {
						if (/^(min|max)--moz-/.test(feature)) {
							report.mediaQueries.features.prefixed++;
							handleVendorPrefix('-moz-', report);
						} else if (rePrefixedString.test(feature)) {
							report.mediaQueries.features.prefixed++;
							handleVendorPrefix(feature, report);
						}

						if (isDeprecatedMediaFeature(feature)) {
							report.mediaQueries.features.deprecated.total++;
							countUsage(feature, report.mediaQueries.features.deprecated.usage);
						}

						report.mediaQueries.features.total++;
						countUsage(feature, report.mediaQueries.features.usage);
					});
			}

			countUsage(cleanedMediaQuery, report.mediaQueries.usage);

			if (options.browserHacks) {
				cssMediaBrowserHacks.forEach((hack) => {
					if (hack.regex.test(cleanedMediaQuery)) {
						cleanedMediaQuery
							.match(hack.regex)
							.forEach((match) => {
								report.browserHacks.total++;
								countUsage(match, report.browserHacks.usage.media);
							});
					}
				});
			}
		});
}
