import { reExistingVendorPrefix } from '../../constants/reExistingVendorPrefix';
import { rePrefixedString } from '../../constants/rePrefixedString';
import { countUsage } from '../../calculators/countUsage';

export function handleVendorPrefix(str, report) {
	report.vendorPrefixes.total++;

	if (reExistingVendorPrefix.test(str)) {
		const prefix = str.match(reExistingVendorPrefix)[0];
		countUsage(prefix, report.vendorPrefixes.usage);
	} else if (rePrefixedString.test(str)) {
		const prefix = str.match(rePrefixedString)[0];
		countUsage(prefix, report.vendorPrefixes.unknown);
	}
}
