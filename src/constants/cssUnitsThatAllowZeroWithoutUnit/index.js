import { cssUnits } from '../cssUnits';
import { cssDurationUnits } from '../cssDurationUnits';
import { cssFrequencyUnits } from '../cssFrequencyUnits';
import { cssFlexibleLengthUnits } from '../cssFlexibleLengthUnits';
import { cssResolutionUnits } from '../cssResolutionUnits';

/**
 * https://www.w3.org/TR/css-values/#lengths
 * https://stylelint.io/user-guide/rules/length-zero-no-unit/
 * https://www.dunkman.me/blog/2017/css-zero-length-units.html
 *
 * CSS spec requires units to be specified for duration, grid fraction, frequency,
 * and resolution values — even for zero
 */

export const cssUnitsThatAllowZeroWithoutUnit = cssUnits.filter((unit) => [
	...cssDurationUnits,
	...cssFlexibleLengthUnits,
	...cssFrequencyUnits,
	...cssResolutionUnits,
].includes(unit) === false);
