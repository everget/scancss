import { reNumberString } from '../reNumberString';

/**
 * https://www.w3.org/TR/css-color-4/#the-hsl-notation
 * https://drafts.csswg.org/css-color/#the-hsl-notation
 */

const reNumberStringSource = reNumberString.source.slice(1, -1);

export const reHslColor = new RegExp(
	'hsl\\(' +
		'\\s*(' + reNumberStringSource + ')(?:deg|grad|rad|turn)?\\s*' +
		'[, ]' +
		'\\s*(' + reNumberStringSource + '%)\\s*' +
		'[, ]' +
		'\\s*(' + reNumberStringSource + '%)\\s*' +
		'([, \\/]' +
			'\\s*(' + reNumberStringSource + ')%?\\s*' +
		')?' +
	'\\)',
	'g'
);
