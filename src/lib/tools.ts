// Pure logic for /tools calculators + scheme finder — unit tested in tools.test.ts.
export type AgeResult = { years: number; months: number; days: number; totalDays: number };
export function calculateAge(dobISO: string, todayISO?: string): AgeResult | null {
	const dob = new Date(dobISO + 'T00:00:00');
	const today = todayISO ? new Date(todayISO + 'T00:00:00') : new Date();
	if (Number.isNaN(dob.getTime()) || dob > today) return null;
	let years = today.getFullYear() - dob.getFullYear();
	let months = today.getMonth() - dob.getMonth();
	let days = today.getDate() - dob.getDate();
	if (days < 0) { months -= 1; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
	if (months < 0) { years -= 1; months += 12; }
	const totalDays = Math.floor((today.getTime() - dob.getTime()) / 86_400_000);
	return { years, months, days, totalDays };
}

export type EmiResult = { emi: number; totalPayment: number; totalInterest: number };
export function calculateEmi(principal: number, annualRatePct: number, months: number): EmiResult | null {
	if (!(principal > 0) || !(months > 0) || annualRatePct < 0) return null;
	const r = annualRatePct / 1200;
	const emi = r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
	const totalPayment = emi * months;
	return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalPayment - principal) };
}

export type FinderInput = { age: number; occupation: string; annualIncome: number };
type FinderScheme = { slug: string; finder?: { occupations: string[]; minAge?: number; maxAge?: number; maxIncome?: number } };
export function matchSchemes<T extends FinderScheme>(schemes: T[], input: FinderInput): T[] {
	return schemes.filter((sc) => {
		const f = sc.finder;
		if (!f) return false;
		if (!f.occupations.includes(input.occupation)) return false;
		if (f.minAge !== undefined && input.age < f.minAge) return false;
		if (f.maxAge !== undefined && input.age > f.maxAge) return false;
		if (f.maxIncome !== undefined && input.annualIncome > f.maxIncome) return false;
		return true;
	});
}

export type GstResult = { base: number; gst: number; total: number };
// mode 'add': amount is base price, GST is added on top.
// mode 'included': amount already includes GST, split it out.
export function calculateGst(amount: number, ratePct: number, mode: 'add' | 'included'): GstResult | null {
	if (!(amount > 0) || ratePct < 0 || ratePct > 100) return null;
	const round2 = (n: number) => Math.round(n * 100) / 100;
	if (mode === 'add') {
		const gst = round2((amount * ratePct) / 100);
		return { base: round2(amount), gst, total: round2(amount + gst) };
	}
	const base = round2(amount / (1 + ratePct / 100));
	return { base, gst: round2(amount - base), total: round2(amount) };
}

export function upiLink(upiId: string, payeeName: string, amount?: number, note?: string): string | null {
	const id = upiId.trim();
	if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}/.test(id)) return null;
	const params = new URLSearchParams({ pa: id, pn: payeeName.trim() || 'Apna CSC', cu: 'INR' });
	if (amount && amount > 0) params.set('am', String(amount));
	if (note?.trim()) params.set('tn', note.trim());
	return `upi://pay?${params.toString()}`;
}

// Shop hours (IST): Mon–Sat 09:00–20:00, Sun 10:00–14:00. Returns minutes until
// close when open, or null when closed. Pure — takes an IST Date-like parts.
export function shopOpenStatus(day: number, minutes: number): { open: boolean; label: string } {
	// day: 0=Sun..6=Sat (IST), minutes: minutes since midnight IST
	const range = day === 0 ? [600, 840] : [540, 1200];
	const [open, close] = range;
	if (minutes >= open && minutes < close) {
		const left = close - minutes;
		return { open: true, label: left <= 60 ? `Abhi Khula Hai — ${left} minute me band hoga` : 'Abhi Khula Hai' };
	}
	return { open: false, label: 'Abhi Band Hai' };
}
export function istNowParts(now = new Date()): { day: number; minutes: number } {
	const ist = new Date(now.getTime() + (5.5 * 60 + now.getTimezoneOffset()) * 60000);
	return { day: ist.getDay(), minutes: ist.getHours() * 60 + ist.getMinutes() };
}
