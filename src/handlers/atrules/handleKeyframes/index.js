import { rePercentage } from '../../../constants/rePercentage';
import { countUsage } from '../../../calculators/countUsage';
import { trimSpacesNearCommas } from '../../../converters/trimSpacesNearCommas';
import { unique } from '../../../converters/unique';

export function handleKeyframes(atRule, report) {
	const steps = [];

	atRule.walkRules((rule) => {
		trimSpacesNearCommas(rule.selector)
			.split(',')
			.map((selector) => selector.trim())
			.forEach((selector) => {
				if (selector === 'from') {
					steps.push(0);
				}

				if (rePercentage.test(selector)) {
					steps.push(Number(selector.slice(0, -1)));
				}

				if (selector === 'to') {
					steps.push(100);
				}
			});

		rule.walkDecls((decl) => {
			if (report.keyframes.animatableProperties.includes(decl.prop) === false) {
				report.keyframes.animatableProperties.push(decl.prop);
			}
		});
	});

	const stepsUnique = unique(steps);

	const stepsChain = stepsUnique
		.sort((a, b) => a - b)
		.map((step) => step + '%')
		.join(' -> ');

	countUsage(stepsChain, report.keyframes.stepsChains);

	if (report.keyframes.longestStepsChainLength < stepsUnique.length) {
		report.keyframes.longestStepsChainLength = stepsUnique.length;
		report.keyframes.longestStepsChain = stepsChain;
		report.keyframes.longestStepsChainAnimation = atRule.params;
	}

	if (report.keyframes.shortestStepsChainLength > stepsUnique.length) {
		report.keyframes.shortestStepsChainLength = stepsUnique.length;
		report.keyframes.shortestStepsChain = stepsChain;
		report.keyframes.shortestStepsChainAnimation = atRule.params;
	}

	if (report.keyframes.definedAnimations.includes(atRule.params) === false) {
		report.keyframes.definedAnimations.push(atRule.params);
	}
}
