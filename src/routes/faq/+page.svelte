<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import FaqList from '#lib/components/FaqList.svelte';
	import { faqs, site } from '#lib/site.ts';
	const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
</script>
<svelte:head><title>FAQ — Aksar Poochhe Sawal | Apna CSC Gaya</title><meta name="description" content="Kharcha, documents, samay, AePS suraksha aur dukaan ki policy — sab sawalon ke saaf jawaab." />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`}</svelte:head>
<main id="main">
	<PageHero eyebrow="FAQ" title="Sawal? Jawaab Yahan Hai" text="Kharcha, documents aur samay ko lekar koi bhram nahi. Phir bhi shanka ho to call kar lo — salah muft hai." />
	<section class="mx-auto max-w-4xl px-4 py-10">
		<FaqList />
		<div class="mt-10 rounded-3xl bg-teal-950 p-6 text-white sm:p-8">
			<h2 class="font-display text-2xl font-black">Dukaan Ki Policy</h2>
			<ul class="mt-4 space-y-2.5 text-teal-50">
				<li>· Galat jaankari graahak ki taraf se di gayi ho to form reject ki zimmedari dukaan ki nahi — lekin sudhaar me poori madad milegi.</li>
				<li>· Sarkari portal band / server down ho to kaam agle karyadivas par hoga, fees wapas ya adjust — jaisa graahak chahe.</li>
				<li>· Kisi bhi graahak ke documents / OTP / PIN dukaan kabhi apne paas nahi rakhti aur na maangti hai.</li>
			</ul>
			<p class="mt-5 border-t border-teal-800 pt-4 text-sm leading-relaxed text-teal-100"><strong class="text-amber-300">Disclaimer:</strong> {site.disclaimer}</p>
		</div>
	</section>
</main>
