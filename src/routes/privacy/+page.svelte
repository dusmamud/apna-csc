<script lang="ts">import PageHero from '#lib/components/PageHero.svelte'; import { site } from '#lib/site.ts';</script>
<svelte:head><title>Privacy Policy — Apna Digital Seva Kendra</title></svelte:head>
<main id="main">
	<PageHero eyebrow="Privacy" title="Privacy Policy" text="Aapke documents aur jaankari ki suraksha hamari sabse badi zimmedari hai." />
	<section class="mx-auto max-w-3xl space-y-5 px-4 py-10 leading-relaxed text-slate-800">
		<p><strong class="text-slate-900">1. Hum kya lete hain:</strong> Sirf wahi jaankari jo aapke chune hue kaam ke liye zaroori hai — naam, mobile number, aur form ke documents.</p>
		<p><strong class="text-slate-900">2. Upyog:</strong> Jaankari sirf sambandhit sarkari portal par aapka form bharne / service dene ke liye use hoti hai. Hum aapka data kabhi bechte nahi, aur marketing ke liye bina anumati use nahi karte.</p>
		<p><strong class="text-slate-900">3. OTP / PIN:</strong> Hum kabhi aapka OTP, PIN ya password nahi maangte aur na store karte hain. OTP hamesha khud apne phone par daalein.</p>
		<p><strong class="text-slate-900">4. Documents:</strong> Scan ki gayi copies kaam pura hone ke baad graahak ke kehne par delete kar di jaati hain. Asli documents dukaan par surakshit rakhe jaate hain aur scan ke baad wapas kar diye jaate hain.</p>
		<p><strong class="text-slate-900">5. Sampark:</strong> Privacy ko lekar koi sawal ho to {site.contact.email} par email karein ya dukaan par aayein.</p>
		<p class="rounded-2xl bg-amber-50 p-5 text-sm"><strong>Disclaimer:</strong> {site.disclaimer}</p>
	</section>
</main>
