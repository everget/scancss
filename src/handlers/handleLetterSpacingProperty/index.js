import { countUsage } from '../../calculators/countUsage';

export function handleLetterSpacingProperty(decl, report) {
	report.letterSpacings.total++;
	countUsage(decl.value, report.letterSpacings.usage);
}

