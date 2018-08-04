import { countUsage } from '.';

describe('Module: countUsage', () => {
	it('should create key with 0 value in counter object if key doesnt exist', () => {
		const usageCounter = {};

		countUsage('a', usageCounter);
		expect(usageCounter.a).toBe(1);
	});

	it('should increment value of key in counter object', () => {
		const usageCounter = {
			a: 1,
		};

		countUsage('a', usageCounter);
		expect(usageCounter.a).toBe(2);
	});
});
