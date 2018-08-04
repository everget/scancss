/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
 */

import { cssMozPseudoElements } from '../cssMozPseudoElements';
import { cssMsPseudoElements } from '../cssMsPseudoElements';
import { cssWebkitPseudoElements } from '../cssWebkitPseudoElements';

export const cssPseudoElements = [
	...cssMozPseudoElements,
	...cssMsPseudoElements,
	...cssWebkitPseudoElements,
	'after',
	'backdrop',
	'before',
	'cue',
	'first-letter',
	'first-line',
	'grammar-error',
	'marker',
	'placeholder',
	'selection',
	'slotted',
	'spelling-error',
];
