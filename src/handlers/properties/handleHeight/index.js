import { countUsage } from '../../../calculators/countUsage';

export function handleHeight(decl, report) {
	report.heights.total++;
	countUsage(decl.value, report.heights.usage);
}
