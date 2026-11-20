<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ShareButtons from '#lib/components/ShareButtons.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { blogPosts, getService, site, whatsappLink } from '#lib/site.ts';
	let { data } = $props();
	const post = $derived(data.post);
	const service = $derived(getService(post.serviceSlug));
	const others = $derived(blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2));
	const articleLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.excerpt,
		datePublished: post.dateISO,
		author: { '@type': 'Organization', name: site.name, url: site.url },
		publisher: { '@type': 'Organization', name: site.name, url: site.url },
		image: `${site.url}${post.image.stem}-1200.jpg`,
		mainEntityOfPage: `${site.url}/blog/${post.slug}`
	});
</script>
<svelte:head>
	<title>{post.title} | Apna CSC Blog</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:image" content="{site.url}{post.image.stem}-1200.jpg" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(articleLd)}</script>`}
</svelte:head>
<main id="main">
	<article>
		<header class="bg-teal-950 text-white">
			<div class="mx-auto max-w-4xl px-4 py-12">
				<Breadcrumbs dark items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.hindi }]} />
				<h1 class="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl">{post.title}</h1>
				<p class="mt-2 font-semibold text-teal-200">{post.hindi} · <time datetime={post.dateISO}>{post.date}</time> · {post.minutes} minute me padho</p>
				<p class="mt-4 max-w-2xl leading-relaxed text-teal-50">{post.excerpt}</p>
			</div>
		</header>
		<div class="mx-auto max-w-4xl px-4 py-8">
			<Picture stem={post.image.stem} alt={post.image.alt} eager width={1600} height={1067} class="aspect-[3/2] w-full rounded-3xl object-cover" />
			{#each post.sections as sec (sec.heading)}
				<h2 class="mt-10 font-display text-2xl font-black text-slate-900">{sec.heading}</h2>
				{#each sec.paras as para (para)}<p class="mt-3 leading-relaxed text-slate-800">{para}</p>{/each}
			{/each}
			<div class="mt-10 border-t border-slate-200 pt-6"><ShareButtons title={post.title} path="/blog/{post.slug}" /></div>
			{#if service}
				<aside class="mt-10 rounded-3xl bg-teal-950 p-6 text-white sm:p-8">
					<p class="font-display text-xl font-black">Ye kaam dukaan par karwana hai?</p>
					<p class="mt-2 text-sm leading-relaxed text-teal-100">{service.name} — documents aur rate service page par saaf likhe hain. Form submit se pehle har detail check karayi jaati hai.</p>
					<p class="mt-5 flex flex-wrap gap-3">
						<a href="/services/{service.slug}" class="inline-flex min-h-12 items-center rounded-xl bg-amber-500 px-5 py-3 font-bold text-slate-950 hover:bg-amber-400">Service Page Dekho</a>
						<a href={whatsappLink(`Namaste! Blog padha — mujhe "${service.name}" karwana hai.`)} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-12 items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"><Icon name="chat" class="h-5 w-5" />WhatsApp Karo</a>
					</p>
				</aside>
			{/if}
			<nav class="mt-12" aria-label="Aur guides">
				<h2 class="font-display text-2xl font-black text-slate-900">Aur Guides Padho</h2>
				<div class="mt-4 grid gap-4 sm:grid-cols-2">
					{#each others as o (o.slug)}
						<a href="/blog/{o.slug}" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-700">
							<p class="text-xs font-bold uppercase tracking-wide text-teal-800">{o.date}</p>
							<p class="mt-1.5 font-display font-bold leading-snug text-slate-900">{o.title}</p>
							<p class="mt-1 text-sm font-semibold text-teal-800">{o.hindi}</p>
						</a>
					{/each}
				</div>
			</nav>
		</div>
	</article>
</main>
