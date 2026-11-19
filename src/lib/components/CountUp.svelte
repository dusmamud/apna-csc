<script lang="ts">
	// Animated count-up for the stats band. The FINAL value is rendered in HTML
	// (no-JS / reduced-motion safe); JS animates from a lower number via Motion.
	import { animate, inView } from 'motion';
	type Props = { value: string };
	let { value }: Props = $props();
	let el: HTMLElement | undefined = $state();
	const parsed = $derived.by(() => {
		const m = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
		return m ? { num: parseFloat(m[1].replace(/,/g, '')), suffix: m[2], decimals: m[1].includes('.') ? 1 : 0 } : null;
	});
	$effect(() => {
		if (!el || !parsed) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const target = parsed;
		const stop = inView(el, () => {
			const controls = animate(0, target.num, {
				duration: 1.4, ease: [0.22, 1, 0.36, 1],
				onUpdate: (v) => { if (el) el.textContent = v.toLocaleString('en-IN', { minimumFractionDigits: target.decimals, maximumFractionDigits: target.decimals }) + target.suffix; }
			});
			return () => controls.stop();
		}, { amount: 0.4 });
		return stop;
	});
</script>
<strong bind:this={el} class="block font-display text-3xl font-black text-amber-400">{value}</strong>
