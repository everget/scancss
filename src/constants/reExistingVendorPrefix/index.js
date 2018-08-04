import { cssVendorPrefixes } from '../cssVendorPrefixes';

const prefixesWithLeadingDash = cssVendorPrefixes
	.filter((prefix) => prefix.startsWith('-') === true)
	.map((prefix) => prefix.replace(/-/g, ''))
	.join('|');

const prefixesWithoutLeadingDash = cssVendorPrefixes
	.filter((prefix) => prefix.startsWith('-') === false)
	.map((prefix) => prefix.replace(/-/g, ''))
	.join('|');

export const reExistingVendorPrefix = new RegExp('^(-(' + prefixesWithLeadingDash + ')-|(' + prefixesWithoutLeadingDash + ')-)');
