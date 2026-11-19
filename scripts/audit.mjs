// Axe a11y audit across key pages. Usage: node scripts/audit.mjs [baseUrl] [paths comma-sep]
// Starts from an already-running preview (npm run build && npm run preview).
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:4173';
const paths = (process.argv[3] ?? '/,/services/pan-new,/pricing,/enquiry,/tools,/schemes,/track-status,/blog,/downloads').split(',');
const browser = await chromium.launch();
let totalSerious = 0;
for (const path of paths) {
	const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	const page = await context.newPage();
	const resp = await page.goto(base + path, { waitUntil: 'networkidle' }).catch(() => null);
	if (!resp || resp.status() >= 400) { console.log(`${path}: HTTP ${resp ? resp.status() : 'ERR'} — skipped`); await context.close(); continue; }
	const axe = await new AxeBuilder({ page }).analyze();
	const serious = axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
	totalSerious += serious.length;
	console.log(`\n${path}: ${axe.violations.length} violations (${serious.length} serious/critical)`);
	for (const v of axe.violations) console.log(` - ${v.id} (${v.impact}) x${v.nodes.length} — ${v.help}`);
	await context.close();
}
console.log(`\nTOTAL serious/critical: ${totalSerious}`);
await browser.close();
