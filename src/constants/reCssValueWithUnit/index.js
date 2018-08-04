import { cssUnits } from '../cssUnits';

export const reCssValueWithUnit = new RegExp('-?(\\.?[0-9]+)(\\.[0-9]+)?' + '(' + cssUnits.join('|') + ')', 'g');
