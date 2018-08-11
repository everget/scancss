import { calculateSpecificity } from '.';

describe('Module: calculateSpecificity', () => {
	describe('Default', () => {
		const selector = {
			type: '',
			value: '',
		};

		const expectedReturn = [0, 0, 0];
		it(`should return ${expectedReturn} by default`, () => {
			expect(calculateSpecificity(selector)).toEqual(expectedReturn);
		});
	});

	describe('Id selector', () => {
		const selector = {
			type: 'id',
			value: '#id',
		};

		const expectedReturn = [1, 0, 0];
		it(`should return ${expectedReturn}`, () => {
			expect(calculateSpecificity(selector)).toEqual(expectedReturn);
		});
	});

	describe('Class selector', () => {
		const selector = {
			type: 'class',
			value: '.class',
		};

		const expectedReturn = [0, 1, 0];
		it(`should return ${expectedReturn}`, () => {
			expect(calculateSpecificity(selector)).toEqual(expectedReturn);
		});
	});

	describe('Attribute selector', () => {
		const selector = {
			type: 'attribute',
			value: '[type="input"]',
		};

		const expectedReturn = [0, 1, 0];
		it(`should return ${expectedReturn}`, () => {
			expect(calculateSpecificity(selector)).toEqual(expectedReturn);
		});
	});

	describe('PseudoClass selector', () => {
		describe(':hover', () => {
			const selector = {
				type: 'pseudo',
				value: ':hover',
			};

			const expectedReturn = [0, 1, 0];
			it(`should return ${expectedReturn}`, () => {
				expect(calculateSpecificity(selector)).toEqual(expectedReturn);
			});
		});

		describe(':something', () => {
			const selector = {
				type: 'pseudo',
				value: ':something',
			};

			const expectedReturn = [0, 0, 0];
			it(`should return ${expectedReturn}`, () => {
				expect(calculateSpecificity(selector)).toEqual(expectedReturn);
			});
		});

		describe(':not', () => {
			const selector = {
				type: 'pseudo',
				value: ':not',
			};

			const expectedReturn = [0, 0, 0];
			it(`should return ${expectedReturn}`, () => {
				expect(calculateSpecificity(selector)).toEqual(expectedReturn);
			});
		});
	});

	describe('PseudoElement selector', () => {
		describe('::before', () => {
			const selector = {
				type: 'pseudo',
				value: '::before',
			};

			const expectedReturn = [0, 0, 1];
			it(`should return ${expectedReturn}`, () => {
				expect(calculateSpecificity(selector)).toEqual(expectedReturn);
			});
		});

		describe('::-moz-placeholder', () => {
			const selector = {
				type: 'pseudo',
				value: '::-moz-placeholder',
			};

			const expectedReturn = [0, 0, 1];
			it(`should return ${expectedReturn}`, () => {
				expect(calculateSpecificity(selector)).toEqual(expectedReturn);
			});
		});
	});

	describe('Tag selector', () => {
		const selector = {
			type: 'tag',
			value: 'div',
		};

		const expectedReturn = [0, 0, 1];
		it(`should return ${expectedReturn}`, () => {
			expect(calculateSpecificity(selector)).toEqual(expectedReturn);
		});
	});

	describe('Universal selector', () => {
		const selector = {
			type: 'universal',
			value: '*',
		};

		const expectedReturn = [0, 0, 0];
		it(`should return ${expectedReturn}`, () => {
			expect(calculateSpecificity(selector)).toEqual(expectedReturn);
		});
	});
});
