<script lang="ts">
	import { nav, site, whatsappLink } from '#lib/site.ts';
	import Icon from '#lib/components/Icon.svelte';
	import OpenNow from '#lib/components/OpenNow.svelte';
	let open = $state(false);
</script>
<section aria-label="Shop information" class="bg-slate-950 text-white">
	<div class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-1 px-4 py-2 text-xs sm:text-sm">
		<span class="inline-flex items-center gap-1.5"><Icon name="pin" class="h-4 w-4 text-amber-300" />{site.contact.address}</span>
		<a class="inline-flex min-h-11 items-center gap-1.5 font-semibold hover:text-amber-300" href="tel:{site.contact.phoneHref}"><Icon name="phone" class="h-4 w-4 text-amber-300" />{site.contact.phone}</a>
		<span class="hidden items-center gap-1.5 md:inline-flex"><Icon name="clock" class="h-4 w-4 text-amber-300" /><OpenNow /></span>
		<span class="ml-auto hidden font-semibold text-teal-200 lg:inline">CSC ID: {site.cscId} (Mock)</span>
	</div>
</section>
<header class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
	<div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
		<a href="/" class="flex items-center gap-3">
			<span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-800 font-display text-lg font-black text-white">A</span>
			<span class="leading-tight">
				<strong class="block font-display text-base font-black text-slate-900 sm:text-lg">Apna Digital Seva Kendra</strong>
				<span class="block text-xs font-semibold text-teal-800 sm:text-sm">CSC & Cyber Cafe · Gaya, Bihar</span>
			</span>
		</a>
		<nav class="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
			{#each nav as item (item.href)}
				<a href={item.href} class="rounded-lg px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-900">{item.label}</a>
			{/each}
		</nav>
		<a href="tel:{site.contact.phoneHref}" class="ml-auto inline-flex min-h-11 items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 lg:ml-2"><Icon name="phone" class="h-5 w-5" /><span class="hidden sm:inline">Call Karo</span><span class="sm:hidden">Call</span></a>
		<button type="button" class="grid min-h-11 min-w-11 place-items-center rounded-xl border border-slate-300 text-slate-900 lg:hidden" aria-label="Menu kholo" aria-expanded={open} onclick={() => (open = !open)}>
			<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
		</button>
	</div>
	{#if open}
		<nav class="border-t border-slate-200 px-4 py-2 lg:hidden" aria-label="Mobile">
			{#each nav as item (item.href)}
				<a href={item.href} class="block rounded-lg px-3 py-3 font-semibold text-slate-900 hover:bg-teal-50" onclick={() => (open = false)}>{item.label}</a>
			{/each}
			<a href="/student-zone" class="block rounded-lg px-3 py-3 font-semibold text-slate-900 hover:bg-teal-50" onclick={() => (open = false)}>Student Zone</a>
			<a href="/kisan-corner" class="block rounded-lg px-3 py-3 font-semibold text-slate-900 hover:bg-teal-50" onclick={() => (open = false)}>Kisan Corner</a>
			<a href="/about" class="block rounded-lg px-3 py-3 font-semibold text-slate-900 hover:bg-teal-50">About</a>
			<a href="/faq" class="block rounded-lg px-3 py-3 font-semibold text-slate-900 hover:bg-teal-50">FAQ</a>
			<a href="/reviews" class="block rounded-lg px-3 py-3 font-semibold text-slate-900 hover:bg-teal-50">Reviews</a>
		</nav>
	{/if}
</header>
