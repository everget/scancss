import { cssVendorPrefixes } from '../cssVendorPrefixes';

export const reGradient = new RegExp('(' + cssVendorPrefixes.join('|') + ')?((repeating-)?(linear|radial|conic)-gradient)\\(.*\\)', 'g');
