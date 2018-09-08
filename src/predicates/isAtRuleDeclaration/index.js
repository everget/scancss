import { cssAtRulesWithoutDeclarations } from '../../constants/cssAtRulesWithoutDeclarations';
import { cssAtRulesDescriptorsMap } from '../../constants/cssAtRulesDescriptorsMap';
import { rePrefixedString } from '../../constants/rePrefixedString';

export function isAtRuleDeclaration(atRuleName, decl) {
	const unprefixedAtRuleName = atRuleName.toLowerCase().replace(rePrefixedString, '');

	if (
		cssAtRulesWithoutDeclarations.includes(unprefixedAtRuleName) ||
		unprefixedAtRuleName === 'page' && cssAtRulesDescriptorsMap.page.includes(decl.prop)
	) {
		return false;
	}

	return true;
}
