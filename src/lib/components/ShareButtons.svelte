<script lang="ts">
	// WhatsApp share + copy-link for blog posts and update details.
	import Icon from '#lib/components/Icon.svelte';
	import { site } from '#lib/site.ts';
	type Props = { title: string; path: string };
	let { title, path }: Props = $props();
	const url = $derived(`${site.url}${path}`);
	const wa = $derived(`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`);
	let copied = $state(false);
	async function copy() {
		try { await navigator.clipboard.writeText(url); copied = true; setTimeout(() => (copied = false), 2500); } catch { copied = false; }
	}
</script>
<div class="flex flex-wrap items-center gap-3">
	<span class="font-bold text-slate-900">Share Karo:</span>
	<a href={wa} target="_blank" rel="noopener noreferrer" class="press inline-flex min-h-11 items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 font-bold text-white hover:bg-green-800"><Icon name="chat" class="h-5 w-5" />WhatsApp</a>
	<button type="button" onclick={copy} class="press inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-slate-300 px-4 py-2.5 font-bold text-slate-900 hover:border-teal-700">{copied ? 'Link Copy Ho Gaya ✓' : 'Link Copy Karo'}</button>
</div>
