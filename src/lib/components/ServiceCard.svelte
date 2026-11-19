<script lang="ts">
	import { inr, type Service } from '#lib/site.ts';
	import Icon from '#lib/components/Icon.svelte';
	type Props = { service: Service };
	let { service }: Props = $props();
</script>
<a href="/services/{service.slug}" class="group flex min-h-12 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-700 hover:shadow-md">
	<div class="flex items-start justify-between gap-3">
		<h3 class="font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-teal-800">{service.name}</h3>
		{#if service.popular}<span class="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">Lokpriya</span>{/if}
	</div>
	<p class="mt-1 text-sm font-medium text-teal-800">{service.hindi}</p>
	<p class="mt-2 flex-1 text-sm leading-relaxed text-slate-700">{service.description}</p>
	<p class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
		<strong class="text-base text-slate-900">{service.price > 0 ? `${inr(service.price)} ` : ''}<span class="text-sm font-semibold text-slate-600">{service.priceNote}</span></strong>
		<span class="inline-flex items-center gap-1 text-slate-600"><Icon name="clock" class="h-4 w-4" />{service.duration}</span>
	</p>
</a>
