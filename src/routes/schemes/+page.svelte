<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { finderOccupations, schemes, sectionHindi } from '#lib/site.ts';
	import { matchSchemes } from '#lib/tools.ts';

	let age = $state<number | ''>('');
	let occupation = $state('');
	let income = $state<number | ''>('');
	let searched = $state(false);
	const matched = $derived(searched && age !== '' && occupation ? matchSchemes(schemes, { age: Number(age), occupation, annualIncome: income === '' ? 0 : Number(income) }) : []);
	function find(e: SubmitEvent) { e.preventDefault(); searched = true; }
	const inputCls = 'mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 bg-white';
</script>
<svelte:head><title>Sarkari Yojana — Ayushman, PM-Kisan, e-Shram, Awas, Pension | Apna CSC Gaya</title><meta name="description" content="Ayushman card, PM-Kisan, e-Shram, PM Awas, pension aur KCC — har yojana ka labh, eligibility aur documents ek jagah. Scheme finder se apni patr yojana khojo." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Sarkari Yojana" title="Yojana Ka Labh, Bina Daftar Ke Chakkar" text="Eligibility pehle check, documents poore, phir form. Kis yojana ke patr ho — dukaan par muft me bata denge." />
	<div class="mx-auto max-w-6xl px-4 pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Schemes' }]} /></div>

	<section class="mx-auto max-w-6xl px-4 py-10" aria-labelledby="finder-h">
		<div class="rounded-3xl border-2 border-teal-700 bg-teal-50 p-6 sm:p-8">
			<h2 id="finder-h" class="font-display text-2xl font-black text-slate-900">Scheme Finder — Meri Yojana Kaunsi Hai?</h2>
			<p class="font-semibold text-teal-800">{sectionHindi.finder} · 3 sawal, turant jawab (sirf jaankari ke liye — final patrta vibhag tay karta hai)</p>
			<form onsubmit={find} class="mt-5 grid gap-4 sm:grid-cols-4">
				<div><label for="f-age" class="font-bold text-slate-900">Aapki umr (saal)</label><input id="f-age" type="number" min="1" max="110" required bind:value={age} placeholder="Jaise: 35" class={inputCls} /></div>
				<div><label for="f-occ" class="font-bold text-slate-900">Aap kya karte ho?</label>
					<select id="f-occ" required bind:value={occupation} class={inputCls}>
						<option value="">— Chunein —</option>
						{#each finderOccupations as o (o.value)}<option value={o.value}>{o.label}</option>{/each}
					</select></div>
				<div><label for="f-income" class="font-bold text-slate-900">Parivar ki saalana aay (₹)</label><input id="f-income" type="number" min="0" step="5000" bind:value={income} placeholder="Jaise: 150000" class={inputCls} /></div>
				<div class="flex items-end"><button type="submit" class="min-h-12 w-full rounded-xl bg-teal-800 px-4 py-3 font-bold text-white hover:bg-teal-900">Yojana Khojo</button></div>
			</form>
			{#if searched}
				<div class="mt-5" role="status">
					{#if matched.length}
						<p class="font-bold text-slate-900">{matched.length} yojana aapke liye ho sakti hai:</p>
						<ul class="mt-3 grid gap-3 sm:grid-cols-2">
							{#each matched as sc (sc.slug)}
								<li class="rounded-2xl bg-white p-4 shadow-sm"><strong class="font-display text-slate-900">{sc.name}</strong><span class="mt-1 block text-sm text-slate-700">{sc.benefit}</span><a href="/services/{sc.serviceSlug}" class="mt-2 inline-flex min-h-11 items-center font-bold text-teal-900 underline">Apply / Details →</a></li>
							{/each}
						</ul>
					{:else}
						<p class="rounded-2xl bg-white p-4 font-medium text-slate-800">In jaankariyon par koi yojana match nahi hui. Phir bhi dukaan par aakar ek baar salah le lo — kuch yojanaen rajya sarkar ki bhi hoti hain jo is list me nahi hain.</p>
					{/if}
				</div>
			{/if}
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 pb-10">
		<h2 class="font-display text-2xl font-black text-slate-900">Sab Yojanaen — {sectionHindi.schemes}</h2>
		<div class="mt-6 grid gap-4 md:grid-cols-2">
			{#each schemes as sc (sc.slug)}
				<article class="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<h3 class="font-display text-xl font-bold text-slate-900">{sc.name}</h3>
					<p class="mt-2 flex gap-2 font-semibold text-teal-900"><Icon name="money" class="mt-0.5 h-5 w-5 shrink-0" />{sc.benefit}</p>
					<p class="mt-2 text-sm leading-relaxed text-slate-700"><strong>Patrta:</strong> {sc.eligibility}</p>
					<p class="mt-2 text-sm text-slate-700"><strong>Documents:</strong> {sc.documents.join(' · ')}</p>
					<p class="mt-4 flex flex-wrap gap-3">
						<a href="/services/{sc.serviceSlug}" class="inline-flex min-h-11 items-center rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-900">Apply / Details</a>
						<a href="/enquiry?service={sc.serviceSlug}" class="inline-flex min-h-11 items-center rounded-xl border-2 border-teal-800 px-4 py-2.5 text-sm font-bold text-teal-900 hover:bg-teal-50">Enquiry</a>
					</p>
				</article>
			{/each}
		</div>
		<p class="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-relaxed text-slate-800"><strong>Suchna:</strong> Yojana ke niyam aur labh sarkar samay-samay par badalti hai. Final eligibility aur approval sambandhit vibhag tay karta hai — hum sirf sahi aavedan me madad karte hain.</p>
	</section>
</main>
