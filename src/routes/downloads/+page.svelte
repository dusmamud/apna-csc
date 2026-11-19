<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { downloads, popularServices } from '#lib/site.ts';
</script>
<svelte:head>
	<title>Downloads — Blank Forms, Documents Checklists, Printable Rate List | Apna CSC Gaya</title>
	<meta name="description" content="PAN, Aadhaar, RTPS certificate, scholarship aur naukri form ki documents checklist aur dukaan ki printable rate list — ghar se taiyaari karke aao, samay bachega." />
</svelte:head>
<main id="main">
	<PageHero eyebrow="Downloads" title="Forms Aur Checklists — Taiyaari Ghar Se" text="Kaun se documents lane hain, pehle se jaan lo — dukaan par doosra chakkar nahi lagega. Rate list print karke deewar par bhi laga sakte ho." />
	<div class="mx-auto max-w-6xl px-4 pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Downloads' }]} /></div>

	<section class="mx-auto max-w-6xl px-4 py-10" aria-labelledby="dl-h">
		<h2 id="dl-h" class="font-display text-2xl font-black text-slate-900">Download / Print Karne Layak Cheezein</h2>
		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each downloads as d (d.name)}
				<article class="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<p class="inline-flex w-fit rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-900">{d.kind}</p>
					<h3 class="mt-3 font-display text-lg font-bold leading-snug text-slate-900">{d.name}</h3>
					<p class="text-sm font-semibold text-teal-800">{d.hindi}</p>
					<p class="mt-2 flex-1 text-sm leading-relaxed text-slate-700">{d.note}</p>
					<a href={d.href} class="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-teal-900 underline">Khol Kar Dekho <Icon name="arrow" class="h-4 w-4" /></a>
				</article>
			{/each}
		</div>
	</section>

	<section id="checklists" class="mx-auto max-w-6xl scroll-mt-28 px-4 pb-12" aria-labelledby="master-h">
		<h2 id="master-h" class="font-display text-2xl font-black text-slate-900">Documents Master List — Lokpriya Services</h2>
		<p class="mt-2 text-slate-700">Har service ke liye zaroori kagaz ek jagah. Print karna ho to is page ko hi print kar lo (Ctrl+P).</p>
		<div class="mt-6 grid gap-4 md:grid-cols-2">
			{#each popularServices as s (s.slug)}
				<article class="rounded-2xl border border-slate-200 bg-white p-5">
					<h3 class="font-display font-bold text-slate-900"><a class="hover:text-teal-800" href="/services/{s.slug}">{s.name}</a></h3>
					<ul class="mt-2 space-y-1.5 text-sm text-slate-700">
						{#each s.documents as doc (doc)}<li class="flex gap-2"><Icon name="check" class="mt-0.5 h-4 w-4 shrink-0 text-teal-800" />{doc}</li>{/each}
					</ul>
				</article>
			{/each}
		</div>
		<p class="mt-8 rounded-2xl bg-teal-50 p-5 text-sm leading-relaxed text-slate-800"><strong>Tip:</strong> Asli (original) documents scan ke baad turant wapas mil jaate hain. Biometric wale kaam (AePS, Aadhaar e-KYC) ke liye vyakti ko khud aana hota hai — kisi aur ke bharose kagaz mat bhejo.</p>
	</section>
</main>
