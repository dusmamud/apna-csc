// Companion to audit-all.mjs: tap targets / input fonts / headings / images /
// axe / perf — crash-resilient (fresh page per route, incremental merge into
// the main report file). Usage: node scripts/audit-rest.mjs [base] [reportFile]
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4174';
const file = process.argv[3] ?? '.audit/audit-before.json';
const report = JSON.parse(readFileSync(file, 'utf8'));
const save = () => writeFileSync(file, JSON.stringify(report, null, 1));

const sitemap = readFileSync('build/sitemap.xml', 'utf8');
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/');

const browser = await chromium.launch({ args: ['--disable-dev-shm-usage', '--no-sandbox'] });
async function freshPage(ctxOpts) {
	const ctx = await browser.newContext(ctxOpts);
	return { ctx, page: await ctx.newPage() };
}

// scroll-margin (home + tools)
{
	const { ctx, page } = await freshPage({ viewport: { width: 390, height: 844 } });
	for (const route of ['/', '/tools']) {
		try {
			await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
			const res = await page.evaluate(() => {
				const header = document.querySelector('header');
				const hh = header ? Math.round(header.getBoundingClientRect().height) : 0;
				const bad = [];
				for (const el of document.querySelectorAll('[id]')) {
					const smt = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
					if ((el.tagName === 'SECTION' || el.tagName === 'H2') && smt < hh) bad.push({ id: el.id, scrollMarginTop: smt });
				}
				return { headerH: hh, bad: bad.slice(0, 8), badCount: bad.length };
			});
			report.overlap = report.overlap.filter((o) => !(o.kind === 'anchor-scroll-margin' && o.route === route));
			report.overlap.push({ route, kind: 'anchor-scroll-margin', headerH: res.headerH, badCount: res.badCount, sample: res.bad });
		} catch (e) { console.log('scroll-margin', route, String(e).slice(0, 80)); }
	}
	await ctx.close(); save();
	console.log('scroll-margin done');
}

// tap + input fonts at 360, headings + images at 1024 — fresh page per route
for (const route of routes) {
	try {
		const { ctx, page } = await freshPage({ viewport: { width: 360, height: 800 } });
		await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
		await page.waitForTimeout(60);
		const tap = await page.evaluate(() => {
			const small = [];
			for (const el of document.querySelectorAll('a, button, input, select, textarea, [role="button"]')) {
				const r = el.getBoundingClientRect();
				const st = getComputedStyle(el);
				if (r.width === 0 || r.height === 0 || st.visibility === 'hidden' || st.display === 'none') continue;
				if (r.height < 44 || r.width < 44) {
					const inText = !!el.closest('p, li, blockquote, figcaption, td') && el.tagName === 'A';
					small.push({ tag: el.tagName, text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height), inText });
				}
			}
			return small;
		});
		if (tap.length) report.tapTargets[route] = tap; else delete report.tapTargets[route];
		const fonts = await page.evaluate(() => {
			const bad = [];
			for (const el of document.querySelectorAll('input, select, textarea')) {
				const fs = parseFloat(getComputedStyle(el).fontSize);
				if (fs < 16) bad.push({ id: el.id || el.getAttribute('name') || el.tagName, fs });
			}
			return bad;
		});
		if (fonts.length) report.inputFont = [...report.inputFont.filter((x) => x.route !== route), { route, bad: fonts }];
		await ctx.close();
	} catch (e) { console.log('tap', route, String(e).slice(0, 80)); }
	try {
		const { ctx, page } = await freshPage({ viewport: { width: 1024, height: 900 } });
		await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
		const h = await page.evaluate(() => {
			const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((x) => Number(x.tagName[1]));
			const issues = [];
			if (heads.filter((x) => x === 1).length !== 1) issues.push(`h1 count=${heads.filter((x) => x === 1).length}`);
			for (let i = 1; i < heads.length; i++) if (heads[i] > heads[i - 1] + 1) issues.push(`skip h${heads[i - 1]}->h${heads[i]} at idx ${i}`);
			const imgs = [];
			for (const img of document.querySelectorAll('img')) {
				if (!img.getAttribute('alt')) imgs.push({ src: (img.getAttribute('src') || '').slice(-50), issue: 'no alt' });
				if (!img.getAttribute('width') || !img.getAttribute('height')) imgs.push({ src: (img.getAttribute('src') || '').slice(-50), issue: 'no w/h' });
			}
			return { issues, imgs };
		});
		if (h.issues.length) report.headings = [...report.headings.filter((x) => x.route !== route), { route, issues: h.issues }];
		if (h.imgs.length) report.images = [...report.images.filter((x) => x.route !== route), { route, imgs: h.imgs }];
		await ctx.close();
	} catch (e) { console.log('headings', route, String(e).slice(0, 80)); }
	save();
}
console.log('tap/heading phases done');

