/**
 * https://www.w3.org/Style/Examples/007/units.ru.html
 */

import { cssAbsoluteLengthUnits } from '../cssAbsoluteLengthUnits';
import { cssAngleUnits } from '../cssAngleUnits';
import { cssDurationUnits } from '../cssDurationUnits';
import { cssFlexibleLengthUnits } from '../cssFlexibleLengthUnits';
import { cssFontRelativeLengthUnits } from '../cssFontRelativeLengthUnits';
import { cssFrequencyUnits } from '../cssFrequencyUnits';
import { cssPercentageUnits } from '../cssPercentageUnits';
import { cssResolutionUnits } from '../cssResolutionUnits';
import { cssViewportPercentageLengthUnits } from '../cssViewportPercentageLengthUnits';

export const cssUnits = [
	...cssAbsoluteLengthUnits,
	...cssAngleUnits,
	...cssDurationUnits,
	...cssFlexibleLengthUnits,
	...cssFontRelativeLengthUnits,
	...cssFrequencyUnits,
	...cssPercentageUnits,
	...cssResolutionUnits,
	...cssViewportPercentageLengthUnits,
];
