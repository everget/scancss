import { reNumberString } from '../reNumberString';

const reNumberStringSource = reNumberString.source.slice(1, -1);

export const rePercentage = new RegExp('^' + reNumberStringSource + '%$');
