<script lang="ts">import PageHero from '#lib/components/PageHero.svelte'; import { site } from '#lib/site.ts';</script>
<svelte:head><title>Terms & Disclaimer — Apna Digital Seva Kendra</title></svelte:head>
<main id="main">
	<PageHero eyebrow="Terms" title="Terms & Disclaimer" text="Seva ki shartein — saaf aur saral bhasha me, bina ghumaye." />
	<section class="mx-auto max-w-3xl space-y-5 px-4 py-10 leading-relaxed text-slate-800">
		<p class="rounded-2xl bg-red-50 p-5 font-medium text-red-950"><strong>Sabse Zaroori:</strong> {site.disclaimer}</p>
		<p><strong class="text-slate-900">1. Hamari bhoomika:</strong> Hum ek CSC / cyber cafe ke roop me digital sahayata dete hain — form bharna, documents taiyaar karna, portal par submit karna. Certificate, card ya yojana ka approval hum nahi dete; woh sarkari vibhag deta hai.</p>
		<p><strong class="text-slate-900">2. Fees:</strong> Hamari service fees rate chart ke anusar hain. Sarkari fee, exam fee, ticket kiraya aur premium hamesha alag, actual par — receipt ke saath.</p>
		<p><strong class="text-slate-900">3. Samay:</strong> Website par diya samay anumanit hai. Sarkari portal, server ya vibhag ki prakriya se samay badal sakta hai.</p>
		<p><strong class="text-slate-900">4. Graahak ki zimmedari:</strong> Form me di gayi jaankari ki sachchai graahak ki zimmedari hai. Galat jaankari par hue nuksaan ke liye dukaan zimmedar nahi hogi — haan, sudhaar me poori madad milegi.</p>
		<p><strong class="text-slate-900">5. Refund:</strong> Kaam shuru hone se pehle cancel karne par poori fees wapas. Portal par submit ho jaane ke baad sarkari fees wapas nahi hoti (vibhag ke niyam); hamari service fees paristhiti ke anusar wapas / adjust hogi.</p>
	</section>
</main>
