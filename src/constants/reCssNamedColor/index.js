import { cssColorNamesMap } from '../cssColorNamesMap';

export const reCssNamedColor = new RegExp('\\b(' + Object.keys(cssColorNamesMap).join('|') + ')\\b', 'gi');
