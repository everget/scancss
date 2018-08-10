import { countUsage } from '../../../calculators/countUsage';

export function handleDisplay(decl, report) {
	report.displays.total++;
	countUsage(decl.value, report.displays.usage);
}

