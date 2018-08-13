import { reNumberString } from '../reNumberString';

/**
 * https://www.w3.org/TR/css-color-4/#the-hwb-notation
 * https://drafts.csswg.org/css-color/#the-hwb-notation
 */

const reNumberStringSource = reNumberString.source.slice(1, -1);

export const reHwbColor = new RegExp(
	'hwb\\(' +
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
