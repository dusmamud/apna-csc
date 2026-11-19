<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import OpenNow from '#lib/components/OpenNow.svelte';
	import { site, whatsappLink } from '#lib/site.ts';
	let name = $state(''); let mobile = $state(''); let message = $state('');
	let errors = $state<Record<string, string>>({}); let sent = $state(false);
	function submit(e: SubmitEvent) {
		e.preventDefault();
		const next: Record<string, string> = {};
		if (name.trim().length < 3) next.name = 'Sahi naam likhein.';
		if (!/^[6-9]\d{9}$/.test(mobile.trim())) next.mobile = '10 anko ka sahi mobile number likhein.';
		if (message.trim().length < 10) next.message = 'Apna kaam thoda detail me likhein (10+ akshar).';
		errors = next; if (!Object.keys(next).length) sent = true;
	}
</script>
<svelte:head><title>Sampark Karo — Apna Digital Seva Kendra, Gaya</title><meta name="description" content="Pata, phone, WhatsApp aur dukaan ka samay — Main Bazaar Road, Bus Stand ke paas, Gaya." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Contact" title="Aao, Call Karo, Ya WhatsApp Karo" text="Bus Stand se 2 minute ki doori. Last-date wala kaam ho to pehle phone kar lo — hum documents ki list bata denge, ek hi chakkar me kaam hoga." />
	<section class="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2">
		<div class="space-y-4">
			<p class="flex gap-3 rounded-2xl bg-teal-50 p-5 font-medium text-slate-900"><Icon name="pin" class="mt-0.5 h-6 w-6 shrink-0 text-teal-800" /><span><strong class="block">Pata</strong>{site.contact.address}</span></p>
			<p class="flex gap-3 rounded-2xl bg-teal-50 p-5 font-medium text-slate-900"><Icon name="clock" class="mt-0.5 h-6 w-6 shrink-0 text-teal-800" /><span><strong class="block">Dukaan Ka Samay</strong><OpenNow class="font-bold text-teal-900" /><br />{#each site.hours as h (h.days)}{h.days}: {h.time}<br />{/each}</span></p>
			<p class="flex gap-3 rounded-2xl bg-teal-50 p-5 font-medium text-slate-900"><Icon name="phone" class="mt-0.5 h-6 w-6 shrink-0 text-teal-800" /><span><strong class="block">Phone / WhatsApp</strong><a class="underline" href="tel:{site.contact.phoneHref}">{site.contact.phone}</a></span></p>
			<p class="flex gap-3 rounded-2xl bg-teal-50 p-5 font-medium text-slate-900"><Icon name="mail" class="mt-0.5 h-6 w-6 shrink-0 text-teal-800" /><span><strong class="block">Email</strong>{site.contact.email}<br /><span class="text-sm text-slate-600">Print ke liye documents is email par bhi bhej sakte ho.</span></span></p>
			<div class="grid min-h-56 place-items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center" role="img" aria-label="Map placeholder — Shop No. 12, Main Bazaar Road, Near Bus Stand, Gaya, Bihar 823001">
				<p class="font-semibold text-slate-700"><Icon name="pin" class="mx-auto mb-2 h-9 w-9 text-teal-800" />Google Map yahan aayega (client approval ke baad)<br /><span class="text-sm font-medium">Landmark: Bus Stand ke paas, Main Bazaar Road</span></p>
			</div>
		</div>
		<div>
			{#if sent}
				<div class="rounded-3xl border-2 border-teal-700 bg-teal-50 p-8 text-center" role="status"><Icon name="check" class="mx-auto h-12 w-12 text-teal-800" /><h2 class="mt-3 font-display text-2xl font-black text-slate-900">Dhanyavaad, {name.split(' ')[0]} Ji!</h2><p class="mt-2 text-slate-800">Aapka sandesh mil gaya hai (mock confirmation). Hum {mobile} par sampark karenge.</p><a href={whatsappLink(`Namaste! Main ${name}. ${message}`)} target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"><Icon name="chat" class="h-5 w-5" />WhatsApp par Turant Baat Karo</a></div>
			{:else}
				<form onsubmit={submit} novalidate class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
					<h2 class="font-display text-2xl font-black text-slate-900">Sandesh Bhejo</h2>
					<div class="mt-5"><label for="cname" class="font-bold text-slate-900">Naam *</label><input id="cname" bind:value={name} type="text" autocomplete="name" class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" />{#if errors.name}<p class="mt-1.5 text-sm font-semibold text-red-800">{errors.name}</p>{/if}</div>
					<div class="mt-5"><label for="cmobile" class="font-bold text-slate-900">Mobile *</label><input id="cmobile" bind:value={mobile} type="tel" inputmode="numeric" autocomplete="tel" class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" />{#if errors.mobile}<p class="mt-1.5 text-sm font-semibold text-red-800">{errors.mobile}</p>{/if}</div>
					<div class="mt-5"><label for="cmsg" class="font-bold text-slate-900">Aapka kaam / sandesh *</label><textarea id="cmsg" bind:value={message} rows="4" class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"></textarea>{#if errors.message}<p class="mt-1.5 text-sm font-semibold text-red-800">{errors.message}</p>{/if}</div>
					<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-800 px-5 py-3 font-bold text-white hover:bg-teal-900">Bhejo <Icon name="arrow" class="h-5 w-5" /></button>
				</form>
			{/if}
		</div>
	</section>
</main>
