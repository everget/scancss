import { cssBrowserHacks } from '../../../constants/cssBrowserHacks';
import { rePrefixedString } from '../../../constants/rePrefixedString';
import { countUsage } from '../../../calculators/countUsage';
import { handleVendorPrefix } from '../../handleVendorPrefix';

const cssSupportsBrowserHacks = cssBrowserHacks.filter((hack) => hack.type === 'supports');

const rePropertyValuePair = /\(\s*(([-a-zA-Z]+):\s*(.+?))\s*\)/g;

export function handleSupports(atRule, report, options) {
	if (rePropertyValuePair.test(atRule.params)) {
		atRule
			.params
			.match(rePropertyValuePair)
			.map((pair) => pair.slice(1, -1).trim())
			.forEach((pair) => {
				if (rePrefixedString.test(pair)) {
					handleVendorPrefix(pair, report);
				}
			});
	}

	if (options.browserHacks) {
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
