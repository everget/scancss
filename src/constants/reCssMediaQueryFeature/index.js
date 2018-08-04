import { cssMediaQueryFeatures } from '../cssMediaQueryFeatures';

export const reCssMediaQueryFeature = new RegExp('(max-|min-)?(' + cssMediaQueryFeatures.join('|') + ')', 'g');
