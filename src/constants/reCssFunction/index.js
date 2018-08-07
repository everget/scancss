import { cssVendorPrefixes } from '../cssVendorPrefixes';
import { cssFunctions } from '../cssFunctions';

export const reCssFunction = new RegExp('(?:' + cssVendorPrefixes.join('|') + ')?(' + cssFunctions.join('|') + ')\\(', 'g');
