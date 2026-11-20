<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ServiceCard from '#lib/components/ServiceCard.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { blogPosts, getService, schemes, statusGroups, whatsappLink } from '#lib/site.ts';
	const kisanSlugs = ['pm-kisan', 'kisan-credit-card', 'pm-fasal-bima', 'bhulekh-land-records', 'e-shram', 'pm-awas'];
	const kisanServices = kisanSlugs.map((s) => getService(s)).filter(Boolean);
	const kisanSchemes = schemes.filter((sc) => ['pm-kisan', 'kcc', 'pmfby', 'pm-awas'].includes(sc.slug));
	const kisanStatus = statusGroups.flatMap((g) => g.items).filter((i) => /PM-Kisan|Ration/i.test(i.name));
	const guide = blogPosts.find((p) => p.slug === 'pm-kisan-ekyc-kaise-kare');
</script>
<svelte:head>
	<title>Kisan Corner — PM-Kisan, KCC, Fasal Bima Aur Bhulekh | Apna CSC Gaya</title>
	<meta name="description" content="Kisanon ke saare kaam ek jagah: PM-Kisan e-KYC aur status, Kisan Credit Card, PM Fasal Bima, Bhulekh zameen ke kagaz — kist rukne se pehle sab check yahin." />
</svelte:head>
<main id="main">
	<PageHero eyebrow="Kisan Corner · किसान कॉर्नर" title="Kisan Corner — Kheti Ke Saare Kaam Ek Jagah" text="PM-Kisan ki kist, KCC loan, fasal bima aur zameen ke kagaz — bank aur daftar ke chakkar bina, sahi jaankari ke saath yahin ho jayega." />
	<div class="mx-auto max-w-6xl px-4 pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Kisan Corner' }]} /></div>

	<section class="mx-auto max-w-6xl px-4 py-10" aria-labelledby="kisan-services">
		<h2 id="kisan-services" class="font-display text-2xl font-black text-slate-900">Kisanon Ki Services</h2>
		<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each kisanServices as s (s?.slug)}{#if s}<ServiceCard service={s} />{/if}{/each}
		</div>
	</section>

	<section class="bg-teal-950 py-10 text-white" aria-labelledby="kisan-schemes">
		<div class="mx-auto max-w-6xl px-4">
			<h2 id="kisan-schemes" class="font-display text-2xl font-black">Kisan Yojanaen — Labh Aur Patrta</h2>
			<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each kisanSchemes as sc (sc.slug)}
					<a href="/schemes" class="press block rounded-2xl bg-teal-900 p-5 transition hover:bg-teal-800">
						<p class="font-display font-bold leading-snug">{sc.name}</p>
						<p class="mt-2 text-sm leading-relaxed text-teal-100">{sc.benefit}</p>
						<p class="mt-2 text-sm text-teal-200"><strong class="text-white">Patr:</strong> {sc.eligibility}</p>
						<p class="mt-3 text-sm font-bold text-amber-300">Poori jaankari →</p>
					</a>
				{/each}
			</div>
			<p class="mt-5 text-sm text-teal-100">Apni patrta khud check karni hai? <a href="/schemes" class="font-bold text-amber-300 underline">Scheme Finder chalao →</a></p>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-10" aria-labelledby="kisan-status">
		<h2 id="kisan-status" class="font-display text-2xl font-black text-slate-900">Kist Aur Status — Official Link</h2>
		<div class="mt-5 grid gap-4 sm:grid-cols-2">
			{#each kisanStatus as link (link.url)}
				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<h3 class="font-display font-bold text-slate-900">{link.name}</h3>
					<p class="mt-1 text-sm font-semibold text-teal-800">{link.hindi}</p>
					<p class="mt-1 text-sm text-slate-700">Chahiye: {link.needs}</p>
					<a href={link.url} target="_blank" rel="noopener noreferrer" class="press mt-3 inline-flex min-h-11 items-center rounded-xl bg-teal-800 px-4 py-2.5 font-bold text-white hover:bg-teal-900">Official Website Par Check Karo ↗</a>
				</div>
			{/each}
			<a href="/tools#emi" class="press block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon name="money" class="h-8 w-8 text-teal-800" /><h3 class="mt-2 font-display font-bold text-slate-900">KCC Loan EMI Calculator</h3><p class="mt-1 text-sm text-slate-700">Loan lene se pehle mahina kist aur kul byaj ka hisaab — muft tool.</p></a>
		</div>
		{#if guide}
			<div class="mt-8 rounded-3xl bg-teal-50 p-6 sm:p-8">
				<p class="text-xs font-bold uppercase tracking-wide text-teal-800">Guide · {guide.date}</p>
				<h2 class="mt-1 font-display text-2xl font-black text-slate-900">{guide.title}</h2>
				<p class="mt-2 max-w-2xl leading-relaxed text-slate-800">{guide.excerpt}</p>
				<a href="/blog/{guide.slug}" class="press mt-4 inline-flex min-h-12 items-center rounded-xl bg-teal-800 px-5 py-3 font-bold text-white hover:bg-teal-900">Poori Guide Padho</a>
			</div>
		{/if}
		<div class="mt-8 text-center">
			<a href={whatsappLink('Namaste! Main kisan hu, mujhe PM-Kisan / KCC ke baare me jaankari chahiye.')} target="_blank" rel="noopener noreferrer" class="press inline-flex min-h-12 items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"><Icon name="chat" class="h-5 w-5" />Kisan Sahayata — WhatsApp Karo</a>
		</div>
	</section>
</main>
