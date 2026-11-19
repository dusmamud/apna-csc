import { error } from '@sveltejs/kit';
import { getService, services } from '#lib/site.ts';
export const prerender = true;
export function entries() { return services.map((s) => ({ slug: s.slug })); }
export function load({ params }) {
	const service = getService(params.slug);
	if (!service) error(404, 'Service nahi mili');
	return { service };
}
