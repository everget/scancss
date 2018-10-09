import { cssAtRulesDescriptorsMap } from '../../constants/cssAtRulesDescriptorsMap';
import { isAtRuleDeclaration } from '.';

describe('Module: isAtRuleDeclaration', () => {
	describe('Positives', () => {
		const suites = [
			['document', { prop: 'display' }],
			['keyframes', { prop: 'width' }],
			['page', { prop: 'margin' }],
			['page', { prop: 'widows' }],
		];

		suites.forEach((tuple) => {
			it(`should return 'true' for ${tuple[0]}, ${JSON.stringify(tuple[1])}`, () => {
				expect(isAtRuleDeclaration(tuple[0], tuple[1])).toBe(true);
			});
		});
	});

	describe('Negatives', () => {
		Object
			.keys(cssAtRulesDescriptorsMap)
			.reduce(
				(acc, atRule) => {
					const suites = cssAtRulesDescriptorsMap[atRule].map((descriptor) => [atRule, { prop: descriptor }]);
					acc.push(...suites);
					return acc;
				},
				[]
			)
			.forEach((tuple) => {
				it(`should return 'false' for ${tuple[0]}, ${JSON.stringify(tuple[1])}`, () => {
					expect(isAtRuleDeclaration(tuple[0], tuple[1])).toBe(false);
				});
			});
	});
});
