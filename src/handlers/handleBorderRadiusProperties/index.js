import { countUsage } from '../../calculators/countUsage';

export function handleBorderRadiusProperties(decl, report) {
	report.borderRadiuses.total++;
	countUsage(decl.value, report.borderRadiuses.usage);
}

