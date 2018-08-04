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
				acc.push(hack);
				acc.push(hack.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				acc.push(hack.replace(/,/g, ' , '));
				acc.push(hack.replace(/,/g, '  ,  '));
				return acc;
			}, [])
			.forEach((hack) => {
				it(`should match ${hack}`, () => {
					expect(hack.match(reCss3dPerformanceHack)[0]).toBe(hack);
				});
			});
	});
});
