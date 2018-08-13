import { cssVendorPrefixes } from '../cssVendorPrefixes';

export const reCssGradient = new RegExp('(' + cssVendorPrefixes.join('|') + ')?((repeating-)?(linear|radial|conic)-gradient)\\(.*\\)', 'g');
