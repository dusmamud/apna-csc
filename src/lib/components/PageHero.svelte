<script lang="ts">
	type Props = { eyebrow: string; title: string; text: string };
	let { eyebrow, title, text }: Props = $props();
</script>
<section class="bg-teal-950 text-white">
	<div class="mx-auto max-w-6xl px-4 py-12 sm:py-16">
		<p class="text-sm font-bold uppercase tracking-widest text-amber-300">{eyebrow}</p>
		<h1 class="mt-3 max-w-3xl font-display text-3xl font-black leading-tight sm:text-5xl">{title}</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-teal-50">{text}</p>
	</div>
</section>
