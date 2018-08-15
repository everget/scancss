import { cssSystemColors } from '../cssSystemColors';

export const reCssSystemColor = new RegExp('\\b(' + cssSystemColors.join('|') + ')\\b', 'gi');
