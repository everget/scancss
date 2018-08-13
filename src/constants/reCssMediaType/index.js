import { cssMediaTypes } from '../cssMediaTypes';

export const reCssMediaType = new RegExp('\\b(' + cssMediaTypes.join('|') + ')\\b', 'g');
