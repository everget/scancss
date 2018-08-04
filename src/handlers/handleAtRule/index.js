import { cssAtRules } from '../../constants/cssAtRules';
import { cssBrowserHacks } from '../../constants/cssBrowserHacks';
import { reCssMediaQueryFeature } from '../../constants/reCssMediaQueryFeature';
import { reCssMediaQueryType } from '../../constants/reCssMediaQueryType';
import { rePrefixedString } from '../../constants/rePrefixedString';
import { reUrlFunctionWithArg } from '../../constants/reUrlFunctionWithArg';
import { countUsage } from '../../calculators/countUsage';
import { removeExtraSpaces } from '../../converters/removeExtraSpaces';
import { unique } from '../../converters/unique';
import { handleVendorPrefix } from '../handleVendorPrefix';

const reOnlyKeyword = /\bonly\b/g;
const cssMediaBrowserHacks = cssBrowserHacks.filter((hack) => hack.type === 'media');

function handleMediaQueryParams(params, report, options) {
	report.mediaQueries.total++;

	const cleanedParams = removeExtraSpaces(params);

	if (reOnlyKeyword.test(cleanedParams)) {
		report.mediaQueries.onlyKeywords += cleanedParams.match(reOnlyKeyword).length;
	}

	if (reCssMediaQueryType.test(cleanedParams)) {
		cleanedParams
			.match(reCssMediaQueryType)
			.forEach((type) => countUsage(type, report.mediaQueries.types));
	}

	if (reCssMediaQueryFeature.test(cleanedParams)) {
		cleanedParams
			.match(reCssMediaQueryFeature)
			.forEach((feature) => {
				if (/^(min|max)--moz-/.test(feature)) {
					report.mediaQueries.vendorPrefixedFeatures++;
					handleVendorPrefix('-moz-', report);
				} else if (rePrefixedString.test(feature)) {
					report.mediaQueries.vendorPrefixedFeatures++;
					handleVendorPrefix(feature, report);
				}

				countUsage(feature, report.mediaQueries.features);
			});
	}

	countUsage(cleanedParams, report.mediaQueries.usage);

	if (options.collectBrowserHacksData) {
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

const reCssFileString = /['"]?.+\.css['"]?/g;

function handleImportAtRule(atRule, report, options) {
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

const cssSupportsBrowserHacks = cssBrowserHacks.filter((hack) => hack.type === 'supports');

function handleSupportsAtRule(atRule, report, options) {
	if (options.collectBrowserHacksData) {
		cssSupportsBrowserHacks.forEach((hack) => {
			if (hack.regex.test(atRule.params)) {
				atRule.params
					.match(hack.regex)
					.forEach((match) => {
						report.browserHacks.total++;
						countUsage(match, report.browserHacks.usage.supports);
					});
			}
		});
	}
}

function handleMediaAtRule(atRule, report, options) {
	handleMediaQueryParams(atRule.params, report, options);
}

const reNumberPercentage = /^(?:[0-9]+\.)?[0-9]+%$/;

function handleKeyframesAtRule(atRule, report, options) {
	const steps = [];

	atRule.walkRules((rule) => {
		rule.selector
			.replace(/,\s+/g, ',')
			.split(',')
			.map((selector) => selector.trim())
			.forEach((part) => {
				if (part === 'from') {
					steps.push(0);
				}

				if (reNumberPercentage.test(part)) {
					steps.push(Number(part.slice(0, -1)));
				}

				if (part === 'to') {
					steps.push(100);
				}
			});

		rule.walkDecls((decl) => {
			if (report.keyframes.animatableProperties.includes(decl.prop) === false) {
				report.keyframes.animatableProperties.push(decl.prop);
			}
		});
	});

	const stepsUnique = unique(steps);

	const stepsChain = stepsUnique
		.sort((a, b) => a - b)
		.map((step) => step + '%')
		.join(' -> ');

	countUsage(stepsChain, report.keyframes.stepsChains);

	if (report.keyframes.longestStepsChainLength < stepsUnique.length) {
		report.keyframes.longestStepsChainLength = stepsUnique.length;
		report.keyframes.longestStepsChain = stepsChain;
	}

	if (report.keyframes.shortestStepsChainLength > stepsUnique.length) {
		report.keyframes.shortestStepsChainLength = stepsUnique.length;
		report.keyframes.shortestStepsChain = stepsChain;
	}
}

export function handleAtRule(atRule, report, options) {
	report.atRules.total++;

	if (Array.isArray(atRule.nodes) && atRule.nodes.length === 0) {
		report.atRules.empty++;
	}

	countUsage(atRule.name, report.atRules.usage);

	/** Count vendor prefixes in at-rules names */
	if (rePrefixedString.test(atRule.name)) {
		report.atRules.vendorPrefixed++;
		handleVendorPrefix(atRule.name, report);
	}

	/** Count unknown at-rules */
	const unprefixedAtRuleName = atRule.name.replace(rePrefixedString, '');
	if (cssAtRules.includes(unprefixedAtRuleName) === false) {
		countUsage(atRule.name, report.atRules.unknown);
	}

	if (atRule.name === 'import') {
		handleImportAtRule(atRule, report, options);
	}

	if (atRule.name === 'supports') {
		handleSupportsAtRule(atRule, report, options);
	}

	if (atRule.name === 'media') {
		handleMediaAtRule(atRule, report, options);
	}

	if (unprefixedAtRuleName === 'keyframes') {
		handleKeyframesAtRule(atRule, report, options);
	}

	atRule.walkDecls((decl) => {
		countUsage(atRule.name, report.declarations.inAtRules);
	});
}
