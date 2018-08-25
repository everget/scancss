import { cssAtRules } from '../../../constants/cssAtRules';
import { rePrefixedString } from '../../../constants/rePrefixedString';
import { countUsage } from '../../../calculators/countUsage';
import { handleVendorPrefix } from '../../handleVendorPrefix';
import { handleImport } from '../handleImport';
import { handleKeyframes } from '../handleKeyframes';
import { handleMediaQueryParams } from '../handleMediaQueryParams';
import { handleSupports } from '../handleSupports';

export function handleAtRule(atRule, report, options) {
	report.atRules.total++;

	if (Array.isArray(atRule.nodes) && atRule.nodes.length === 0) {
		report.atRules.empty++;
	}

	const lowerCasedAtRuleName = atRule.name.toLowerCase();

	countUsage(lowerCasedAtRuleName, report.atRules.usage);

	/** Count vendor prefixes in at-rules names */
	if (rePrefixedString.test(lowerCasedAtRuleName)) {
		report.atRules.prefixed++;
		handleVendorPrefix(lowerCasedAtRuleName, report);
	}

	/** Count unknown at-rules */
	const unprefixedAtRuleName = lowerCasedAtRuleName.replace(rePrefixedString, '');
	if (cssAtRules.includes(unprefixedAtRuleName) === false) {
		report.atRules.unknown.total++;
		countUsage(lowerCasedAtRuleName, report.atRules.unknown.usage);
	}

	if (lowerCasedAtRuleName === 'import') {
		handleImport(atRule, report, options);
	}

	if (lowerCasedAtRuleName === 'supports') {
		handleSupports(atRule, report, options);
	}

	if (lowerCasedAtRuleName === 'media') {
		handleMediaQueryParams(atRule.params, report, options);
	}

	if (unprefixedAtRuleName === 'keyframes') {
		handleKeyframes(atRule, report);
	}

	/**
	 * @font-face descriptors are not declarations
	 */
	if (lowerCasedAtRuleName !== 'font-face' && options.declarations) {
		atRule.walkDecls(() => {
			countUsage(lowerCasedAtRuleName, report.declarations.inAtRules);
		});
	}
}
