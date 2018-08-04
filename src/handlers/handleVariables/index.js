import { reCssVariable } from '../../constants/reCssVariable';
import { countUsage } from '../../calculators/countUsage';

/** Handle case like `tv-transition--fade-in .35s ease forwards` */
const reCssVariableInWord = new RegExp('\\b' + reCssVariable.source, 'g');

export function handleVariables(decl, report) {
	if (
		decl.prop.startsWith('--') &&
		reCssVariable.test(decl.prop)
	) {
		report.variables.valuesMap[decl.prop] = decl.value;
	}

	if (
		reCssVariable.test(decl.value) &&
		decl.value.match(reCssVariableInWord) === null
	) {
		decl.value
			.match(reCssVariable)
			.forEach((variable) => {
				report.variables.total++;
				countUsage(variable, report.variables.usage);
			});
	}
}
