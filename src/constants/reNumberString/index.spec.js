import { reNumberString } from '.';

describe('Module: reNumberString', () => {
	describe('Positives', () => {
		const numberStrings = [
			'12',
			'300',
			'0.0',
			'+0.0',
			'-0.0',
			'0.2',
			'0.00000000754',
			'4.01',
			'4321.768',
			'.60',
			'6.720000000',
			'-456.8',
			'-1.233456',
			'-53000',
			'10e3',
			'1.1e6',
			'-3.4e-2',
			'1.233456',
			'123345.6e-7',
			'-123345.6e-7',
			'-123345.6e+7',
			'6.022E23',
			'6.022e23',
		];

		numberStrings.forEach((value) => {
			it(`should match ${value}`, () => {
				expect(value.match(reNumberString)[0]).toBe(value);
			});
		});
	});

	describe('Negatives', () => {
		const notNumberStrings = [
			'1.',
			'12.',
			'+-12',
			'+-12.2',
			'+---12',
			'12.1.1',
			'_5',
			'\\35',
			'\\4E94',
			'foo',
			'bar',
			'baz',
		];

		notNumberStrings.forEach((value) => {
			it(`should not match ${value}`, () => {
				expect(value.match(reNumberString)).toBe(null);
			});
		});
	});
});
