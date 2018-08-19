import { getEmptyReport } from '../../common/getEmptyReport';
import { handleVendorPrefix } from '.';

describe('Module: handleVendorPrefix', () => {
	const prefixedStrings = [
		'-apple-system',
		'-moz-float-edge',
		'-moz-force-broken-image-icon',
		'-moz-image-region',
		'-moz-orient',
		'-moz-osx-font-smoothing',
		'-moz-mac-graphite-theme',
		'-moz-maemo-classic',
		'-moz-device-pixel-ratio',
		'-ms-accelerator',
		'-ms-block-progression',
		'-ms-scroll-snap-x',
		'-ms-scroll-snap-y',
		'-ms-scroll-translation',
		'-ms-text-autospace',
		'-ms-view-state',
		'-webkit-region-fragment',
		'-webkit-text-emphasis',
		'-webkit-text-emphasis-color',
		'-webkit-text-emphasis-position',
		'-webkit-text-emphasis-style',
		'-webkit-device-pixel-ratio',
		'-webkit-min-device-pixel-ratio',
		'-webkit-max-device-pixel-ratio',
		'-epub-text-emphasis-color',
		'-epub-text-emphasis-style',
		'-epub-text-emphasis',

		'-tada-font-smoothing',
		'-foo-grid-columns',
		'-bar-grid-rows',
		'-baz-highlight',
		'-123-animation',
	];

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		prefixedStrings.forEach((str) => {
			handleVendorPrefix(str, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('vendorPrefixes.total', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.total).toBe(32);
		});
	});

	describe('vendorPrefixes.unique', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.unique).toBe(0);
		});
	});

	describe('vendorPrefixes.unknown.total', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.unknown.total).toBe(4);
		});
	});

	describe('vendorPrefixes.unknown.unique', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.unknown.unique).toBe(0);
		});
	});

	describe('vendorPrefixes.unknown.usage', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.unknown.usage).toEqual({
				'-tada-': 1,
				'-foo-': 1,
				'-bar-': 1,
				'-baz-': 1,
			});
		});
	});

	describe('vendorPrefixes.usage', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.usage).toEqual({
				'-apple-': 1,
				'-epub-': 3,
				'-moz-': 8,
				'-ms-': 7,
				'-webkit-': 8,
			});
		});
	});
});
