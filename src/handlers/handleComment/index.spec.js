import { parseCss } from '../../common/parseCss';
import { getEmptyReport } from '../../common/getEmptyReport';
import { handleComment } from '.';

describe('Module: handleComment', () => {
	const src = `
		/**
		 * Lorem ipsum dolor sit amet, consectetur adipiscing elit,
		 * sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		 * Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
		 * ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
		 * in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
		 * Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
		 * officia deserunt mollit anim id est laborum.
		 */

		/*
			We few, we happy few, we band of brothers;
			For he to-day that sheds his blood with me
			Shall be my brother; be he ne'er so vile,
			This day shall gentle his condition;
			And gentlemen in England now a-bed
			Shall think themselves accurs'd they were not here,
			And hold their manhoods cheap whiles any speaks
			That fought with us upon Saint Crispin's day.
		*/

		.selector {
			display: inline;
			*zoom: 1; /* IE fix */
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkComments((comment) => {
			handleComment(comment, report);
		});
	});

	afterEach(() => {
		report = null;
	});


	describe('comments.total', () => {
		it('should be counted correctly', () => {
			expect(report.comments.total).toBe(3);
		});
	});

	describe('comments.length.total', () => {
		it('should be counted correctly', () => {
			expect(report.comments.length.total).toBe(879);
		});
	});

	describe('comments.length.longest', () => {
		it('should be counted correctly', () => {
			expect(report.comments.length.longest).toBe(490);
		});
	});

	describe('comments.length.shortest', () => {
		it('should be counted correctly', () => {
			expect(report.comments.length.shortest).toBe(12);
		});
	});

	describe('comments.length.average', () => {
		it('should be counted correctly', () => {
			expect(report.comments.length.average).toBe(0);
		});
	});

	describe('comments.sizeRatio', () => {
		it('should be counted correctly', () => {
			expect(report.comments.sizeRatio).toBe(0);
		});
	});
});
