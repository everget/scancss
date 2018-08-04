import { cssPseudoClasses } from '../../constants/cssPseudoClasses';
import { cssPseudoElements } from '../../constants/cssPseudoElements';

/**
 * https://www.w3.org/TR/selectors-3/#specificity
 */
export function calculateSpecificity(selector) {
	if (selector.type === 'id') {
		return [1, 0, 0];
	}

	if (selector.type === 'class' || selector.type === 'attribute') {
		return [0, 1, 0];
	}

	if (selector.type === 'tag') {
		return [0, 0, 1];
	}

	if (selector.type === 'pseudo') {
		const pseudoName = selector.value.split(/::?/)[1];

		if (cssPseudoClasses.includes(pseudoName)) {
			/**
			 * TODO: change calculation of `has`, `matches`, `not`, `nth-child`, `nth-last-child`
			 * according to future spec https://drafts.csswg.org/selectors-4/#specificity-rules
			 */
			if (['something', 'not'].includes(pseudoName)) {
				return [0, 0, 0];
			}

			return [0, 1, 0];
		}

		if (cssPseudoElements.includes(pseudoName)) {
			return [0, 0, 1];
		}
	}

	if (selector.type === 'universal') {
		return [0, 0, 0];
	}

	return [0, 0, 0];
}
