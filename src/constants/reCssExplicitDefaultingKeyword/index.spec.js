import { cssExplicitDefaultingKeywords } from '../cssExplicitDefaultingKeywords';
import { reCssExplicitDefaultingKeyword } from '.';

describe('Module: reCssExplicitDefaultingKeyword', () => {
	describe('Positives', () => {
		cssExplicitDefaultingKeywords.forEach((keyword) => {
			it(`should match ${keyword}`, () => {
				expect(keyword.match(reCssExplicitDefaultingKeyword)[0]).toBe(keyword);
			});
		});
	});

	describe('Negatives', () => {
		const notCssExplicitDefaultingKeywords = [
			'123',
			'xxx',
			'default',
			'primal',
			'original',
			'pristine',
		];

		notCssExplicitDefaultingKeywords.forEach((keyword) => {
			it(`should not match non-keyword ${keyword}`, () => {
				expect(keyword.match(reCssExplicitDefaultingKeyword)).toBe(null);
			});
		});
	});
});
