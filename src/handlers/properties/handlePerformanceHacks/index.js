import { reCss3dPerformanceHack } from '../../../constants/reCss3dPerformanceHack';
import { countUsage } from '../../../calculators/countUsage';
import { trimExtraSpaces } from '../../../converters/trimExtraSpaces';

export function handlePerformanceHacks(decl, report) {
	if (
		decl.prop.endsWith('transform') &&
		reCss3dPerformanceHack.test(decl.value)
	) {
		decl.value
			.match(reCss3dPerformanceHack)
			.forEach((hack) => countUsage(trimExtraSpaces(hack), report.properties.performanceHacks));
	} else if (decl.prop === 'will-change') {
		countUsage(decl.prop, report.properties.performanceHacks);
	}
}
