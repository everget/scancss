import { isKeyframeRuleSelector } from '.';

describe('Module: isKeyframeRuleSelector', () => {
	describe('Positives', () => {
		const keyframeRuleSelectors = [
			'from',
			'to',
			'0%',
			'33.3%',
			'100%',
			'from,\nto',
			'from,\nto,\n45%',
		];

		keyframeRuleSelectors.forEach((selector) => {
			it(`should return 'true' for ${selector}`, () => {
				expect(isKeyframeRuleSelector(selector)).toBe(true);
			});
		});
	});

	describe('Negatives', () => {
		const notKeyframeRuleSelectors = [
			'#foo',
			'#from',
			'#to',
			'.bar',
			'.from',
			'.to',
			'[baz]',
			'[from]',
			'[to]',
			'header',
		];

		notKeyframeRuleSelectors.forEach((selector) => {
			it(`should return 'false' for ${selector}`, () => {
				expect(isKeyframeRuleSelector(selector)).toBe(false);
			});
		});
	});
});
