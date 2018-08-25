import { reNumberString } from '../reNumberString';

const reNumberStringSource = reNumberString.source.slice(1, -1);

export const reTime = new RegExp('^' + reNumberStringSource + '(ms|s)$');
