/**
 * https://www.w3.org/TR/css3-mediaqueries/#mediafeatures
 * https://drafts.csswg.org/mediaqueries/#mq-features
 * https://drafts.csswg.org/mediaqueries/#mq-ranges
 * https://drafts.csswg.org/mediaqueries/#descdef-media-update
 * https://developer.mozilla.org/ru/docs/Web/CSS/@media#Media_features
 * https://msdn.microsoft.com/en-us/windows/hh772370(v=vs.71)
 * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariCSSRef/Articles/OtherStandardCSS3Features.html#//apple_ref/doc/uid/TP40007601-SW3
 * https://w3c.github.io/manifest/#the-display-mode-media-feature
 */

import { cssMozMediaFeatures } from '../cssMozMediaFeatures';
import { cssMsMediaFeatures } from '../cssMsMediaFeatures';
import { cssWebkitMediaFeatures } from '../cssWebkitMediaFeatures';

export const cssMediaFeatures = [
	...cssMozMediaFeatures,
	...cssMsMediaFeatures,
	...cssWebkitMediaFeatures,
	'any-hover',
	'any-pointer',
	'aspect-ratio',
	'color-gamut',
	'color-index',
	'color',
	'device-aspect-ratio',
	'device-pixel-ratio',
	'device-height',
	'device-width',
	'discrete',
	'display-mode',
	'grid',
	'height',
	'hover',
	'inverted-colors',
	'light-level',
	'monochrome',
	'orientation',
	'overflow-block',
	'overflow-inline',
	'pointer',
	'prefers-reduced-motion',
	'prefers-reduced-transparency',
	'range',
	'resolution',
	'scan',
	'scripting',
	'update',
	'width',
];
