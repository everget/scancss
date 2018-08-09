import { isKeyframeRuleSelector } from '../../predicates/isKeyframeRuleSelector';
import { handleSelector } from '../handleSelector';

export function handleRule(rule, report, options) {
	report.rules.total++;

	if (rule.nodes.length === 0) {
		report.rules.empty++;
	}

	/**
	 * PostCSS `walkRules` goes throw @keyframes and consider
	 * `to`, `from` and percent values as selectors of the rules
	 */
	if (
		options.collectSelectorsData &&
		isKeyframeRuleSelector(rule.selector) === false
	) {
		if (report.selectors.maxPerRule < rule.selectors.length) {
			report.selectors.maxPerRule = rule.selectors.length;
		}

		rule.selectors.forEach((selector) => {
			handleSelector(selector, report, options);
		});
	}
}