import { cssAtRules } from '../../../constants/cssAtRules';
import { rePrefixedString } from '../../../constants/rePrefixedString';
import { countUsage } from '../../../calculators/countUsage';
import { isAtRuleDeclaration } from '../../../predicates/isAtRuleDeclaration';
import { handleVendorPrefix } from '../../handleVendorPrefix';
import { handleImport } from '../handleImport';
import { handleKeyframes } from '../handleKeyframes';
import { handleMediaQueryParams } from '../handleMediaQueryParams';
import { handleSupports } from '../handleSupports';
import { handleAtRuleFunctions } from '../handleAtRuleFunctions';
import { handleAtRuleDescriptor } from '../handleAtRuleDescriptor';

/* eslint-disable-next-line complexity */
export function handleAtRule(atRule, report, options) {
	report.atRules.total++;

	if (Array.isArray(atRule.nodes) && atRule.nodes.length === 0) {
		report.atRules.empty++;
	}

	const atRuleName = atRule.name.toLowerCase();

	countUsage(atRuleName, report.atRules.usage);

	/** Count vendor prefixes in at-rules names */
	if (rePrefixedString.test(atRuleName)) {
		report.atRules.prefixed++;
		handleVendorPrefix(atRuleName, report);
	}

	/** Count unknown at-rules */
	const unprefixedAtRuleName = atRuleName.replace(rePrefixedString, '');
	if (cssAtRules.includes(unprefixedAtRuleName) === false) {
		report.atRules.unknown.total++;
		countUsage(atRuleName, report.atRules.unknown.usage);
	}

	if (atRuleName === 'import') {
		handleImport(atRule, report, options);
	}

	if (atRuleName === 'supports') {
		handleSupports(atRule, report, options);
	}

	if (atRuleName === 'media') {
		handleMediaQueryParams(atRule.params, report, options);
	}

	if (unprefixedAtRuleName === 'keyframes') {
		handleKeyframes(atRule, report);
	}

	if (options.functions) {
		if (
			unprefixedAtRuleName === 'document' ||
			unprefixedAtRuleName === 'import' ||
			unprefixedAtRuleName === 'namespace'
		) {
			handleAtRuleFunctions(atRule.params, report);
		}

		if (unprefixedAtRuleName === 'font-face') {
			atRule.walkDecls((decl) => {
				handleAtRuleFunctions(decl.value, report);
			});
		}
	}

	if (options.declarations) {
		atRule.walkDecls((decl) => {
			if (isAtRuleDeclaration(unprefixedAtRuleName, decl) === false) {
				handleAtRuleDescriptor(decl, report);
				return;
			}

			countUsage(atRuleName, report.declarations.inAtRules);
		});
	}
}
