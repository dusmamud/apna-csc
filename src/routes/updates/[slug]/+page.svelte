<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { site, whatsappLink } from '#lib/site.ts';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	let { data } = $props();
	const u = $derived(data.update);
</script>
<svelte:head><title>{u.title} — Apna CSC Gaya</title><meta name="description" content={u.summary} /></svelte:head>
<main id="main">
	<section class="bg-teal-950 text-white"><div class="mx-auto max-w-6xl px-4 py-12">
		<Breadcrumbs dark items={[{ label: 'Home', href: '/' }, { label: 'Updates', href: '/updates' }, { label: u.title }]} />
		<p class="mt-3 text-sm font-bold uppercase tracking-widest text-amber-300">{u.type}</p>
		<h1 class="mt-3 max-w-3xl font-display text-3xl font-black leading-tight sm:text-4xl">{u.title}</h1>
		<p class="mt-2 font-semibold text-teal-200">{u.org}{u.posts ? ` · ${u.posts}` : ''}</p>
		<p class="mt-4 max-w-2xl leading-relaxed text-teal-50">{u.summary}</p>
	</div></section>
	<section class="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
		<div>
			<h2 class="font-display text-2xl font-black text-slate-900">Poori Jaankari</h2>
			<dl class="mt-4 grid gap-3 sm:grid-cols-2">
				<div class="rounded-xl bg-teal-50 p-4"><dt class="text-sm font-bold text-teal-900">Shuru / Jaari Date</dt><dd class="mt-1 font-semibold text-slate-900">{u.startDate}</dd></div>
				<div class="rounded-xl bg-red-50 p-4"><dt class="text-sm font-bold text-red-900">Aakhiri Date (Last Date)</dt><dd class="mt-1 font-semibold text-slate-900">{u.lastDate}</dd></div>
				{#if u.examDate}<div class="rounded-xl bg-teal-50 p-4"><dt class="text-sm font-bold text-teal-900">Exam Date</dt><dd class="mt-1 font-semibold text-slate-900">{u.examDate}</dd></div>{/if}
				<div class="rounded-xl bg-teal-50 p-4"><dt class="text-sm font-bold text-teal-900">Application Fee</dt><dd class="mt-1 font-semibold text-slate-900">{u.fee}</dd></div>
				<div class="rounded-xl bg-teal-50 p-4 sm:col-span-2"><dt class="text-sm font-bold text-teal-900">Eligibility (Yogyata)</dt><dd class="mt-1 font-semibold text-slate-900">{u.eligibility}</dd></div>
			</dl>
			<h2 class="mt-8 font-display text-2xl font-black text-slate-900">Documents — Form Ke Liye Ye Chahiye</h2>
			<ul class="mt-4 space-y-2.5">{#each u.documents as d (d)}<li class="flex gap-3 rounded-xl bg-teal-50 px-4 py-3 font-medium text-slate-900"><Icon name="check" class="mt-0.5 h-5 w-5 shrink-0 text-teal-800" />{d}</li>{/each}</ul>
			{#if u.officialLink}
				<div class="mt-8 rounded-2xl border-2 border-teal-700 bg-teal-50 p-5">
					<p class="font-bold text-slate-900">Official Website — {u.org}</p>
					<p class="mt-1 text-sm leading-relaxed text-slate-700">Notification aur online apply seedha official portal par hota hai. Form bharne me galti na ho, isliye dukaan par hum wahi portal khol kar form bharte hain.</p>
					<a href={u.officialLink} target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex min-h-12 items-center rounded-xl bg-teal-800 px-5 py-3 font-bold text-white hover:bg-teal-900">Official Website Kholo ↗</a>
				</div>
			{/if}
		</div>
		<aside class="h-fit rounded-3xl bg-teal-950 p-6 text-white lg:sticky lg:top-28">
			<p class="font-display text-xl font-black">Form yahin bharwayein</p>
			<p class="mt-2 text-sm leading-relaxed text-teal-100">Form fees ₹100 se shuru (exam fee alag). Photo, signature aur scan yahin taiyaar. Last date se pehle aayein — aakhiri din bheed hoti hai.</p>
			<a href="/enquiry?service=govt-job-form" class="mt-5 flex min-h-12 items-center justify-center rounded-xl bg-amber-500 px-4 py-3 font-bold text-slate-950 hover:bg-amber-400">Enquiry Karo</a>
			<a href={whatsappLink(`Namaste! Mujhe "${u.title}" ke form ke baare me jaankari chahiye.`)} target="_blank" rel="noopener noreferrer" class="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-bold text-white hover:bg-green-800"><Icon name="chat" class="h-5 w-5" />WhatsApp Karo</a>
			<a href="tel:{site.contact.phoneHref}" class="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-white px-4 py-3 font-bold text-white"><Icon name="phone" class="h-5 w-5" />{site.contact.phone}</a>
		</aside>
	</section>
</main>
