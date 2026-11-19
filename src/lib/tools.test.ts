import { describe, expect, it } from 'vitest';
import { calculateAge, calculateEmi, matchSchemes, shopOpenStatus } from './tools.ts';
import { schemes } from './site.ts';

describe('age calculator', () => {
	it('computes exact years/months/days', () => {
		expect(calculateAge('2000-01-15', '2026-11-19')).toEqual({ years: 26, months: 10, days: 4, totalDays: expect.any(Number) });
		expect(calculateAge('2010-06-01', '2026-06-01')?.years).toBe(16);
	});
	it('rejects future / invalid dates', () => {
		expect(calculateAge('2030-01-01', '2026-01-01')).toBeNull();
		expect(calculateAge('not-a-date')).toBeNull();
	});
});

describe('EMI calculator', () => {
	it('computes standard EMI', () => {
		const r = calculateEmi(100000, 12, 12);
		expect(r).not.toBeNull();
		expect(r!.emi).toBe(8885);
		expect(r!.totalInterest).toBe(6619);
	});
	it('handles zero interest and invalid input', () => {
		expect(calculateEmi(12000, 0, 12)?.emi).toBe(1000);
		expect(calculateEmi(0, 10, 12)).toBeNull();
		expect(calculateEmi(1000, 10, 0)).toBeNull();
	});
});

describe('scheme finder', () => {
	it('farmer sees PM-Kisan and KCC, senior does not see APY', () => {
		const farmer = matchSchemes(schemes, { age: 35, occupation: 'farmer', annualIncome: 150000 }).map((s) => s.slug);
		expect(farmer).toContain('pm-kisan');
		expect(farmer).toContain('kcc');
		const senior = matchSchemes(schemes, { age: 65, occupation: 'senior', annualIncome: 100000 }).map((s) => s.slug);
		expect(senior).not.toContain('apy');
		expect(senior).toContain('pmsby');
	});
	it('high income excludes income-capped schemes', () => {
		const rich = matchSchemes(schemes, { age: 30, occupation: 'worker', annualIncome: 900000 }).map((s) => s.slug);
		expect(rich).not.toContain('pm-jay');
		expect(rich).not.toContain('pm-awas');
	});
});

describe('shop open status (IST)', () => {
	it('weekday 10 AM open, 9 PM closed, Sunday noon open', () => {
		expect(shopOpenStatus(1, 600).open).toBe(true);
		expect(shopOpenStatus(1, 1260).open).toBe(false);
		expect(shopOpenStatus(0, 720).open).toBe(true);
		expect(shopOpenStatus(0, 540).open).toBe(false);
	});
});
