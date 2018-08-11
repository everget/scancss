import postcss from 'postcss';
import {
	expandShorthandProperty,
	isShorthandProperty,
} from 'css-property-parser';

import { cssNamedTimingFunctions } from '../../../constants/cssNamedTimingFunctions';
import { cssExplicitDefaultingKeywords } from '../../../constants/cssExplicitDefaultingKeywords';
import { rePrefixedString } from '../../../constants/rePrefixedString';
import { reCubicBezier } from '../../../constants/reCubicBezier';
import { countUsage } from '../../../calculators/countUsage';
import { isNumber } from '../../../predicates/isNumber';

const reInfiniteKeyword = /\binfinite\b/g;

function countInfiniteAnimations(propValue, report) {
	if (reInfiniteKeyword.test(propValue)) {
		report.animations.infinite += propValue.match(reInfiniteKeyword).length;
	}
}

function countNamedTimingFunctions(decl, report) {
	const reportSection = decl.prop.includes('animation')
		? report.animations
		: report.transitions;

	postcss.list
		.comma(decl.value)
		.forEach((func) => {
			if (reCubicBezier.test(func) === false) {
				if (
					cssNamedTimingFunctions.includes(func) ||
					cssExplicitDefaultingKeywords.includes(func)
				) {
					countUsage(func, reportSection.timingFunctions);
				} else {
					countUsage(func, reportSection.invalidTimingFunctions);
				}
			}
		});
}

const reValueWithDurationUnit = /^-?(\.?[0-9]+)(\.[0-9]+)?(ms|s)$/g;

function countDurations(decl, report) {
	const reportSection = decl.prop.includes('animation')
		? report.animations
		: report.transitions;

	postcss.list
		.comma(decl.value)
		.forEach((duration) => {
			if (duration.match(reValueWithDurationUnit) !== null) {
				const parsedDurationInSeconds = duration.endsWith('ms')
					? parseFloat(duration) / 1000
					: parseFloat(duration);

				if (
					isNumber(parsedDurationInSeconds) &&
					reportSection.longestDuration < parsedDurationInSeconds
				) {
					reportSection.longestDuration = parsedDurationInSeconds;
				}

				if (
					isNumber(parsedDurationInSeconds) &&
					reportSection.shortestDuration > parsedDurationInSeconds
				) {
					reportSection.shortestDuration = parsedDurationInSeconds;
				}
			}
		});
}

function countDelays(decl, report) {
	const reportSection = decl.prop.includes('animation')
		? report.animations
		: report.transitions;

	postcss.list
		.comma(decl.value)
		.forEach((delay) => {
			if (delay.match(reValueWithDurationUnit) !== null) {
				const parsedDelayInSeconds = delay.endsWith('ms')
					? parseFloat(delay) / 1000
					: parseFloat(delay);

				if (
					isNumber(parsedDelayInSeconds) &&
					reportSection.longestDelay < parsedDelayInSeconds
				) {
					reportSection.longestDelay = parsedDelayInSeconds;
				}

				if (
					isNumber(parsedDelayInSeconds) &&
					reportSection.shortestDelay > parsedDelayInSeconds
				) {
					reportSection.shortestDelay = parsedDelayInSeconds;
				}
			}
		});
}

function countTransitionablePropeties(propValue, report) {
	postcss.list
		.comma(propValue)
		.forEach((prop) => countUsage(prop, report.transitions.properties));
}

function countAnimationNames(propValue, report) {
	postcss.list
		.comma(propValue)
		.forEach((name) => {
			report.animations.total++;
			countUsage(name, report.animations.usage);
		});
}

function handleAnimationLonghand(longhand, report) {
	if (typeof longhand['animation-iteration-count'] === 'string') {
		countInfiniteAnimations(longhand['animation-iteration-count'], report);
	}

	if (typeof longhand['animation-name'] === 'string') {
		countAnimationNames(longhand['animation-name'], report);
	}

	if (typeof longhand['animation-timing-function'] === 'string') {
		const decl = {
			prop: 'animation-timing-function',
			value: longhand['animation-timing-function'],
		};

		countNamedTimingFunctions(decl, report);
	}

	if (typeof longhand['animation-duration'] === 'string') {
		const decl = {
			prop: 'animation-duration',
			value: longhand['animation-duration'],
		};

		countDurations(decl, report);
	}

	if (typeof longhand['animation-delay'] === 'string') {
		const decl = {
			prop: 'animation-delay',
			value: longhand['animation-delay'],
		};

		countDelays(decl, report);
	}
}

function handleTransitionLonghand(longhand, report) {
	if (typeof longhand['transition-timing-function'] === 'string') {
		const decl = {
			prop: 'transition-timing-function',
			value: longhand['transition-timing-function'],
		};

		countNamedTimingFunctions(decl, report);
	}

	if (typeof longhand['transition-duration'] === 'string') {
		const decl = {
			prop: 'transition-duration',
			value: longhand['transition-duration'],
		};

		countDurations(decl, report);
	}

	if (typeof longhand['transition-delay'] === 'string') {
		const decl = {
			prop: 'transition-delay',
			value: longhand['transition-delay'],
		};

		countDelays(decl, report);
	}

	if (typeof longhand['transition-property'] === 'string') {
		countTransitionablePropeties(longhand['transition-property'], report);
	}
}

const reCubicBezierInexact = /cubic-bezier\(.+?\)/g;

export function handleTransitionsAndAnimations(decl, report) {
	const prop = decl.prop;
	const propValue = decl.value;

	if (isShorthandProperty(prop)) {
		let safePropValue = propValue;

		// https://github.com/mahirshah/css-property-parser/issues/27
		if (rePrefixedString.test(safePropValue)) {
			safePropValue = safePropValue.replace(rePrefixedString, '');
		}

		// https://github.com/mahirshah/css-property-parser/issues/26
		if (reCubicBezierInexact.test(safePropValue)) {
			safePropValue = safePropValue.replace(reCubicBezierInexact, '');
		}

		try {
			const longhand = expandShorthandProperty(prop, safePropValue);

			if (prop.includes('animation')) {
				handleAnimationLonghand(longhand, report);
			}

			if (prop.includes('transition')) {
				handleTransitionLonghand(longhand, report);
			}
		} catch (err) {
			/* eslint-disable-next-line no-console */
			console.log(`'css-property-parser' module error\n${err}`);
		}
	}

	if (prop === 'animation-iteration-count') {
		countInfiniteAnimations(propValue, report);
	}

	if (prop === 'animation-name') {
		countAnimationNames(propValue, report);
	}

	if (prop === 'animation-timing-function' || prop === 'transition-timing-function') {
		countNamedTimingFunctions(decl, report);
	}

	if (prop === 'animation-duration' || prop === 'transition-duration') {
		countDurations(decl, report);
	}

	if (prop === 'animation-delay' || prop === 'transition-delay') {
		countDelays(decl, report);
	}

	if (prop === 'transition-property') {
		countTransitionablePropeties(propValue, report);
	}
}
