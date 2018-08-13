import { reIntegerString } from '.';

describe('Module: reIntegerString', () => {
	describe('Positives', () => {
		const integerStrings = [
			'0',
			'+0',
			'-0',
			'1',
			'+1',
			'-1',
			'12',
			'+12',
			'-12',
			'123',
			'+123',
			'-123',
			'2410',
			'+2410',
			'-2410',
		];

		integerStrings.forEach((value) => {
			it(`should match ${value}`, () => {
				expect(value.match(reIntegerString)[0]).toBe(value);
			});
		});
	});

	describe('Negatives', () => {
		const notIntegerStrings = [
			'.0',
			'0.2',
			'1.',
			'1.2',
			'2.0',
			'10.0',
			'1e3',
			'011',
			'+-12',
			'+---12',
			'_5',
			'\\35',
			'\\4E94',
			'3e4',
			'foo',
			'bar',
			'baz',
		];

		notIntegerStrings.forEach((value) => {
			it(`should not match ${value}`, () => {
				expect(value.match(reIntegerString)).toBe(null);
			});
		});
	});
});
