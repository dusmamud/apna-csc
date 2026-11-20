<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { getService, offers, whatsappLink } from '#lib/site.ts';
</script>
<svelte:head>
	<title>Offers — Is Mahine Ke Khaas Daam | Apna Digital Seva Kendra Gaya</title>
	<meta name="description" content="Is mahine ke khaas offers: PVC card combo, student form season, bulk print, Ayushman parivar offer — saaf daam, saaf shartein, koi chhupa charge nahi." />
</svelte:head>
<main id="main">
	<PageHero eyebrow="Offers · ऑफ़र" title="Is Mahine Ke Khaas Offers" text="Saaf daam, saaf shartein — har offer ki validity aur niyam yahin likhe hain. Offer lene ke liye dukaan par aao ya WhatsApp par pehle confirm kar lo." />
	<div class="mx-auto max-w-6xl px-4 pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Offers' }]} /></div>
	<section class="mx-auto max-w-6xl px-4 py-10" aria-label="Sab offers">
		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each offers as o (o.slug)}
				<article class="press flex flex-col rounded-3xl border-2 border-amber-300 bg-amber-50 p-6">
					<p class="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-950"><Icon name="ticket" class="h-4 w-4" />Offer</p>
					<h2 class="mt-3 font-display text-xl font-black leading-snug text-slate-900">{o.title}</h2>
					<p class="text-sm font-semibold text-teal-800">{o.hindi}</p>
					<p class="mt-2 flex-1 text-sm leading-relaxed text-slate-800">{o.description}</p>
					<p class="mt-4 rounded-xl bg-white px-4 py-3 font-display font-black text-teal-900">{o.priceNote}</p>
					<p class="mt-3 flex items-center gap-2 text-sm font-bold text-red-800"><Icon name="clock" class="h-4 w-4" />Sirf {o.validTill} tak</p>
					<details class="mt-3">
						<summary class="cursor-pointer text-sm font-bold text-teal-900">Shartein (Terms) dekho</summary>
						<ul class="mt-2 space-y-1 text-sm text-slate-700">
							{#each o.terms as t (t)}<li class="flex gap-2"><Icon name="check" class="mt-0.5 h-4 w-4 shrink-0 text-teal-800" />{t}</li>{/each}
						</ul>
					</details>
					<p class="mt-4 flex flex-wrap gap-2">
						<a href={whatsappLink(`Namaste! Mujhe "${o.title}" offer lena hai. Jaankari dein.`)} target="_blank" rel="noopener noreferrer" class="press inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 font-bold text-white hover:bg-green-800"><Icon name="chat" class="h-5 w-5" />WhatsApp Par Claim Karo</a>
						{#if o.serviceSlug && getService(o.serviceSlug)}<a href="/services/{o.serviceSlug}" class="press inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-teal-800 px-4 py-2.5 font-bold text-teal-900">Service Dekho</a>{/if}
					</p>
				</article>
			{/each}
		</div>
		<p class="mt-8 rounded-2xl bg-teal-50 p-5 text-sm leading-relaxed text-slate-800"><strong class="text-slate-900">Note:</strong> Sab offers mock (demo) hain aur sirf dukaan ki service fees par lagu hain. Sarkari / exam fee hamesha alag, actual par lagti hai. Dukaan bheed ya stock ke hisaab se offer pehle khatm kar sakti hai — WhatsApp par confirm kar lena sabse achha hai.</p>
	</section>
</main>
