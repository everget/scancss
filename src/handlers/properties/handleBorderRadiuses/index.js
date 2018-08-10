import { countUsage } from '../../../calculators/countUsage';

export function handleBorderRadiuses(decl, report) {
	report.borderRadiuses.total++;
	countUsage(decl.value, report.borderRadiuses.usage);
}

