import { cssVendorPrefixes } from '../cssVendorPrefixes';

export const reCssGradientFunctionName = new RegExp('^(' + cssVendorPrefixes.join('|') + ')?((repeating-)?(linear|radial|conic)-gradient)$', 'g');