// axe on distinct templates
const axePaths = [...new Set(['/', '/services', '/services/pan-new', '/online-forms', '/updates', '/updates/ssc-gd-constable-2027', '/pricing', '/schemes', '/banking', '/print-services', '/tickets', '/enquiry', '/about', '/gallery', '/faq', '/contact', '/reviews', '/privacy', '/terms', '/tools', '/track-status', '/downloads', '/blog', '/blog/pan-card-kaise-banaye', ...(routes.filter((r) => !r.startsWith('/services/') && !r.startsWith('/updates/') && !r.startsWith('/blog/')))])];
for (const path of axePaths) {
	try {
		const { ctx, page } = await freshPage({ viewport: { width: 1440, height: 900 } });
		const resp = await page.goto(base + path, { waitUntil: 'load', timeout: 30000 }).catch(() => null);
		if (!resp || resp.status() >= 400) { report.axe[path] = { error: resp ? resp.status() : 'ERR' }; }
		else {
			await page.waitForTimeout(400);
			const axe = await new AxeBuilder({ page }).analyze();
			report.axe[path] = { total: axe.violations.length, serious: axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id} x${v.nodes.length}`), all: axe.violations.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}`) };
		}
		await ctx.close();
	} catch (e) { report.axe[path] = { error: String(e).slice(0, 100) }; console.log('axe', path, String(e).slice(0, 80)); }
	save();
}
console.log('axe done');

// perf home mobile
try {
	const { ctx, page } = await freshPage({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
	await page.addInitScript(() => {
		window.__lcp = 0;
		try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch { /* noop */ }
	});
	await page.goto(base + '/', { waitUntil: 'load', timeout: 40000 }).catch(() => null);
	await page.waitForTimeout(1800);
	report.perf = await page.evaluate(() => {
		const res = performance.getEntriesByType('resource');
		let total = 0;
		for (const r of res) total += r.transferSize || 0;
		const nav = performance.getEntriesByType('navigation')[0];
		const biggest = res.map((r) => ({ name: r.name.split('/').slice(-2).join('/'), kb: Math.round((r.transferSize || 0) / 1024) })).sort((a, b) => b.kb - a.kb).slice(0, 8);
		return { requests: res.length + 1, totalKB: Math.round(total / 1024 + (nav?.transferSize || 0) / 1024), docKB: Math.round((nav?.transferSize || 0) / 1024), lcpMs: Math.round(window.__lcp || 0), biggest };
	});
	await ctx.close();
} catch (e) { console.log('perf', String(e).slice(0, 100)); }
save();
await browser.close();
const tapCount = Object.values(report.tapTargets).reduce((a, b) => a + b.length, 0);
const tapControl = Object.values(report.tapTargets).flat().filter((t) => !t.inText).length;
console.log('\n===== REST SUMMARY =====');
console.log(`tap targets <44: ${tapCount} total (${tapControl} non-inline-text) across ${Object.keys(report.tapTargets).length} pages`);
console.log(`input font <16px pages: ${report.inputFont.length}`);
console.log(`heading issues: ${JSON.stringify(report.headings).slice(0, 400)}`);
console.log(`image issues: ${JSON.stringify(report.images).slice(0, 300)}`);
console.log(`axe: ${JSON.stringify(Object.entries(report.axe).filter(([, v]) => v.serious?.length || v.error))}`);
console.log(`perf: ${JSON.stringify(report.perf)}`);
console.log(`scroll-margin: ${JSON.stringify(report.overlap.filter((o) => o.kind === 'anchor-scroll-margin'))}`);
