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

	countUsage(atRule.name, report.atRules.usage);

	/** Count vendor prefixes in at-rules names */
	if (rePrefixedString.test(atRule.name)) {
		report.atRules.prefixed++;
		handleVendorPrefix(atRule.name, report);
	}

	/** Count unknown at-rules */
	const unprefixedAtRuleName = atRule.name.replace(rePrefixedString, '');
	if (cssAtRules.includes(unprefixedAtRuleName) === false) {
		countUsage(atRule.name, report.atRules.unknown);
	}

	if (atRule.name === 'import') {
		handleImport(atRule, report, options);
	}

	if (atRule.name === 'supports') {
		handleSupports(atRule, report, options);
	}

	if (atRule.name === 'media') {
		handleMediaQueryParams(atRule.params, report, options);
	}

	if (unprefixedAtRuleName === 'keyframes') {
		handleKeyframes(atRule, report);
	}

	/**
	 * @font-face descriptors are not declarations
	 */
	if (atRule.name !== 'font-face') {
		atRule.walkDecls((decl) => {
			countUsage(atRule.name, report.declarations.inAtRules);
		});
	}
}
