import { error } from '@sveltejs/kit';
import { blogPosts, getBlogPost } from '#lib/site.ts';
export const prerender = true;
export function entries() { return blogPosts.map((p) => ({ slug: p.slug })); }
export function load({ params }: { params: { slug: string } }) {
	const post = getBlogPost(params.slug);
	if (!post) error(404, 'Guide nahi mili');
	return { post };
}
