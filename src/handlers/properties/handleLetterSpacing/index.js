import { countUsage } from '../../../calculators/countUsage';

export function handleLetterSpacing(decl, report) {
	report.letterSpacings.total++;
	countUsage(decl.value, report.letterSpacings.usage);
}

