// Full-site audit: overflow / overlap / tap targets / input font-size /
// headings / images / dead links / axe / home performance.
// Usage: node scripts/audit-all.mjs [baseUrl] [outFile]
// Needs a running preview: npm run build && npm run preview -- --port 4174
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = process.argv[2] ?? 'http://localhost:4174';
const outFile = process.argv[3] ?? '.audit/audit-last.json';
const WIDTHS = [320, 360, 390, 414, 768, 1024, 1440];

// ---- routes from sitemap ----
const sitemap = readFileSync('build/sitemap.xml', 'utf8');
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
console.log(`Routes from sitemap: ${routes.length}`);

// ---- dead-link crawl from build HTML ----
function* walk(dir) {
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) yield* walk(p);
		else if (e.name.endsWith('.html')) yield p;
	}
}
const buildPaths = new Set();
for (const f of walk('build')) {
	const rel = '/' + f.slice('build/'.length);
	buildPaths.add(rel);
	buildPaths.add(rel.replace(/\.html$/, '').replace(/\/index$/, '') || '/');
}
const deadLinks = [];
const internalHrefs = new Set();
for (const f of walk('build')) {
	const html = readFileSync(f, 'utf8');
	for (const m of html.matchAll(/href="([^"]*)"/g)) {
		const href = m[1];
		if (href === '#' || href === '') deadLinks.push({ from: f, href, kind: 'empty/#' });
		if (href.startsWith('/') && !href.startsWith('//')) {
			const clean = href.split('#')[0].split('?')[0];
			if (!clean) continue;
			internalHrefs.add(clean);
			const ok = buildPaths.has(clean) || existsSync(join('build', clean)) || existsSync(join('build', clean + '.html')) || existsSync(join('build', clean, 'index.html')) || /\.[a-z0-9]+$/i.test(clean);
			if (!ok) deadLinks.push({ from: f, href: clean, kind: 'internal-404' });
		}
	}
}
console.log(`Internal hrefs checked: ${internalHrefs.size}, dead: ${deadLinks.length}`);

const browser = await chromium.launch({ args: ['--disable-dev-shm-usage', '--no-sandbox'] });
const report = { base, widths: WIDTHS, routes: routes.length, deadLinks, overflow: [], overlap: [], tapTargets: {}, inputFont: [], headings: [], images: [], axe: {}, perf: null };
import { mkdirSync } from 'node:fs';
try { mkdirSync(new URL('.', `file://${outFile.startsWith('/') ? '' : process.cwd() + '/'}${outFile}`).pathname, { recursive: true }); } catch { /* exists */ }
const save = () => { try { writeFileSync(outFile, JSON.stringify(report, null, 1)); } catch (e) { console.log('save failed', e.message); } };

// ---------- per-width overflow + overlap ----------
for (const width of WIDTHS) {
	const ctx = await browser.newContext({ viewport: { width, height: 844 } });
	const page = await ctx.newPage();
	for (const route of routes) {
		try {
			await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
			await page.waitForTimeout(120);
			const data = await page.evaluate(() => {
				const cw = document.documentElement.clientWidth;
				const sw = document.documentElement.scrollWidth;
				const offenders = [];
				if (sw > cw + 1) {
					for (const el of document.querySelectorAll('body *')) {
						const r = el.getBoundingClientRect();
						if (r.width > 0 && (r.right > cw + 2 || r.left < -2)) {
							const sel = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '');
							offenders.push({ sel, right: Math.round(r.right), left: Math.round(r.left), w: Math.round(r.width) });
							if (offenders.length >= 6) break;
						}
					}
				}
				return { cw, sw, offenders };
			});
			if (data.sw > data.cw + 1) report.overflow.push({ route, width, sw: data.sw, cw: data.cw, offenders: data.offenders });
			// overlap checks only on mobile widths
			if (width <= 768) {
				const ov = await page.evaluate(() => {
					const out = {};
					const wa = document.querySelector('aside[aria-label="WhatsApp quick contact"] a');
					const bar = document.querySelector('nav[aria-label="Quick contact"]');
					if (wa && bar) {
						const a = wa.getBoundingClientRect(); const b = bar.getBoundingClientRect();
						const inter = !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
						out.whatsappVsBar = { inter, waBottom: Math.round(a.bottom), waTop: Math.round(a.top), barTop: Math.round(b.top), barH: Math.round(b.height) };
					}
					// back-to-top if present
					const btt = document.querySelector('[data-backtotop]');
					if (btt && bar) {
						const a = btt.getBoundingClientRect(); const b = bar.getBoundingClientRect();
						out.backToTopVsBar = { inter: !(a.bottom < b.top || a.top > b.bottom) };
					}
					// footer bottom padding vs fixed bar height
					const footer = document.querySelector('footer');
					if (footer && bar) out.footerPadVsBar = { footerPadBottom: parseFloat(getComputedStyle(footer).paddingBottom), barH: Math.round(bar.getBoundingClientRect().height) };
					return out;
				});
				if (ov.whatsappVsBar?.inter) report.overlap.push({ route, width, kind: 'whatsapp-overlaps-bottom-bar', ...ov.whatsappVsBar });
				if (ov.backToTopVsBar?.inter) report.overlap.push({ route, width, kind: 'backtotop-overlaps-bottom-bar' });
				if (ov.footerPadVsBar && ov.footerPadVsBar.footerPadBottom < ov.footerPadVsBar.barH) report.overlap.push({ route, width, kind: 'footer-covered-by-bar', ...ov.footerPadVsBar });
			}
		} catch (e) {
			report.overflow.push({ route, width, error: String(e).slice(0, 120) });
		}
	}
	await ctx.close();
	save();
	console.log(`width ${width} done — overflow so far: ${report.overflow.length}, overlap: ${report.overlap.length}`);
}

