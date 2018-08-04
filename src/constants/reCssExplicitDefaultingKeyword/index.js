import { cssExplicitDefaultingKeywords } from '../cssExplicitDefaultingKeywords';

export const reCssExplicitDefaultingKeyword = new RegExp('\\b(' + cssExplicitDefaultingKeywords.join('|') + ')\\b', 'g');
