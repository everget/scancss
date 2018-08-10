import { cssBrowserHacks } from '../../../constants/cssBrowserHacks';
import { countUsage } from '../../../calculators/countUsage';

const cssSupportsBrowserHacks = cssBrowserHacks.filter((hack) => hack.type === 'supports');

export function handleSupports(atRule, report, options) {
	if (options.collectBrowserHacksData) {
		cssSupportsBrowserHacks.forEach((hack) => {
			if (hack.regex.test(atRule.params)) {
				atRule.params
					.match(hack.regex)
					.forEach((match) => {
						report.browserHacks.total++;
						countUsage(match, report.browserHacks.usage.supports);
					});
			}
		});
	}
}
