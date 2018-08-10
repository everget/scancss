import { countUsage } from '../../../calculators/countUsage';

export function handlePosition(decl, report) {
	report.positions.total++;
	countUsage(decl.value, report.positions.usage);
}

