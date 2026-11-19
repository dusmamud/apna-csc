// Upgrade screenshots against a running preview on :4174
import { chromium } from 'playwright';
const base = process.env.PREVIEW_URL ?? 'http://localhost:4174';
const out = new URL('../screenshots/', import.meta.url).pathname;
const browser = await chromium.launch();
try {
	const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	await desktop.goto(base + '/', { waitUntil: 'networkidle' });
	await desktop.screenshot({ path: `${out}upgrade-home-desktop-top.png` });
	await desktop.screenshot({ path: `${out}upgrade-home-desktop-full.png`, fullPage: true });
	for (const [name, path] of [['tools', 'tools'], ['track-status', 'track-status'], ['blog-post', 'blog/pan-card-kaise-banaye'], ['schemes-finder', 'schemes'], ['downloads', 'downloads']]) {
		await desktop.goto(`${base}/${path}`, { waitUntil: 'networkidle' });
		await desktop.screenshot({ path: `${out}upgrade-${name}.png` });
		console.log(name, 'ok');
	}
	const mobile = await browser.newPage({ viewport: { width: 360, height: 800 } });
	await mobile.goto(base + '/', { waitUntil: 'networkidle' });
	await mobile.screenshot({ path: `${out}upgrade-home-mobile-360-top.png` });
	for (const path of ['/', '/tools', '/track-status']) {
		await mobile.goto(base + path, { waitUntil: 'networkidle' });
		const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
		console.log(`overflow 360 ${path} =`, overflow);
	}
} finally { await browser.close(); }
