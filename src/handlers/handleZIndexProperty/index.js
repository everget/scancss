import { cssExplicitDefaultingKeywords } from '../../constants/cssExplicitDefaultingKeywords';
import { reCssVariable } from '../../constants/reCssVariable';
import { countUsage } from '../../calculators/countUsage';

const zIndexAllowedKeywords = [
	'auto',
	...cssExplicitDefaultingKeywords,
];

export function handleZIndexProperty(decl, report) {
	const propValue = decl.value;

	report.zIndices.total++;
	countUsage(propValue, report.zIndices.usage);

	/** Count invalid z-indices */
	if (
		Number.isInteger(Number(propValue)) === false &&
		zIndexAllowedKeywords.includes(propValue) === false &&
		propValue.startsWith('calc(') === false &&
		reCssVariable.test(propValue) === false
	) {
		countUsage(propValue, report.zIndices.invalid);
	}
}
