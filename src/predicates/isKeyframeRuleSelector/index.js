export function isKeyframeRuleSelector(ruleSelector) {
	return ruleSelector
		.replace(/,\s+/g, ',')
		.split(',')
		.map((selector) => selector.trim())
		.some((selector) => /^(from|to|(?:[0-9]+\.)?[0-9]+%)$/.test(selector));
}
