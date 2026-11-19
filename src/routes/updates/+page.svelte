<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { updates } from '#lib/site.ts';
	const types = ['All', 'Job', 'Admit Card', 'Result', 'Answer Key'] as const;
	let filter = $state<string>('All');
	const shown = $derived(filter === 'All' ? updates : updates.filter((u) => u.type === filter));
</script>
<svelte:head><title>Latest Jobs, Admit Card, Results — Apna CSC Gaya</title><meta name="description" content="Sarkari naukri, admit card, result aur answer key ki taaza jaankari — aur form dukaan par sahi bharwayein." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Taaza Jaankari" title="Latest Jobs · Admit Card · Results" text="Har nayi bharti aur exam update yahan. Form bharna ho to dukaan par aao — photo, scan, fee payment sab yahin." />
	<section class="mx-auto max-w-6xl px-4 py-10">
		<div class="flex flex-wrap gap-2" role="group" aria-label="Update type filter">
			{#each types as t (t)}<button type="button" class="min-h-11 rounded-full px-4 py-2 text-sm font-bold {filter === t ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-900'}" onclick={() => (filter = t)}>{t === 'All' ? 'Sab Updates' : t}</button>{/each}
		</div>
		<div class="mt-6 grid gap-4 md:grid-cols-2">
			{#each shown as u (u.slug)}
				<a href="/updates/{u.slug}" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-700 hover:shadow-md">
					<p class="flex flex-wrap items-center gap-2 text-sm"><span class="rounded bg-teal-800 px-2 py-0.5 text-xs font-bold text-white">{u.type}</span><span class="font-semibold text-slate-600">{u.org}</span>{#if u.posts}<span class="font-bold text-teal-800">{u.posts}</span>{/if}</p>
					<h2 class="mt-2 font-display text-xl font-bold text-slate-900">{u.title}</h2>
					<p class="mt-2 text-sm leading-relaxed text-slate-700">{u.summary}</p>
					<p class="mt-3 text-sm font-semibold text-red-800">Last date: {u.lastDate}</p>
				</a>
			{/each}
		</div>
		<p class="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-relaxed text-slate-800"><strong>Suchna:</strong> Ye jaankari mock / udaharan ke liye hai. Asli dates aur eligibility hamesha sambandhit vibhag ke official notification se confirm karein — dukaan par hum notification padh kar sahi salah dete hain.</p>
	</section>
</main>
