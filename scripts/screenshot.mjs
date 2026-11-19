// Usage: npm run preview (in another shell) && node scripts/screenshot.mjs
import { chromium } from 'playwright';
const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173/';
const out = new URL('../screenshots/', import.meta.url).pathname;
const browser = await chromium.launch();
try {
	const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	await desktop.goto(base, { waitUntil: 'networkidle' });
	await desktop.screenshot({ path: `${out}home-desktop-top.png` });
	await desktop.screenshot({ path: `${out}home-desktop-full.png`, fullPage: true });
	for (const [name, path] of [['services', 'services'], ['service-detail', 'services/pan-new'], ['pricing', 'pricing'], ['enquiry', 'enquiry']]) {
		await desktop.goto(base + path, { waitUntil: 'networkidle' });
		await desktop.screenshot({ path: `${out}${name}-desktop.png` });
		console.log(name, 'ok');
	}
	const mobile = await browser.newPage({ viewport: { width: 360, height: 800 } });
	await mobile.goto(base, { waitUntil: 'networkidle' });
	await mobile.screenshot({ path: `${out}home-mobile-360-top.png` });
	const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
	console.log('mobile 360 horizontal overflow =', overflow);
} finally { await browser.close(); }
