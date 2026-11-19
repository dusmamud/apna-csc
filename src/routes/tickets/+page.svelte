<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import ServiceCard from '#lib/components/ServiceCard.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { services } from '#lib/site.ts';
	const list = services.filter((s) => s.category === 'travel');
</script>
<svelte:head><title>Ticket Booking — Train (IRCTC), Bus, Flight | Apna CSC Gaya</title><meta name="description" content="Train, tatkal, bus aur flight ticket booking — PNR status aur print ke saath." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Travel & Tickets" title="Ticket Ki Tension Khatm" text="Train ka general ho ya tatkal, bus ho ya flight — sahi seat, sahi daam aur pakka print haath me." />
	<section class="mx-auto max-w-6xl px-4 py-10">
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{#each list as s (s.slug)}<ServiceCard service={s} />{/each}</div>
		<div class="mt-10 grid gap-4 sm:grid-cols-3">
			<p class="rounded-2xl bg-teal-50 p-5 font-medium text-slate-800"><Icon name="clock" class="mb-2 h-6 w-6 text-teal-800" /><strong class="block text-slate-900">Tatkal Salah</strong>Tatkal ke liye ek din pehle details de dein — subah bheed se pehle taiyaari ho jayegi.</p>
			<p class="rounded-2xl bg-teal-50 p-5 font-medium text-slate-800"><Icon name="check" class="mb-2 h-6 w-6 text-teal-800" /><strong class="block text-slate-900">PNR Status Free</strong>Hamare yahan book hue ticket ka PNR status aur chart jaankari muft.</p>
			<p class="rounded-2xl bg-teal-50 p-5 font-medium text-slate-800"><Icon name="shield" class="mb-2 h-6 w-6 text-teal-800" /><strong class="block text-slate-900">Refund Madad</strong>Cancel aur refund ke niyam saaf samjha kar, sahi process se madad.</p>
		</div>
		<p class="mt-8 text-sm leading-relaxed text-slate-700">Ticket kiraya aur tatkal charges IRCTC / airline ke niyam anusar alag lagte hain; hamari booking service fees Pricing page par saaf likhi hai.</p>
	</section>
</main>
