<script lang="ts">
	import Picture from '#lib/components/Picture.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import ServiceCard from '#lib/components/ServiceCard.svelte';
	import FaqList from '#lib/components/FaqList.svelte';
	import { categories, images, inr, partners, popularServices, priceList, schemes, sectionHindi, services, site, stats, steps, testimonials, toolsList, trustBadges, updates, whatsappLink } from '#lib/site.ts';
	import CountUp from '#lib/components/CountUp.svelte';
	import { animate } from 'motion';
	let heroEl: HTMLDivElement | undefined = $state();
	$effect(() => {
		if (!heroEl) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		animate(heroEl, { opacity: [0, 1], y: [18, 0] }, { duration: 0.65, ease: [0.22, 1, 0.36, 1] });
	});
	let query = $state('');
	const matches = $derived(query.trim() ? services.filter((s) => `${s.name} ${s.hindi}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6) : []);
</script>
<svelte:head><title>{site.name} — {site.tagline} | CSC & Cyber Cafe Gaya</title></svelte:head>
<main id="main">
	<section class="bg-teal-950 text-white">
		<div class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 sm:py-16 lg:grid-cols-2">
			<div bind:this={heroEl}>
				<p class="inline-flex items-center gap-2 rounded-full bg-teal-900 px-3 py-1.5 text-sm font-semibold text-teal-100"><Icon name="shield" class="h-4 w-4 text-amber-300" /> CSC · Digital Seva · Cyber Cafe — Gaya, Bihar</p>
				<h1 class="mt-4 font-display text-4xl font-black leading-tight sm:text-5xl">Sab Sarkari Kaam,<br /><span class="text-amber-400">Ek Hi Dukaan Par</span></h1>
				<p class="mt-4 max-w-xl leading-relaxed text-teal-50">Aadhaar, PAN, praman patra, naukri ke form, sarkari yojana, bank ka kaam, print aur ticket — daftar ke chakkar khatm. Sahi form, saaf rate, pakki receipt.</p>
				<form class="mt-6" role="search" onsubmit={(e) => e.preventDefault()}>
					<label for="finder" class="font-semibold">Apna kaam khojo</label>
					<div class="mt-2 flex overflow-hidden rounded-xl bg-white shadow">
						<input id="finder" bind:value={query} type="search" placeholder="Jaise: PAN card, scholarship, bijli bill…" class="min-h-12 min-w-0 flex-1 px-4 py-3 text-slate-900" />
						<a href="/services" class="inline-flex min-h-12 items-center gap-2 bg-amber-500 px-4 font-bold text-slate-950 hover:bg-amber-400"><Icon name="search" class="h-5 w-5" />Khojo</a>
					</div>
					{#if matches.length}
						<ul class="mt-2 overflow-hidden rounded-xl bg-white text-slate-900 shadow">
							{#each matches as m (m.slug)}<li><a class="flex min-h-11 items-center justify-between px-4 py-2.5 font-medium hover:bg-teal-50" href="/services/{m.slug}">{m.name}<span class="text-sm font-bold text-teal-800">{m.price > 0 ? inr(m.price) : 'Bank rate'}</span></a></li>{/each}
						</ul>
					{/if}
				</form>
				<p class="mt-6 flex flex-wrap gap-3">
					<a href="/services" class="inline-flex min-h-12 items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-bold text-slate-950 hover:bg-amber-400">Sab Services <Icon name="arrow" class="h-5 w-5" /></a>
					<a href={whatsappLink('Namaste! Mujhe ek kaam karwana hai.')} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white px-5 py-3 font-bold text-white hover:bg-teal-900"><Icon name="chat" class="h-5 w-5" />WhatsApp Karo</a>
				</p>
			</div>
			<Picture stem={images.hero.stem} alt={images.hero.alt} eager width={1600} height={1067} class="aspect-[3/2] w-full rounded-3xl object-cover shadow-2xl" />
		</div>
	</section>

	<section class="overflow-hidden border-b border-amber-200 bg-amber-50 py-2.5" aria-label="Latest updates">
		<div class="ticker-track flex w-max gap-10 whitespace-nowrap px-4 text-sm font-semibold text-slate-900">
			{#each [...updates, ...updates] as u, ti (u.slug + '-' + ti)}<a href="/updates/{u.slug}" class="hover:text-teal-800"><span class="mr-2 rounded bg-teal-800 px-2 py-0.5 text-xs font-bold text-white">{u.type}</span>{u.title} — Last date: {u.lastDate}</a>{/each}
		</div>
	</section>

<section class="mx-auto max-w-6xl px-4 pt-10" aria-labelledby="trust-h">
		<h2 id="trust-h" class="font-display text-2xl font-black text-slate-900">Bharosa Aur Manyata <span class="text-lg font-bold text-teal-800">· {sectionHindi.trust}</span></h2>
		<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each trustBadges as b (b.title)}
				<div class="rounded-2xl border border-teal-200 bg-teal-50 p-5">
					<p class="flex items-center gap-2 font-display font-bold text-slate-900"><Icon name="shield" class="h-5 w-5 shrink-0 text-teal-800" />{b.title}</p>
					<p class="mt-1 text-sm font-semibold text-teal-800">{b.hindi}</p>
					<p class="mt-1.5 text-sm leading-relaxed text-slate-700">{b.text}</p>
				</div>
			{/each}
		</div>
		<div class="mt-6 overflow-hidden" aria-label="Partner portals">
			<div class="ticker-track flex w-max gap-3 whitespace-nowrap">
				{#each [...partners, ...partners] as name, pi (name + '-' + pi)}<span class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800">{name}</span>{/each}
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-12" aria-labelledby="cat-h">
		<h2 id="cat-h" class="font-display text-3xl font-black text-slate-900">Kaam ki Category Chuno <span class="block text-lg font-bold text-teal-800">{sectionHindi.categories}</span></h2>
		<p class="mt-2 text-slate-700">8 category, {services.length} services — sab ek hi chhat ke neeche.</p>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each categories as c, i (c.slug)}
				<Reveal delay={i * 40}><a href="/services?cat={c.slug}" class="block h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-700 hover:shadow-md">
					<Icon name={c.icon} class="h-9 w-9 text-teal-800" />
					<h3 class="mt-3 font-display text-lg font-bold text-slate-900">{c.name}</h3>
					<p class="text-sm font-semibold text-teal-800">{c.hindi}</p>
					<p class="mt-2 text-sm leading-relaxed text-slate-700">{c.blurb}</p>
				</a></Reveal>
			{/each}
		</div>
	</section>

	<section class="bg-teal-50 py-12" aria-labelledby="pop-h">
		<div class="mx-auto max-w-6xl px-4">
			<div class="flex flex-wrap items-end justify-between gap-3">
				<h2 id="pop-h" class="font-display text-3xl font-black text-slate-900">Sabse Zyada Hone Wale Kaam <span class="block text-lg font-bold text-teal-800">{sectionHindi.popular}</span></h2>
				<a href="/services" class="font-bold text-teal-900 underline">Sab {services.length} services →</a>
			</div>
			<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each popularServices.slice(0, 6) as s, i (s.slug)}<Reveal delay={i * 60}><ServiceCard service={s} /></Reveal>{/each}
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-12" aria-labelledby="scheme-h">
		<h2 id="scheme-h" class="font-display text-3xl font-black text-slate-900">Sarkari Yojana — Labh Yahan Se <span class="block text-lg font-bold text-teal-800">{sectionHindi.schemes}</span></h2>
		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each schemes.slice(0, 4) as sc (sc.slug)}
				<a href="/schemes" class="rounded-2xl bg-teal-950 p-5 text-white transition hover:bg-teal-900">
					<p class="font-display font-bold leading-snug">{sc.name}</p>
					<p class="mt-2 text-sm leading-relaxed text-teal-100">{sc.benefit}</p>
					<p class="mt-3 text-sm font-bold text-amber-300">Eligibility aur documents →</p>
				</a>
			{/each}
		</div>
	</section>

<section class="mx-auto max-w-6xl px-4 pb-12" aria-labelledby="finder-teaser-h">
		<div class="grid gap-4 md:grid-cols-2">
			<a href="/schemes" class="rounded-3xl bg-teal-950 p-6 text-white transition hover:bg-teal-900">
				<h2 id="finder-teaser-h" class="font-display text-2xl font-black">Kaunsi Yojana Mere Liye Hai? <span class="block text-base font-bold text-amber-300">{sectionHindi.finder}</span></h2>
				<p class="mt-2 text-sm leading-relaxed text-teal-100">Umr, kaam aur aay batao — Scheme Finder turant bata dega kaunsi sarkari yojana ke patr ho sakte ho.</p>
				<p class="mt-3 font-bold text-amber-300">Finder Chalao →</p>
			</a>
			<a href="/tools" class="rounded-3xl border-2 border-teal-700 bg-white p-6 transition hover:bg-teal-50">
				<h2 class="font-display text-2xl font-black text-slate-900">Muft Online Tools <span class="block text-base font-bold text-teal-800">{sectionHindi.tools}</span></h2>
				<p class="mt-2 text-sm leading-relaxed text-slate-700">{toolsList[0].name}, Age Calculator, EMI Calculator — form ki taiyaari ghar baithe, bilkul muft.</p>
				<p class="mt-3 font-bold text-teal-900">Tools Kholo →</p>
			</a>
		</div>
	</section>

	<section class="border-y border-slate-200 bg-white py-12" aria-labelledby="price-h">
		<div class="mx-auto max-w-6xl px-4">
			<div class="flex flex-wrap items-end justify-between gap-3">
				<div><h2 id="price-h" class="font-display text-3xl font-black text-slate-900">Saaf Rate — Koi Chhupa Charge Nahi <span class="block text-lg font-bold text-teal-800">{sectionHindi.pricing}</span></h2><p class="mt-2 text-slate-700">Sarkari / exam fee hamesha alag, actual par — receipt ke saath.</p></div>
				<a href="/pricing" class="font-bold text-teal-900 underline">Poora rate chart →</a>
			</div>
			<ul class="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each priceList.slice(0, 9) as p (p.name)}<li class="flex items-baseline justify-between gap-3 border-b border-dashed border-slate-300 pb-2"><span class="text-slate-800">{p.name}</span><strong class="whitespace-nowrap text-slate-900">{inr(p.price)} <span class="text-xs font-semibold text-slate-600">{p.unit}</span></strong></li>{/each}
			</ul>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-12" aria-labelledby="how-h">
		<h2 id="how-h" class="font-display text-3xl font-black text-slate-900">Kaam Kaise Hota Hai?</h2>
		<ol class="mt-8 grid gap-4 md:grid-cols-3">
			{#each steps as step, i (step.title)}
				<li class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span class="grid h-11 w-11 place-items-center rounded-full bg-amber-500 font-display text-lg font-black text-slate-950">{i + 1}</span><h3 class="mt-4 font-display text-lg font-bold text-slate-900">{step.title}</h3><p class="mt-2 text-sm leading-relaxed text-slate-700">{step.text}</p></li>
			{/each}
		</ol>
		<div class="mt-10 grid grid-cols-2 gap-4 rounded-3xl bg-teal-950 px-6 py-8 text-center text-white lg:grid-cols-4">
			{#each stats as st (st.label)}<div><CountUp value={st.value} /><span class="mt-1 block text-sm text-teal-100">{st.label}</span></div>{/each}
		</div>
	</section>

	<section class="bg-teal-50 py-12" aria-labelledby="rev-h">
		<div class="mx-auto max-w-6xl px-4">
			<div class="flex flex-wrap items-end justify-between gap-3"><h2 id="rev-h" class="font-display text-3xl font-black text-slate-900">Graahak Kya Kehte Hain <span class="block text-lg font-bold text-teal-800">{sectionHindi.reviews}</span></h2><a href="/reviews" class="font-bold text-teal-900 underline">Sab reviews →</a></div>
			<div class="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
				<p class="font-display text-4xl font-black text-slate-900">{site.rating}</p>
				<div>
					<p class="flex gap-0.5 text-amber-500" role="img" aria-label="5 me se {site.rating} star rating">{#each Array(5) as _, i (i)}<Icon name="star" class="h-5 w-5" />{/each}</p>
					<p class="mt-1 text-sm font-medium text-slate-700">Google par {site.reviewCount} reviews ke aadhar par (mock) — naam aur jagah ke saath asli graahak anubhav neeche padho.</p>
				</div>
			</div>
			<div class="mt-8 grid gap-4 md:grid-cols-3">
				{#each testimonials.slice(0, 3) as t (t.author)}
					<figure class="rounded-2xl bg-white p-6 shadow-sm"><p class="flex gap-0.5 text-amber-500" role="img" aria-label="{t.rating} star rating">{#each Array(t.rating) as _, i (i)}<Icon name="star" class="h-5 w-5" />{/each}</p><blockquote class="mt-3 leading-relaxed text-slate-800">“{t.quote}”</blockquote><figcaption class="mt-4 font-bold text-slate-900">{t.author}<span class="block text-sm font-medium text-slate-600">{t.role}</span></figcaption></figure>
				{/each}
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-12" aria-labelledby="gal-h">
		<div class="flex flex-wrap items-end justify-between gap-3"><h2 id="gal-h" class="font-display text-3xl font-black text-slate-900">Dukaan Ki Jhalak</h2><a href="/gallery" class="font-bold text-teal-900 underline">Gallery →</a></div>
		<div class="mt-6 grid gap-4 sm:grid-cols-3">
			<Picture stem={images.counter.stem} alt={images.counter.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-2xl object-cover" />
			<Picture stem={images.printing.stem} alt={images.printing.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-2xl object-cover" />
			<Picture stem={images.banking.stem} alt={images.banking.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-2xl object-cover" />
		</div>
	</section>

	<section class="mx-auto max-w-4xl px-4 pb-14" aria-labelledby="faq-h">
		<h2 id="faq-h" class="font-display text-3xl font-black text-slate-900">Aksar Poochhe Jaane Wale Sawal</h2>
		<div class="mt-6"><FaqList limit={4} /></div>
		<p class="mt-6 text-center"><a href="/faq" class="font-bold text-teal-900 underline">Sab sawal aur dukaan ki policy →</a></p>
		<div class="mt-10 rounded-3xl bg-amber-500 px-6 py-8 text-center">
			<p class="font-display text-2xl font-black text-slate-950">Kaam karwana hai? Der kis baat ki!</p>
			<p class="mx-auto mt-2 max-w-xl font-medium text-slate-900">Dukaan par aao, call karo ya WhatsApp par documents bhejo — rate pehle, kaam baad me.</p>
			<p class="mt-5 flex flex-wrap justify-center gap-3">
				<a href="tel:{site.contact.phoneHref}" class="inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white"><Icon name="phone" class="h-5 w-5" />{site.contact.phone}</a>
				<a href="/enquiry" class="inline-flex min-h-12 items-center rounded-xl bg-white px-5 py-3 font-bold text-slate-950">Online Enquiry Karo</a>
			</p>
		</div>
	</section>
</main>
