<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import ServiceCard from '#lib/components/ServiceCard.svelte';
	import { categoryName, inr, services, site, whatsappLink } from '#lib/site.ts';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	let { data } = $props();
	const s = $derived(data.service);
	const related = $derived(services.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3));
	const faqLd = $derived({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
		{ '@type': 'Question', name: `${s.name} ka kharcha kitna hai?`, acceptedAnswer: { '@type': 'Answer', text: `Dukaan ki service fees ${s.price > 0 ? inr(s.price) + ' ' + s.priceNote : s.priceNote} hai. Sarkari / exam fee iske alawa actual par lagti hai, receipt ke saath.` } },
		{ '@type': 'Question', name: `${s.name} me kitna samay lagta hai?`, acceptedAnswer: { '@type': 'Answer', text: `Aam taur par: ${s.duration}. Antim samay sarkari vibhag / portal par nirbhar karta hai.` } },
		{ '@type': 'Question', name: `${s.name} ke liye kaun se documents chahiye?`, acceptedAnswer: { '@type': 'Answer', text: s.documents.join(', ') + '.' } }
	] });
</script>
<svelte:head><title>{s.name} — {inr(s.price)} {s.priceNote} | Apna CSC Gaya</title><meta name="description" content={s.description} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`}</svelte:head>
<style>
	@media print {
		:global(body *) { visibility: hidden; }
		:global(.checklist-print), :global(.checklist-print *) { visibility: visible; }
		:global(.checklist-print) { position: absolute; inset: 0; display: block !important; }
	}
</style>
<main id="main">
	<section class="bg-teal-950 text-white"><div class="mx-auto max-w-6xl px-4 py-12">
		<Breadcrumbs dark items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: s.name }]} />
		<h1 class="mt-3 max-w-3xl font-display text-3xl font-black leading-tight sm:text-5xl">{s.name}</h1>
		<p class="mt-2 text-lg font-semibold text-teal-200">{s.hindi}</p>
		<p class="mt-4 max-w-2xl leading-relaxed text-teal-50">{s.description}</p>
		<div class="mt-6 flex flex-wrap gap-3">
			<span class="rounded-xl bg-white px-4 py-3 font-bold text-slate-900">{s.price > 0 ? `${inr(s.price)} ${s.priceNote}` : `Fees: ${s.priceNote}`}</span>
			<span class="inline-flex items-center gap-2 rounded-xl bg-teal-900 px-4 py-3 font-semibold text-teal-50"><Icon name="clock" class="h-5 w-5 text-amber-300" />Samay: {s.duration}</span>
		</div>
	</div></section>
	<section class="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
		<div>
			<div class="flex flex-wrap items-center justify-between gap-3">
				<h2 class="font-display text-2xl font-black text-slate-900">Documents Required — Ye Lekar Aao</h2>
				<button type="button" onclick={() => window.print()} class="press inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-teal-800 px-4 py-2.5 font-bold text-teal-900"><Icon name="printer" class="h-5 w-5" />Checklist Print Karo</button>
			</div>
			<div class="checklist-print" style="display:none">
				<p style="font-family:sans-serif"><strong>{site.name}</strong> — {s.name}<br />Rate: {s.price > 0 ? `${inr(s.price)} ${s.priceNote}` : s.priceNote} · Samay: {s.duration}<br />{site.contact.address} · {site.contact.phone}</p>
				<p style="font-family:sans-serif"><strong>Documents Required:</strong></p>
				<ul style="font-family:sans-serif">{#each s.documents as d (d)}<li>☐ {d}</li>{/each}</ul>
			</div>
			<ul class="mt-4 space-y-2.5">{#each s.documents as d (d)}<li class="flex gap-3 rounded-xl bg-teal-50 px-4 py-3 font-medium text-slate-900"><Icon name="check" class="mt-0.5 h-5 w-5 shrink-0 text-teal-800" />{d}</li>{/each}</ul>
			<h2 class="mt-10 font-display text-2xl font-black text-slate-900">Prakriya — 3 Asaan Step</h2>
			<ol class="mt-4 space-y-3">
				<li class="rounded-xl border border-slate-200 p-4"><strong>1. Dukaan par aao ya WhatsApp karo</strong> — documents ki tasveer bhej kar pehle confirm kar lo.</li>
				<li class="rounded-xl border border-slate-200 p-4"><strong>2. Form / kaam hum karenge</strong> — submit se pehle details aapko dikha kar check karayenge.</li>
				<li class="rounded-xl border border-slate-200 p-4"><strong>3. Receipt lo</strong> — pakki receipt aur status ki jaankari phone par kabhi bhi.</li>
			</ol>
			<p class="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-relaxed text-slate-800"><strong>Note:</strong> {site.disclaimer}</p>
		</div>
		<aside class="h-fit rounded-3xl bg-teal-950 p-6 text-white lg:sticky lg:top-28">
			<p class="font-display text-xl font-black">Ye kaam karwana hai?</p>
			<p class="mt-2 text-sm leading-relaxed text-teal-100">Rate (dukaan ki service fees): <strong class="text-white">{s.price > 0 ? `${inr(s.price)} ${s.priceNote}` : s.priceNote}</strong><br />Samay: {s.duration}<br />Sarkari fee: <strong class="text-white">alag, actual par</strong> — sarkari receipt ke saath. Kul kharcha kaam se pehle confirm hota hai.</p>
			<a href={whatsappLink(`Namaste! Mujhe "${s.name}" karwana hai. Documents aur total kharcha bata dein.`)} target="_blank" rel="noopener noreferrer" class="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-bold text-white hover:bg-green-800"><Icon name="chat" class="h-5 w-5" />WhatsApp par Poochho</a>
			<a href="/enquiry?service={s.slug}" class="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-amber-500 px-4 py-3 font-bold text-slate-950 hover:bg-amber-400">Online Enquiry Karo</a>
			<a href="tel:{site.contact.phoneHref}" class="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-white px-4 py-3 font-bold text-white"><Icon name="phone" class="h-5 w-5" />{site.contact.phone}</a>
		</aside>
	</section>
	{#if related.length}<section class="mx-auto max-w-6xl px-4 pb-12"><h2 class="font-display text-2xl font-black text-slate-900">Isse Jude Aur Kaam</h2><div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{#each related as r (r.slug)}<ServiceCard service={r} />{/each}</div></section>{/if}
</main>
