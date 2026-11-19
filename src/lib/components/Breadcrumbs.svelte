<script lang="ts">
	// Visible breadcrumbs + BreadcrumbList JSON-LD (SEO). Items: label + href (last = current page, no href needed).
	import { site } from '#lib/site.ts';
	type Crumb = { label: string; href?: string };
	type Props = { items: Crumb[]; dark?: boolean };
	let { items, dark = false }: Props = $props();
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, ...(c.href || i < items.length - 1 ? { item: `${site.url}${c.href ?? ''}` } : {}) }))
	});
</script>
<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>
<nav aria-label="Breadcrumb" class="text-sm font-semibold {dark ? 'text-teal-200' : 'text-slate-600'}">
	<ol class="flex flex-wrap items-center gap-1.5">
		{#each items as c, i (c.label)}
			<li class="flex items-center gap-1.5">
				{#if i > 0}<span aria-hidden="true">›</span>{/if}
				{#if c.href && i < items.length - 1}<a href={c.href} class="underline {dark ? 'text-amber-300' : 'text-teal-800'}">{c.label}</a>{:else}<span aria-current={i === items.length - 1 ? 'page' : undefined}>{c.label}</span>{/if}
			</li>
		{/each}
	</ol>
</nav>
