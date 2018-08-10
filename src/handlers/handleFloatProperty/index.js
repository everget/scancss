import { countUsage } from '../../calculators/countUsage';

export function handleFloatProperty(decl, report) {
	report.floats.total++;
	countUsage(decl.value, report.floats.usage);
}

