import { countUsage } from '../../calculators/countUsage';

export function handlePositionProperty(decl, report) {
	report.positions.total++;
	countUsage(decl.value, report.positions.usage);
}