// scroll-margin check (once, home + a page with anchors)
{
	const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
	const page = await ctx.newPage();
	for (const route of ['/', '/tools']) {
		await page.goto(base + route, { waitUntil: 'domcontentloaded' });
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
		report.overlap.push({ route, kind: 'anchor-scroll-margin', headerH: res.headerH, badCount: res.badCount, sample: res.bad });
	}
	await ctx.close();
}

// ---------- per-route checks at 360 (tap targets, inputs) + 1024 (headings, images) ----------
{
	const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
	const page = await ctx.newPage();
	for (const route of routes) {
		await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => null);
		await page.waitForTimeout(80);
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
		if (tap.length) report.tapTargets[route] = tap;
		const fonts = await page.evaluate(() => {
			const bad = [];
			for (const el of document.querySelectorAll('input, select, textarea')) {
				const fs = parseFloat(getComputedStyle(el).fontSize);
				if (fs < 16) bad.push({ id: el.id || el.getAttribute('name') || el.tagName, fs });
			}
			return bad;
		});
		if (fonts.length) report.inputFont.push({ route, bad: fonts });
	}
	await ctx.close();
}
{
	const ctx = await browser.newContext({ viewport: { width: 1024, height: 900 } });
	const page = await ctx.newPage();
	for (const route of routes) {
		await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => null);
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
		if (h.issues.length) report.headings.push({ route, issues: h.issues });
		if (h.imgs.length) report.images.push({ route, imgs: h.imgs });
	}
	await ctx.close();
	save();
	console.log(`tap/input/heading/image checks done`);
}

// ---------- axe on all distinct templates ----------
const axePaths = [...new Set(['/', '/services', '/services/pan-new', '/online-forms', '/updates', '/updates/ssc-gd-constable-2027', '/pricing', '/schemes', '/banking', '/print-services', '/tickets', '/enquiry', '/about', '/gallery', '/faq', '/contact', '/reviews', '/privacy', '/terms', '/tools', '/track-status', '/downloads', '/blog', '/blog/pan-card-kaise-banaye', ...(routes.filter((r) => !r.startsWith('/services/') && !r.startsWith('/updates/') && !r.startsWith('/blog/')))])];
{
	const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	const page = await ctx.newPage();
	for (const path of axePaths) {
		const resp = await page.goto(base + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);
		if (!resp || resp.status() >= 400) { report.axe[path] = { error: resp ? resp.status() : 'ERR' }; continue; }
		const axe = await new AxeBuilder({ page }).analyze();
		report.axe[path] = { total: axe.violations.length, serious: axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id} x${v.nodes.length}`) };
	}
	await ctx.close();
	save();
	console.log('axe done');
}

// ---------- performance: home, mobile 360 ----------
{
	const ctx = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
	const page = await ctx.newPage();
	await page.addInitScript(() => {
		window.__lcp = 0;
		try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch { /* noop */ }
	});
	await page.goto(base + '/', { waitUntil: 'networkidle', timeout: 40000 }).catch(() => null);
	await page.waitForTimeout(1500);
	report.perf = await page.evaluate(() => {
		const res = performance.getEntriesByType('resource');
		let total = 0; const byType = {};
		for (const r of res) { total += r.transferSize || 0; const t = r.initiatorType || 'other'; byType[t] = (byType[t] || 0) + (r.transferSize || 0); }
		const nav = performance.getEntriesByType('navigation')[0];
		const biggest = res.map((r) => ({ name: r.name.split('/').slice(-2).join('/'), kb: Math.round((r.transferSize || 0) / 1024) })).sort((a, b) => b.kb - a.kb).slice(0, 8);
		return { requests: res.length + 1, totalKB: Math.round(total / 1024 + (nav?.transferSize || 0) / 1024), docKB: Math.round((nav?.transferSize || 0) / 1024), lcpMs: Math.round(window.__lcp || 0), biggest };
	});
	await ctx.close();
}

await browser.close();
writeFileSync(outFile, JSON.stringify(report, null, 1));
// summary
const tapCount = Object.values(report.tapTargets).reduce((a, b) => a + b.length, 0);
const tapControl = Object.values(report.tapTargets).flat().filter((t) => !t.inText).length;
const axeSerious = Object.values(report.axe).reduce((a, b) => a + (b.serious?.length || 0), 0);
console.log('\n===== SUMMARY =====');
console.log(`overflow issues: ${report.overflow.length}`);
console.log(`overlap issues: ${JSON.stringify(report.overlap.filter((o) => o.kind !== 'anchor-scroll-margin'))}`);
console.log(`anchor scroll-margin: ${JSON.stringify(report.overlap.filter((o) => o.kind === 'anchor-scroll-margin'))}`);
console.log(`tap targets <44: ${tapCount} total (${tapControl} non-inline-text) across ${Object.keys(report.tapTargets).length} pages`);
console.log(`input font <16px: ${report.inputFont.length} pages`);
console.log(`heading issues: ${report.headings.length} pages — ${JSON.stringify(report.headings).slice(0, 600)}`);
console.log(`image issues: ${report.images.length} pages — ${JSON.stringify(report.images).slice(0, 400)}`);
console.log(`dead links: ${report.deadLinks.length} — ${JSON.stringify(report.deadLinks).slice(0, 400)}`);
console.log(`axe serious/critical rule-hits: ${axeSerious} — ${JSON.stringify(Object.entries(report.axe).filter(([, v]) => v.serious?.length))}`);
console.log(`perf home mobile: ${JSON.stringify(report.perf)}`);
console.log(`report saved: ${outFile}`);
