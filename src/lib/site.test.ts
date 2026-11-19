import { describe, expect, it } from 'vitest';
import { allStatusLinks, blogPosts, categories, downloads, faqs, footer, getBlogPost, getService, getUpdate, inr, nav, partners, popularServices, priceList, schemes, services, site, statusGroups, testimonials, toolsList, trustBadges, updates } from './site.ts';

describe('site — Bihar CSC, en-IN / INR', () => {
	it('is en-IN / INR with mock Gaya Bihar identity', () => {
		expect(site.locale).toBe('en-IN');
		expect(site.currency).toBe('INR');
		expect(site.url).toBe('https://apna-csc.pages.dev');
		expect(site.contact.state).toBe('Bihar');
		expect(site.cscId).toBe('BR1234567890');
		expect(site.contact.phone).toMatch(/^\+91 /);
		expect(site.disclaimer).toContain('NOT a government office');
	});
	it('formats ₹ with en-IN grouping', () => {
		expect(inr(1000)).toBe('₹1,000');
		expect(inr(250)).toBe('₹250');
		expect(inr(500000)).toBe('₹5,00,000');
	});
	it('nav has unique hrefs', () => {
		expect(new Set(nav.map((n) => n.href)).size).toBe(nav.length);
	});
});

describe('services & categories', () => {
	it('has 8 categories and at least 40 services', () => {
		expect(categories).toHaveLength(8);
		expect(services.length).toBeGreaterThanOrEqual(40);
	});
	it('every service is complete and in a valid category', () => {
		const cats = new Set(categories.map((c) => c.slug));
		const slugs = new Set<string>();
		for (const s of services) {
			expect(cats.has(s.category)).toBe(true);
			expect(slugs.has(s.slug)).toBe(false); slugs.add(s.slug);
			expect(s.name.length).toBeGreaterThan(0);
			expect(Number.isInteger(s.price)).toBe(true);
			expect(s.price).toBeGreaterThanOrEqual(0);
			expect(s.documents.length).toBeGreaterThan(0);
			expect(s.description.length).toBeGreaterThan(20);
			expect(getService(s.slug)).toBe(s);
		}
	});
	it('has about 10 popular services', () => {
		expect(popularServices.length).toBeGreaterThanOrEqual(8);
		expect(popularServices.length).toBeLessThanOrEqual(12);
	});
});

describe('pricing, schemes, updates', () => {
	it('rate chart has at least 24 items with positive prices', () => {
		expect(priceList.length).toBeGreaterThanOrEqual(24);
		for (const p of priceList) { expect(p.price).toBeGreaterThan(0); expect(p.name.length).toBeGreaterThan(0); }
	});
	it('has 8 schemes including PM-JAY with ₹5 lakh benefit', () => {
		expect(schemes).toHaveLength(8);
		expect(schemes[0].benefit).toContain('₹5 lakh');
		for (const sc of schemes) expect(getService(sc.serviceSlug)).toBeDefined();
	});
	it('has at least 8 updates dated Dec 2026 – Feb 2027 window', () => {
		expect(updates.length).toBeGreaterThanOrEqual(8);
		const types = new Set(updates.map((u) => u.type));
		expect(types.has('Job')).toBe(true); expect(types.has('Admit Card')).toBe(true); expect(types.has('Result')).toBe(true);
		for (const u of updates) { expect(getUpdate(u.slug)).toBe(u); expect(u.lastDate.length).toBeGreaterThan(0); expect(u.documents.length).toBeGreaterThan(0); }
		expect(updates.map((u) => u.lastDate).join(' ')).toMatch(/Dec 2026|Jan 2027|Feb 2027|Mar 2027/);
	});
});

describe('upgrade additions — tools, track, downloads, blog, trust', () => {
	it('every update has a real official link', () => {
		for (const u of updates) {
			expect(u.officialLink, u.slug).toMatch(/^https:\/\//);
			expect(u.officialLink).toMatch(/gov\.in|nic\.in|uidai|ibps\.in|ctet|biharboardonline|upsc/);
		}
	});
	it('schemes carry finder rules', () => {
		for (const sc of schemes) { expect(sc.finder).toBeDefined(); expect(sc.finder!.occupations.length).toBeGreaterThan(0); }
	});
	it('status directory has official links only, grouped', () => {
		expect(statusGroups.length).toBeGreaterThanOrEqual(3);
		expect(allStatusLinks.length).toBeGreaterThanOrEqual(9);
		for (const l of allStatusLinks) { expect(l.url).toMatch(/^https:\/\//); expect(l.needs.length).toBeGreaterThan(5); }
	});
	it('downloads never use dead links', () => {
		expect(downloads.length).toBeGreaterThanOrEqual(8);
		for (const d of downloads) { expect(d.href).not.toBe('#'); expect(d.href.length).toBeGreaterThan(1); }
	});
	it('has 4 Hinglish blog guides dated Nov 2026 with content', () => {
		expect(blogPosts).toHaveLength(4);
		for (const post of blogPosts) {
			expect(post.dateISO).toMatch(/^2026-11-/);
			expect(post.sections.length).toBeGreaterThanOrEqual(3);
			expect(getBlogPost(post.slug)).toBe(post);
			expect(getService(post.serviceSlug)).toBeDefined();
		}
	});
	it('trust badges, partners and tools list are present', () => {
		expect(trustBadges.length).toBeGreaterThanOrEqual(4);
		expect(partners.length).toBeGreaterThanOrEqual(10);
		expect(toolsList.length).toBeGreaterThanOrEqual(5);
	});
});

describe('testimonials, faqs, footer', () => {
	it('testimonials and faqs are complete', () => {
		expect(testimonials.length).toBeGreaterThanOrEqual(6);
		expect(faqs.length).toBeGreaterThanOrEqual(8);
		expect(faqs[0].a).toContain('independent digital assistance centre');
	});
	it('footer carries copyright', () => { expect(footer.copyright).toContain('© 2026'); });
});
