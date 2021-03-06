/**
 * https://drafts.csswg.org/selectors-4/
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-Classes
 * https://github.com/w3c/csswg-drafts/issues/1329
 *
 * `:user-error` was renamed to `:user-invalid`
 */

import { cssMozPseudoClasses } from '../cssMozPseudoClasses';
import { cssWebkitPseudoClasses } from '../cssWebkitPseudoClasses';

export const cssPseudoClasses = [
	...cssMozPseudoClasses,
	...cssWebkitPseudoClasses,
	'active',
	'any-link',
	'blank',
	'checked',
	'contains',
	'current',
	'default',
	'defined',
	'dir',
	'disabled',
	'drop',
	'empty',
	'enabled',
	'first',
	'first-child',
	'first-of-type',
	'fullscreen',
	'future',
	'focus',
	'focus-ring',
	'focus-visible',
	'focus-within',
	'has',
	'host',
	'host-context',
	'hover',
	'indeterminate',
	'in-range',
	'invalid',
	'lang',
	'last-child',
	'last-of-type',
	'left',
	'link',
	'local-link',
	'matches',
	'not',
	'nth-child',
	'nth-col',
	'nth-last-col',
	'nth-last-child',
	'nth-last-of-type',
	'nth-of-type',
	'only-child',
	'only-of-type',
	'optional',
	'out-of-range',
	'past',
	'placeholder-shown',
	'playing',
	'paused',
	'read-only',
	'read-write',
	'required',
	'right',
	'root',
	'scope',
	'something',
	'target',
	'target-within',
	'user-invalid',
	'valid',
	'val',
	'visited',
];
