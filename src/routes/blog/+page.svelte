<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { blogPosts } from '#lib/site.ts';
</script>
<svelte:head>
	<title>Blog — Sarkari Kaam Ki Saral Guides (Hinglish) | Apna CSC Gaya</title>
	<meta name="description" content="PAN card kaise banaye, Aadhaar me mobile update, PM-Kisan e-KYC, Ayushman card — sarkari kaam ki step-by-step saral guides, Hinglish me." />
</svelte:head>
<main id="main">
	<PageHero eyebrow="Blog · गाइड" title="Sarkari Kaam Ki Saral Guides" text="Jo sawal dukaan par roz poochhe jaate hain, unke jawaab yahan likh diye hain — saral Hinglish me, bina ghumaye." />
	<div class="mx-auto max-w-6xl px-4 pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} /></div>
	<section class="mx-auto max-w-6xl px-4 py-10">
		<div class="grid gap-6 sm:grid-cols-2">
			{#each blogPosts as post (post.slug)}
				<article class="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
					<Picture stem={post.image.stem} alt={post.image.alt} width={1200} height={800} class="aspect-[3/2] w-full object-cover" />
					<div class="flex flex-1 flex-col p-6">
						<p class="text-xs font-bold uppercase tracking-wide text-teal-800">{post.date} · {post.minutes} minute me padho</p>
						<h2 class="mt-2 font-display text-xl font-bold leading-snug text-slate-900"><a class="hover:text-teal-800" href="/blog/{post.slug}">{post.title}</a></h2>
						<p class="mt-1 font-semibold text-teal-800">{post.hindi}</p>
						<p class="mt-2 flex-1 text-sm leading-relaxed text-slate-700">{post.excerpt}</p>
						<a href="/blog/{post.slug}" class="mt-4 inline-flex min-h-11 items-center font-bold text-teal-900 underline">Poori Guide Padho →</a>
					</div>
				</article>
			{/each}
		</div>
	</section>
</main>
