import { cssFunctions } from '../cssFunctions';

export const reCssFunction = new RegExp('(' + cssFunctions.join('|') + ')\\(', 'g');
