import { unique } from '.';

describe('Module: unique', () => {
	it('should return array with unique primitive values', () => {
		const array = [
			24,
			'Mike',
			10,
			'Matt',
			Infinity,
			'Nancy',
			24,
			'Adam',
			'Jenny',
			10,
			'Nancy',
			'Carl',
			'',
		];

		const uniqueArray = [
			24,
			'Mike',
			10,
			'Matt',
			Infinity,
			'Nancy',
			'Adam',
			'Jenny',
			'Carl',
			'',
		];

		expect(unique(array)).toEqual(uniqueArray);
	});
});
