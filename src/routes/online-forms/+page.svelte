<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import ServiceCard from '#lib/components/ServiceCard.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { services, updates } from '#lib/site.ts';
	const formServices = services.filter((s) => s.category === 'online-forms' || s.category === 'education');
	const open = updates.filter((u) => u.type === 'Job');
</script>
<svelte:head><title>Online Forms — Naukri, Exam, Admission, Scholarship | Apna CSC Gaya</title><meta name="description" content="Sarkari naukri, exam, OFSS admission aur scholarship ke form galti-mukt bharwayein — Gaya ki vishwasniya dukaan par." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Online Forms" title="Form Galat = Mauka Khatm. Yahan Sahi Bharo." text="SSC, BPSC, Railway, Banking, Police, Board, University, OFSS aur NSP — har form photo/signature resize, category check aur final preview ke saath." />
	<section class="mx-auto max-w-6xl px-4 py-10">
		<h2 class="font-display text-2xl font-black text-slate-900">Abhi Chal Rahe Forms (Mock List)</h2>
		<div class="mt-5 grid gap-4 md:grid-cols-3">
			{#each open as u (u.slug)}<a href="/updates/{u.slug}" class="rounded-2xl border-2 border-amber-400 bg-amber-50 p-5 transition hover:shadow-md"><p class="text-sm font-bold text-red-800">Last date: {u.lastDate}</p><h3 class="mt-1.5 font-display text-lg font-bold leading-snug text-slate-900">{u.title}</h3><p class="mt-1.5 text-sm text-slate-700">{u.org}{u.posts ? ` · ${u.posts}` : ''}</p><p class="mt-3 inline-flex items-center gap-1 font-bold text-teal-900">Details aur form <Icon name="arrow" class="h-4 w-4" /></p></a>{/each}
		</div>
		<h2 class="mt-12 font-display text-2xl font-black text-slate-900">Form Services aur Rate</h2>
		<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{#each formServices as s (s.slug)}<ServiceCard service={s} />{/each}</div>
		<div class="mt-10 rounded-3xl bg-teal-950 p-6 text-white sm:p-8">
			<h2 class="font-display text-2xl font-black">Form Bharne Aao To Ye Saath Lao</h2>
			<ul class="mt-4 grid gap-2.5 sm:grid-cols-2">
				{#each ['Aadhaar card (original + copy)', 'Sab marksheet — 10th, 12th, Graduation jo lage', 'Caste / Income / Residence certificate (category ka labh chahiye to)', 'Bank passbook ki copy', 'Mobile number — OTP wahi aayega', 'Purana registration number (agar pehle apply kiya ho)'] as d (d)}<li class="flex gap-2.5"><Icon name="check" class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />{d}</li>{/each}
			</ul>
			<p class="mt-5 text-sm text-teal-100">Photo aur signature dukaan par hi ban jayenge — studio jaane ki zaroorat nahi.</p>
		</div>
	</section>
</main>
