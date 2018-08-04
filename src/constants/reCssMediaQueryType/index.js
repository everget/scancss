import { cssMediaQueryTypes } from '../cssMediaQueryTypes';

export const reCssMediaQueryType = new RegExp('\\b(' + cssMediaQueryTypes.join('|') + ')\\b', 'g');
