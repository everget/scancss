import { reRgbColor } from '../reRgbColor';

/**
 * https://www.w3.org/TR/css-color-4/#rgb-functions
 * https://drafts.csswg.org/css-color/#rgb-functions
 *
 * For legacy reasons, an rgba() function also exists, with an identical
 * grammar and behavior to rgb().
 */

export const reRgbaColor = new RegExp(reRgbColor.source.replace(/^(rgb)/, '$1a'), 'g');
