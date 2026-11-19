<script lang="ts">
	import { faqs } from '#lib/site.ts';
	import Icon from '#lib/components/Icon.svelte';
	type Props = { items?: typeof faqs; limit?: number };
	let { items = faqs, limit }: Props = $props();
	const shown = $derived(limit ? items.slice(0, limit) : items);
	let open = $state(0);
</script>
<div class="space-y-3">
	{#each shown as faq, i (faq.q)}
		<div class="rounded-2xl border border-slate-200 bg-white">
			<button type="button" class="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900" aria-expanded={open === i} aria-controls="faq-panel-{i}" onclick={() => (open = open === i ? -1 : i)}>
				{faq.q}
				<Icon name="chevron" class="h-5 w-5 shrink-0 text-teal-800 transition-transform duration-300 {open === i ? 'rotate-180' : ''}" />
			</button>
			<div id="faq-panel-{i}" class="grid transition-[grid-template-rows] duration-300 ease-out {open === i ? '[grid-template-rows:1fr]' : '[grid-template-rows:0fr]'}" aria-hidden={open !== i}>
				<div class="overflow-hidden"><p class="px-5 pb-5 leading-relaxed text-slate-700">{faq.a}</p></div>
			</div>
		</div>
	{/each}
</div>
