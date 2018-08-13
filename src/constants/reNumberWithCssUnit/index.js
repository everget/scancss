import { reNumberString } from '../reNumberString';
import { cssUnits } from '../cssUnits';

/**
 * `font-size: +10px;` - is valid declaration
 */

const reNumberStringSource = reNumberString.source.slice(1, -1);

export const reNumberWithCssUnit = new RegExp(reNumberStringSource + '(' + cssUnits.join('|') + ')', 'g');
