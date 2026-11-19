<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import ServiceCard from '#lib/components/ServiceCard.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { images, services } from '#lib/site.ts';
	const list = services.filter((s) => s.category === 'banking');
</script>
<svelte:head><title>Banking & AePS — Paisa Nikalo, Bhejo, Bill Bharo | Apna CSC Gaya</title><meta name="description" content="AePS se paisa nikalna-jama, money transfer, Jan Dhan khata, bima, ITR aur BBPS bill payment — bank ki line khatm." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Banking & Finance" title="Bank Ka Kaam, Dukaan Par — Bina Line Ke" text="Aadhaar aur fingerprint se paisa, desh bhar me money transfer, bill payment aur bima — har transaction ki pakki receipt ke saath." />
	<section class="mx-auto max-w-6xl px-4 py-10">
		<div class="grid items-center gap-8 lg:grid-cols-2">
			<Picture stem={images.banking.stem} alt={images.banking.alt} width={1200} height={800} class="aspect-[3/2] w-full rounded-3xl object-cover" />
			<div>
				<h2 class="font-display text-2xl font-black text-slate-900">AePS — Aadhaar Se Banking</h2>
				<ul class="mt-4 space-y-2.5">
					{#each ['Cash withdrawal — Aadhaar + fingerprint, koi form nahi', 'Cash deposit aur balance enquiry', 'Mini statement — pichle 10 transaction', 'Khata Aadhaar se link hai to kisi bhi bank ka chalega'] as t (t)}<li class="flex gap-2.5 font-medium text-slate-800"><Icon name="check" class="mt-0.5 h-5 w-5 shrink-0 text-teal-800" />{t}</li>{/each}
				</ul>
				<p class="mt-4 rounded-xl bg-red-50 p-4 text-sm font-medium leading-relaxed text-red-900">Suraksha: Apna OTP / PIN kabhi kisi ko na batayein. Hum kabhi OTP nahi maangte. Har transaction par receipt zaroor lein.</p>
			</div>
		</div>
		<h2 class="mt-12 font-display text-2xl font-black text-slate-900">Banking Services</h2>
		<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{#each list as s (s.slug)}<ServiceCard service={s} />{/each}</div>
	</section>
</main>
