import { reHslColor } from '../reHslColor';

/**
 * https://www.w3.org/TR/css-color-4/#the-hsl-notation
 * https://drafts.csswg.org/css-color/#the-hsl-notation
 *
 * For legacy reasons, an hsla() function also exists, with an identical grammar
 * and behavior to hsl().
 */

export const reHslaColor = new RegExp(reHslColor.source.replace(/^(hsl)/, '$1a'), 'g');
