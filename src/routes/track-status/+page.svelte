<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { site, statusGroups } from '#lib/site.ts';

	type SavedEnquiry = { reference: string; name: string; mobile: string; serviceName: string; date: string };
	let refInput = $state('');
	let mobileInput = $state('');
	let found = $state<SavedEnquiry | null>(null);
	let searched = $state(false);
	function lookup(e: SubmitEvent) {
		e.preventDefault();
		searched = true;
		found = null;
		try {
			const raw = localStorage.getItem('apna-enquiries');
			const list: SavedEnquiry[] = raw ? JSON.parse(raw) : [];
			found = list.find((x) => x.reference.toLowerCase() === refInput.trim().toLowerCase() && x.mobile === mobileInput.trim()) ?? null;
		} catch { found = null; }
	}
</script>
<svelte:head>
	<title>Track Status — PAN, Aadhaar, PM-Kisan, Certificate Status Check | Apna CSC Gaya</title>
	<meta name="description" content="Apni dukaan enquiry ka reference dekho aur PAN, Aadhaar, PM-Kisan, RTPS certificate, PNR ke official status-check link ek jagah pao." />
</svelte:head>
<main id="main">
	<PageHero eyebrow="Track Status" title="Status Check — Sab Official Link Ek Jagah" text="Neeche apni enquiry khojo, ya sarkari kaam ka status seedha official portal par check karo. Hum kisi bhi portal ka password/OTP kabhi nahi maangte." />
	<div class="mx-auto max-w-6xl px-4 pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Track Status' }]} /></div>

	<section class="mx-auto max-w-3xl px-4 py-10" aria-labelledby="local-h">
		<h2 id="local-h" class="font-display text-2xl font-black text-slate-900">Apni Dukaan Enquiry Khojo</h2>
		<p class="mt-2 text-sm leading-relaxed text-slate-700">Enquiry confirm hone par mila <strong>reference number</strong> aur wahi mobile number dalo jo form me diya tha. <strong>Suchna:</strong> ye demo (local) tracking hai — record sirf isi browser me save hota hai; asli sthiti ke liye dukaan par call kar lo: <a class="font-bold text-teal-900 underline" href="tel:{site.contact.phoneHref}">{site.contact.phone}</a></p>
		<form onsubmit={lookup} class="mt-5 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
			<div><label for="ref" class="font-bold text-slate-900">Reference number *</label><input id="ref" bind:value={refInput} required placeholder="Jaise: APNA-XXXXXX" class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" /></div>
			<div><label for="mob" class="font-bold text-slate-900">Mobile number *</label><input id="mob" bind:value={mobileInput} required inputmode="numeric" placeholder="10 anko ka number" class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" /></div>
			<button type="submit" class="min-h-12 rounded-xl bg-teal-800 px-5 py-3 font-bold text-white hover:bg-teal-900 sm:col-span-2">Enquiry Khojo</button>
		</form>
		{#if searched}
			{#if found}
				<div class="mt-5 rounded-3xl border-2 border-teal-700 bg-teal-50 p-6" role="status">
					<p class="flex items-center gap-2 font-display text-xl font-black text-slate-900"><Icon name="check" class="h-6 w-6 text-teal-800" /> Enquiry Mil Gayi</p>
					<dl class="mt-3 grid gap-2 text-slate-800 sm:grid-cols-2">
						<p><strong>Reference:</strong> {found.reference}</p>
						<p><strong>Naam:</strong> {found.name}</p>
						<p><strong>Service:</strong> {found.serviceName}</p>
						<p><strong>Date:</strong> {found.date}</p>
					</dl>
					<p class="mt-3 font-semibold text-teal-900">Status: Prapt ho gayi hai — dukaan se sampark ki pratiksha karein, ya call kar lo.</p>
				</div>
			{:else}
				<p class="mt-5 rounded-2xl bg-amber-50 p-5 font-medium text-slate-800" role="status">Is reference + mobile par koi enquiry is browser me nahi mili. Ho sakta hai enquiry dusre phone/browser se ki gayi ho. Dukaan par call karke reference bata do — hum turant status bata denge.</p>
			{/if}
		{/if}
	</section>

	<section class="mx-auto max-w-6xl px-4 pb-12" aria-labelledby="official-h">
		<h2 id="official-h" class="font-display text-2xl font-black text-slate-900">Sarkari Kaam Ka Status — Official Portals</h2>
		<p class="mt-2 text-slate-700">Ye sab link seedha sarkari website par jaate hain (naye tab me khulenge). Status ke liye kya chahiye, har card par likha hai.</p>
		{#each statusGroups as g (g.category)}
			<h3 class="mt-8 font-display text-xl font-bold text-slate-900">{g.category} <span class="text-base font-semibold text-teal-800">· {g.hindi}</span></h3>
			<div class="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each g.items as item (item.url)}
					<article class="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
						<h4 class="font-display font-bold leading-snug text-slate-900">{item.name}</h4>
						<p class="mt-1 text-sm font-semibold text-teal-800">{item.hindi}</p>
						<p class="mt-2 flex-1 text-sm leading-relaxed text-slate-700"><strong>Chahiye:</strong> {item.needs}</p>
						<a href={item.url} target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-900">Official Website Par Check Karo ↗</a>
					</article>
				{/each}
			</div>
		{/each}
		<p class="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-relaxed text-slate-800"><strong>Suraksha salah:</strong> Status check ke liye kabhi kisi anjaan vyakti ko OTP mat batao. Sarkari portal hamesha .gov.in / .nic.in ya sambandhit official domain par hota hai — upar wale link verified official hain.</p>
	</section>
</main>
