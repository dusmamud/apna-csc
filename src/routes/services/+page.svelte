<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import ServiceCard from '#lib/components/ServiceCard.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { categories, services } from '#lib/site.ts';
	let query = $state('');
	let cat = $state('all');
	$effect(() => { const c = new URLSearchParams(window.location.search).get('cat'); if (c) cat = c; });
	const filtered = $derived(services.filter((s) => (cat === 'all' || s.category === cat) && (!query.trim() || `${s.name} ${s.hindi}`.toLowerCase().includes(query.trim().toLowerCase()))));
</script>
<svelte:head><title>Sab Services — Apna Digital Seva Kendra, Gaya</title><meta name="description" content="Aadhaar, PAN, certificates, online forms, schemes, banking, tickets aur print — 45 services ek hi dukaan par, saaf rate ke saath." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Services" title="Sab Services — Ek Hi Dukaan Par" text="Category chuno ya kaam khojo. Har service par rate, samay aur documents pehle se saaf likhe hain." />
	<section class="mx-auto max-w-6xl px-4 py-10">
		<div class="flex flex-col gap-4 sm:flex-row">
			<label class="relative flex-1"><span class="sr-only">Service khojo</span><Icon name="search" class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" /><input bind:value={query} type="search" placeholder="Service khojo — PAN, Aadhaar, form…" class="min-h-12 w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4" /></label>
			<label class="sm:w-72"><span class="sr-only">Category</span><select bind:value={cat} class="min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3"><option value="all">Sab Category</option>{#each categories as c (c.slug)}<option value={c.slug}>{c.name}</option>{/each}</select></label>
		</div>
		<div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Category filter">
			<button type="button" class="min-h-11 rounded-full px-4 py-2 text-sm font-bold {cat === 'all' ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-900'}" onclick={() => (cat = 'all')}>Sab</button>
			{#each categories as c (c.slug)}<button type="button" class="min-h-11 rounded-full px-4 py-2 text-sm font-bold {cat === c.slug ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-900'}" onclick={() => (cat = c.slug)}>{c.name}</button>{/each}
		</div>
		<p class="mt-6 font-semibold text-slate-700">{filtered.length} services mili</p>
		<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as s (s.slug)}<ServiceCard service={s} />{/each}
		</div>
		{#if !filtered.length}<p class="mt-8 rounded-2xl bg-amber-50 p-6 font-medium text-slate-800">Is naam ki service nahi mili — call karke pooch lo, zyadaatar har online kaam ho jaata hai.</p>{/if}
	</section>
</main>
