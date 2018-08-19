import { countUsage } from '../../../calculators/countUsage';

export function handleWidth(decl, report) {
	report.widths.total++;
	countUsage(decl.value, report.widths.usage);
}
