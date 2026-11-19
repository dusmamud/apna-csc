<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { galleryItems } from '#lib/site.ts';
	const cats = ['All', ...new Set(galleryItems.map((g) => g.category))];
	let filter = $state('All');
	const shown = $derived(filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter));
</script>
<svelte:head><title>Gallery — Apna Digital Seva Kendra, Gaya</title><meta name="description" content="Dukaan, seva counter, printing area aur banking counter ki tasveerein." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Gallery" title="Dukaan Ki Jhalak" text="Counter, print area, computer section aur banking desk — jo photo me hai, wahi dukaan par milega." />
	<section class="mx-auto max-w-6xl px-4 py-10">
		<div class="flex flex-wrap gap-2" role="group" aria-label="Gallery filter">
			{#each cats as c (c)}<button type="button" class="min-h-11 rounded-full px-4 py-2 text-sm font-bold {filter === c ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-900'}" onclick={() => (filter = c)}>{c === 'All' ? 'Sab Photos' : c}</button>{/each}
		</div>
		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each shown as g (g.label)}<figure><Picture stem={g.stem} alt={g.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-2xl object-cover" /><figcaption class="mt-2 font-semibold text-slate-800">{g.label}</figcaption></figure>{/each}
		</div>
	</section>
</main>
