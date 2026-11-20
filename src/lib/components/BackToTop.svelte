<script lang="ts">
	// Back-to-top: bottom-LEFT so it never overlaps the WhatsApp float (right)
	// or the sticky mobile bottom bar (sits above it on mobile: bottom-24).
	import { animate } from 'motion';
	let visible = $state(false);
	let btn: HTMLButtonElement | undefined = $state();
	$effect(() => {
		const onScroll = () => (visible = window.scrollY > 700);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
	$effect(() => {
		if (btn && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			animate(btn, { opacity: [0, 1], y: [10, 0] }, { duration: 0.25, ease: 'easeOut' });
		}
	});
</script>
{#if visible}
	<button bind:this={btn} data-backtotop type="button" aria-label="Upar jao (back to top)" onclick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} class="press fixed bottom-24 left-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-slate-950 text-white shadow-lg hover:bg-slate-800 lg:bottom-6">
		<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>
	</button>
{/if}
