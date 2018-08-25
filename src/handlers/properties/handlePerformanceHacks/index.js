import { reCss3dPerformanceHack } from '../../../constants/reCss3dPerformanceHack';
import { countUsage } from '../../../calculators/countUsage';
import { transformString } from '../../../converters/transformString';
import { trimExtraSpaces } from '../../../converters/trimExtraSpaces';
import { trimSpacesNearCommas } from '../../../converters/trimSpacesNearCommas';
import { trimSpacesNearParentheses } from '../../../converters/trimSpacesNearParentheses';

export function handlePerformanceHacks(decl, report) {
	if (
		decl.prop.endsWith('transform') &&
		reCss3dPerformanceHack.test(decl.value)
	) {
		decl.value
			.match(reCss3dPerformanceHack)
			.forEach((hack) => {
				const normalizedHack = transformString(
					hack,
					[
						trimExtraSpaces,
						trimSpacesNearCommas,
						trimSpacesNearParentheses,
					]
				);

				countUsage(normalizedHack, report.properties.performanceHacks);
			});
	} else if (decl.prop === 'will-change') {
		countUsage(decl.prop, report.properties.performanceHacks);
	}
}
