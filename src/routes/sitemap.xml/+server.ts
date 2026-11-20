import { blogPosts, services, site, updates } from '#lib/site.ts';
export const prerender = true;
export function GET() {
	const pages = ['', 'services', 'online-forms', 'updates', 'pricing', 'schemes', 'banking', 'print-services', 'tickets', 'enquiry', 'about', 'gallery', 'faq', 'contact', 'reviews', 'privacy', 'terms', 'tools', 'track-status', 'downloads', 'blog', 'offers', 'student-zone', 'kisan-corner',
		...blogPosts.map((b) => `blog/${b.slug}`),
		...services.map((s) => `services/${s.slug}`), ...updates.map((u) => `updates/${u.slug}`)];
	const urls = pages.map((p) => `  <url><loc>${site.url}/${p}</loc></url>`).join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
