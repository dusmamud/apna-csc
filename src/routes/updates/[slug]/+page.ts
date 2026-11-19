import { error } from '@sveltejs/kit';
import { getUpdate, updates } from '#lib/site.ts';
export const prerender = true;
export function entries() { return updates.map((u) => ({ slug: u.slug })); }
export function load({ params }) {
	const update = getUpdate(params.slug);
	if (!update) error(404, 'Update nahi mili');
	return { update };
}
