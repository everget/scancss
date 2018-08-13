import { cssMediaFeatures } from '../cssMediaFeatures';

export const reCssMediaFeature = new RegExp('(max-|min-)?(' + cssMediaFeatures.join('|') + ')', 'g');
