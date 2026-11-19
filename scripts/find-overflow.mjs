import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 360, height: 800 } });
await p.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle' });
const bad = await p.evaluate(() => {
	const out = [];
	for (const el of document.querySelectorAll('*')) {
		const r = el.getBoundingClientRect();
		if (r.right > document.documentElement.clientWidth + 1) out.push(`${el.tagName}.${el.className.toString().slice(0,80)} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
		if (out.length > 12) break;
	}
	return out;
});
console.log(bad.join('\n'));
await b.close();
