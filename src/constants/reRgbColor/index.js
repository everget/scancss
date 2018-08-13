import { reNumberString } from '../reNumberString';

/**
 * https://www.w3.org/TR/css-color-4/#rgb-functions
 * https://drafts.csswg.org/css-color/#rgb-functions
 */

const reNumberStringSource = reNumberString.source.slice(1, -1);

export const reRgbColor = new RegExp(
	'rgb\\(' +
		'\\s*(([0-9]{1,3})|(' + reNumberStringSource + ')%?)\\s*' +
		'[, ]' +
		'\\s*(([0-9]{1,3})|(' + reNumberStringSource + ')%?)\\s*' +
		'[, ]' +
		'\\s*(([0-9]{1,3})|(' + reNumberStringSource + ')%?)\\s*' +
		'([, \\/]' +
			'\\s*(' + reNumberStringSource + ')%?\\s*' +
		')?' +
	'\\)',
	'g'
);
