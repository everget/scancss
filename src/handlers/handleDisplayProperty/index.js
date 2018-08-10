import { countUsage } from '../../calculators/countUsage';

export function handleDisplayProperty(decl, report) {
	report.displays.total++;
	countUsage(decl.value, report.displays.usage);
}

