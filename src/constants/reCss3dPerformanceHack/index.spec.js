import { addSpacesNearParentheses } from '../../converters/addSpacesNearParentheses';
import { addSpacesNearCommas } from '../../converters/addSpacesNearCommas';
import { reCss3dPerformanceHack } from '.';

describe('Module: reCss3dPerformanceHack', () => {
	describe('Positives', () => {
		const hacks = [
			'translate3d(0,0,0)',
			'rotateZ(360deg)',
			'translateZ(0)',
		];

		hacks
			.reduce((acc, hack) => {
				acc.push(
					hack,
					addSpacesNearParentheses(hack),
					addSpacesNearCommas(hack)
				);

				return acc;
			}, [])
			.forEach((hack) => {
				it(`should match ${hack}`, () => {
					expect(hack.match(reCss3dPerformanceHack)[0]).toBe(hack);
				});
			});
	});
});
