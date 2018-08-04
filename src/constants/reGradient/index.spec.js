import { reGradient } from '.';

describe('Module: reGradient', () => {
	describe('Positives', () => {
		const gradientFunctions = [
			'radial-gradient(circle,#fff 100%,#000 0)',
			'linear-gradient(90deg,transparent 0,#7db9e8)',
			'radial-gradient(circle at 4% -18%,#7cd0f2,#3bb3e4 47%,#31a3d1)',
			'linear-gradient(90deg,hsla(0,0%,100%,0) 0,#ffefef)',
			'linear-gradient(90deg,hsla(0,0%,100%,0) 0,#131722)',
			'linear-gradient(270deg,#ffefef 60%,hsla(0,0%,100%,0))',
			'linear-gradient(270deg,#131722 60%,hsla(0,0%,100%,0))',
			'linear-gradient(270deg,#fff 60%,hsla(0,0%,100%,0))',
			'linear-gradient(90deg,#fff,hsla(0,0%,100%,.85),hsla(0,0%,100%,0))',
			'linear-gradient(90deg,#131722,rgba(19,23,34,.85),rgba(19,23,34,0))',
			'linear-gradient(270deg,#fff,hsla(0,0%,100%,.85),hsla(0,0%,100%,0))',
			'linear-gradient(270deg,#131722,rgba(19,23,34,.85),rgba(19,23,34,0))',
			'linear-gradient(90deg,rgba(37,39,51,.99) 0,rgba(37,39,51,.99) 85%,#252733)',
			'linear-gradient(90deg,#252733 0,rgba(37,39,51,.99) 15%,rgba(37,39,51,.99))',
			'linear-gradient(90deg,rgba(30,162,216,.99) 0,rgba(30,162,216,.99) 85%,#1ea2d8)',
			'linear-gradient(90deg,#1ea2d8 0,rgba(30,162,216,.99) 15%,rgba(30,162,216,.99))',
			'linear-gradient(90deg,rgba(59,179,228,.99) 0,rgba(59,179,228,.99) 85%,#3bb3e4)',
			'linear-gradient(90deg,#3bb3e4 0,rgba(59,179,228,.99) 15%,rgba(59,179,228,.99))',
			'linear-gradient(90deg,#34aae0,#47c3e9)',
			'linear-gradient(#758696 30px,#383e4b 0,#383e4b 80px,#758696 0)',
			'linear-gradient(0deg,transparent,#000 30px)',
			'linear-gradient(90deg,#fff 0,#fff)',
			'linear-gradient(90deg,#1c2030 0,#1c2030)',
			'linear-gradient(90deg,#dadde0 0,#dadde0 85%,hsla(0,0%,100%,0))',
			'linear-gradient(270deg,#dadde0 0,#dadde0 85%,hsla(0,0%,100%,0))',
			'radial-gradient(circle,#fff,#000)',
		];

		gradientFunctions
			.reduce((acc, func) => {
				acc.push(func);
				acc.push(func.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				acc.push(func.replace(/,/g, ' , '));
				acc.push(func.replace(/,/g, '  ,  '));
				return acc;
			}, [])
			.forEach((func) => {
				it(`should match ${func}`, () => {
					expect(func.match(reGradient)[0]).toBe(func);
				});
			});
	});
});
