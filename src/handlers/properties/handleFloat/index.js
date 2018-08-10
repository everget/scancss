import { countUsage } from '../../../calculators/countUsage';

export function handleFloat(decl, report) {
	report.floats.total++;
	countUsage(decl.value, report.floats.usage);
}

