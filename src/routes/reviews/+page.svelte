<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { site, testimonials } from '#lib/site.ts';
</script>
<svelte:head><title>Reviews — 4.8/5 Rating | Apna Digital Seva Kendra Gaya</title><meta name="description" content="412 graahakon ki raाय — PAN, scholarship, Ayushman, form aur print ke kaam par 4.8/5 rating (mock)." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Reviews" title="4.8/5 — Graahakon Ka Bharosa" text="412 Google reviews (mock) ka ausat. Sabse zyada tareef teen baaton ki hoti hai — saaf rate, sahi form, aur shanti se samjhana." />
	<section class="mx-auto max-w-6xl px-4 py-10">
		<p class="flex items-center gap-2 text-lg font-bold text-slate-900"><span class="flex text-amber-500">{#each Array(5) as _, i (i)}<Icon name="star" class="h-6 w-6" />{/each}</span>{site.rating}/5 · {site.reviewCount} reviews</p>
		<div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each testimonials as t (t.author)}
				<figure class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p class="flex gap-0.5 text-amber-500" role="img" aria-label="{t.rating} star rating">{#each Array(t.rating) as _, i (i)}<Icon name="star" class="h-5 w-5" />{/each}</p><blockquote class="mt-3 leading-relaxed text-slate-800">“{t.quote}”</blockquote><figcaption class="mt-4 font-bold text-slate-900">{t.author}<span class="block text-sm font-medium text-slate-600">{t.role}</span></figcaption></figure>
			{/each}
		</div>
		<p class="mt-8 text-sm text-slate-600">Reviews mock hain — asli website par Google reviews se jode jayenge.</p>
	</section>
</main>
