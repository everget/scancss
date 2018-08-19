import { countUsage } from '../../../calculators/countUsage';
import { trimSpacesNearCommas } from '../../../converters/trimSpacesNearCommas';
import { unique } from '../../../converters/unique';

const reNumberPercentage = /^(?:[0-9]+\.)?[0-9]+%$/;

export function handleKeyframes(atRule, report) {
	const steps = [];

	atRule.walkRules((rule) => {
		trimSpacesNearCommas(rule.selector)
			.split(',')
			.map((selector) => selector.trim())
			.forEach((part) => {
				if (part === 'from') {
					steps.push(0);
				}

				if (reNumberPercentage.test(part)) {
					steps.push(Number(part.slice(0, -1)));
				}

				if (part === 'to') {
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
