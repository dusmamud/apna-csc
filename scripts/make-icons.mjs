// Generate PWA / touch icons from the brand mark (same design as favicon.svg).
// Usage: node scripts/make-icons.mjs  -> static/icons/icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('static/icons', { recursive: true });
const svg = (size, pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${pad ? 0 : 14}" fill="#115e59"/><text x="32" y="43" font-family="Arial, sans-serif" font-size="33" font-weight="900" fill="#fff" text-anchor="middle">A</text><rect x="12" y="49" width="40" height="5" rx="2.5" fill="#f59e0b"/></svg>`;
async function make(name, size, pad = false) {
	await sharp(Buffer.from(svg(size, pad))).resize(size, size).png().toFile(`static/icons/${name}`);
	console.log(name, size);
}
await make('icon-192.png', 192);
await make('icon-512.png', 512);
await make('icon-maskable-512.png', 512, true);
await make('apple-touch-icon.png', 180);
