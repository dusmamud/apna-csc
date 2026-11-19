<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { inr, priceList, site } from '#lib/site.ts';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	const groups = [...new Set(priceList.map((p) => p.category))];
</script>
<svelte:head><title>Rate Chart / Pricing — Apna Digital Seva Kendra Gaya</title><meta name="description" content="Transparent rate chart — print ₹3/page se lekar PAN, certificate, form aur yojana tak sab daam saaf likhe hain. Sarkari fee alag, actual par." /></svelte:head>
<style>
	@media print {
		:global(header), :global(footer), :global(aside), :global(nav), .no-print { display: none !important; }
		:global(main) { padding: 0 !important; }
		table { page-break-inside: auto; }
		tr { page-break-inside: avoid; }
	}
</style>
<main id="main">
	<PageHero eyebrow="Rate Chart" title="Saaf Rate — Pehle Daam, Phir Kaam" text="Ye dukaan ki service fees hain. Sarkari / exam / ticket ki asal fee iske alawa actual par lagti hai — uski receipt alag se milegi." />
	<div class="mx-auto max-w-5xl px-4 pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Pricing / Rate Chart' }]} /></div>
	<section class="mx-auto max-w-5xl px-4 py-10">
		<div class="no-print mb-8 flex flex-wrap items-center gap-3 rounded-2xl bg-teal-50 p-5">
			<p class="flex-1 font-medium text-slate-800"><strong class="text-slate-900">Rate list print karni hai?</strong> Ek click me A4 par saaf chart — dukaan ki deewar ya graahak ko dene ke liye.</p>
			<button type="button" onclick={() => window.print()} class="inline-flex min-h-12 items-center rounded-xl bg-teal-800 px-5 py-3 font-bold text-white hover:bg-teal-900">Download / Print Rate List</button>
		</div>
		<p class="mb-6 hidden print:block text-sm">{site.name} — Rate Chart · {site.contact.address} · {site.contact.phone}</p>
		{#each groups as g (g)}
			<h2 class="mt-8 font-display text-2xl font-black text-slate-900 first:mt-0">{g}</h2>
			<div class="mt-3 overflow-hidden rounded-2xl border border-slate-200">
				<table class="w-full text-left text-sm sm:text-base">
					<thead class="bg-teal-950 text-white"><tr><th class="px-4 py-3 font-bold">Service</th><th class="px-4 py-3 font-bold">Rate</th><th class="hidden px-4 py-3 font-bold sm:table-cell">Note</th></tr></thead>
					<tbody>{#each priceList.filter((p) => p.category === g) as p (p.name)}<tr class="border-t border-slate-200 odd:bg-white even:bg-teal-50/60"><td class="px-4 py-3 font-medium text-slate-900">{p.name}</td><td class="whitespace-nowrap px-4 py-3 font-bold text-slate-900">{inr(p.price)} <span class="text-xs font-semibold text-slate-600">{p.unit}</span></td><td class="hidden px-4 py-3 text-slate-700 sm:table-cell">{p.note ?? '—'}</td></tr>{/each}</tbody>
				</table>
			</div>
		{/each}
		<div class="mt-10 grid gap-4 sm:grid-cols-3">
			<p class="rounded-2xl bg-teal-50 p-5 font-medium text-slate-800"><strong class="block text-slate-900">Pakki Receipt</strong>Har kaam aur har bhugtan ki receipt milti hai.</p>
			<p class="rounded-2xl bg-teal-50 p-5 font-medium text-slate-800"><strong class="block text-slate-900">UPI / Cash Dono</strong>PhonePe, Google Pay, Paytm aur cash — jo suvidha ho.</p>
			<p class="rounded-2xl bg-teal-50 p-5 font-medium text-slate-800"><strong class="block text-slate-900">Bulk Discount</strong>School / coaching ke bulk print aur form par khaas discount — baat karke dekho.</p>
		</div>
		<p class="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-relaxed text-slate-800"><strong>Note:</strong> Daam mock hain aur badal sakte hain. AePS aur money transfer par bank ke niyam lagte hain. Kaam shuru hone se pehle kul kharcha confirm kar diya jaata hai.</p>
	</section>
</main>
