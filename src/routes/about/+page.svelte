<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { images, site, stats } from '#lib/site.ts';
</script>
<svelte:head><title>Hamare Baare Me — Apna Digital Seva Kendra, Gaya</title><meta name="description" content="Rakesh Kumar dwara chalayi jaane wali Gaya ki apni CSC dukaan — 9 saal se sarkari kaam, form aur print ki vishwasniya seva." /></svelte:head>
<main id="main">
	<PageHero eyebrow="About" title="Gaya Ki Apni Dukaan, Aapke Kaam Ke Liye" text="Apna Digital Seva Kendra 2017 se Main Bazaar Road, Gaya par hai — jahan har graahak ko pehle rate aur documents saaf bataye jaate hain, phir kaam hota hai." />
	<section class="mx-auto max-w-6xl px-4 py-10">
		<div class="grid items-center gap-8 lg:grid-cols-2">
			<Picture stem={images.counter.stem} alt={images.counter.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-3xl object-cover" />
			<div>
				<h2 class="font-display text-2xl font-black text-slate-900">Namaste, Main {site.owner}</h2>
				<p class="mt-3 leading-relaxed text-slate-700">Main is dukaan ka VLE (Village Level Entrepreneur) hu. CSC ID: <strong>{site.cscId}</strong> (mock). Meri dukaan ka ek hi usool hai — <strong>form submit se pehle graahak ko har detail dikhao, aur kharcha pehle saaf batao.</strong> Isi wajah se aas-paas ke gaon — Bodh Gaya, Manpur, Wazirganj — se log baar-baar yahin aate hain.</p>
				<ul class="mt-5 space-y-2.5">
					{#each ['Rate board dukaan aur website dono par — koi chhupa charge nahi', 'Har kaam ki pakki receipt aur status phone par', 'Buzurgon aur mahilaon ke liye pehle baith kar shanti se samjhana', 'Documents ki privacy — scan ke baad file sirf aapke kaam ke liye'] as t (t)}<li class="flex gap-2.5 font-medium text-slate-800"><Icon name="shield" class="mt-0.5 h-5 w-5 shrink-0 text-teal-800" />{t}</li>{/each}
				</ul>
			</div>
		</div>
		<div class="mt-10 grid grid-cols-2 gap-4 rounded-3xl bg-teal-950 px-6 py-8 text-center text-white lg:grid-cols-4">
			{#each stats as st (st.label)}<p><strong class="block font-display text-3xl font-black text-amber-400">{st.value}</strong><span class="mt-1 block text-sm text-teal-100">{st.label}</span></p>{/each}
		</div>
		<div class="mt-10 grid gap-4 sm:grid-cols-2">
			<Picture stem={images.shopFront.stem} alt={images.shopFront.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-2xl object-cover" />
			<Picture stem={images.happy.stem} alt={images.happy.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-2xl object-cover" />
		</div>
		<p class="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-relaxed text-slate-800"><strong>Disclaimer:</strong> {site.disclaimer}</p>
	</section>
</main>
