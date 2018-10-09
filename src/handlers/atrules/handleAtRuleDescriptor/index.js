import { countUsage } from '../../../calculators/countUsage';

export function handleAtRuleDescriptor(decl, report) {
	report.atRules.descriptors.total++;
	countUsage(decl.prop.toLowerCase(), report.atRules.descriptors.usage);
}
