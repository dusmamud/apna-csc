<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import ServiceCard from '#lib/components/ServiceCard.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { images, services } from '#lib/site.ts';
	const list = services.filter((s) => s.category === 'print');
</script>
<svelte:head><title>Print, Xerox, Scan, Photo, PVC Card — Cyber Cafe Gaya | Apna CSC</title><meta name="description" content="B/W print ₹3, colour ₹10, xerox, scan, passport photo, PVC card, lamination, binding, resume aur tez internet — sab turant." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Print & Cyber Cafe" title="Print, Xerox, Photo — Turant, Saaf, Sasta" text="WhatsApp par PDF bhejo, dukaan par aakar le jao. Students ke bulk print par khaas discount." />
	<section class="mx-auto max-w-6xl px-4 py-10">
		<div class="grid gap-4 sm:grid-cols-2">
			<Picture stem={images.printing.stem} alt={images.printing.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-2xl object-cover" />
			<Picture stem={images.passportPhoto.stem} alt={images.passportPhoto.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-2xl object-cover" />
		</div>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{#each list as s (s.slug)}<ServiceCard service={s} />{/each}</div>
	</section>
</main>
