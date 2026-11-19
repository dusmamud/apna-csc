<script lang="ts">
	// Scroll-reveal powered by Motion (motion.dev — Framer Motion team's
	// framework-agnostic successor). Transform + opacity only, honours
	// prefers-reduced-motion, content visible without JS (progressive).
	import { animate, inView } from 'motion';
	import type { Snippet } from 'svelte';
	type Props = { children: Snippet; delay?: number; class?: string };
	let { children, delay = 0, class: className = '' }: Props = $props();
	let el: HTMLDivElement | undefined = $state();
	$effect(() => {
		if (!el) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		el.style.opacity = '0';
		const stop = inView(el, () => {
			animate(el!, { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] });
		}, { amount: 0.15 });
		return stop;
	});
</script>
<div bind:this={el} class={className}>{@render children()}</div>
