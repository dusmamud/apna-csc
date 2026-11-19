<script lang="ts">
	// Live open/closed status from shop hours (IST). Server HTML is neutral
	// ("Timing: ..."); JS enhances to a live badge on mount and every minute.
	import { istNowParts, shopOpenStatus } from '#lib/tools.ts';
	type Props = { class?: string };
	let { class: className = '' }: Props = $props();
	let status = $state<{ open: boolean; label: string } | null>(null);
	$effect(() => {
		const update = () => { const p = istNowParts(); status = shopOpenStatus(p.day, p.minutes); };
		update();
		const t = setInterval(update, 60_000);
		return () => clearInterval(t);
	});
</script>
{#if status}
	<span class="inline-flex items-center gap-1.5 font-semibold {className}">
		<span class="h-2.5 w-2.5 rounded-full {status.open ? 'bg-green-400' : 'bg-red-400'}" aria-hidden="true"></span>
		{status.label}{status.open ? ' — aao ya call karo' : ' — WhatsApp par message chhodo'}
	</span>
{:else}
	<span class="inline-flex items-center gap-1.5 {className}">Mon–Sat 9 AM–8 PM · Sun 10 AM–2 PM</span>
{/if}
