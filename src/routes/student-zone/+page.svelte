<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ServiceCard from '#lib/components/ServiceCard.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { blogPosts, getService, services, updates, whatsappLink } from '#lib/site.ts';
	const studentSlugs = ['scholarship-form', 'admission-form', 'exam-form', 'govt-job-form', 'otr-registration', 'admit-card', 'result-check', 'computer-course'];
	const studentServices = studentSlugs.map((s) => getService(s)).filter(Boolean);
	const extraEducation = services.filter((s) => s.category === 'education' && !studentSlugs.includes(s.slug));
	const studentUpdates = updates.filter((u) => /SSC|BSEB|Bihar Police|CTET|Railway|IBPS/i.test(u.title + u.org));
	const guides = blogPosts.filter((p) => ['pan-card-kaise-banaye'].includes(p.slug));
</script>
<svelte:head>
	<title>Student Zone — Scholarship, Admission, Exam Form Aur Result | Apna CSC Gaya</title>
	<meta name="description" content="Chhatron ke saare kaam ek jagah: scholarship form, OFSS admission, exam form, admit card, result print, OTR registration — sahi size photo-signature ke saath, last date se pehle." />
</svelte:head>
<main id="main">
	<PageHero eyebrow="Student Zone · छात्र क्षेत्र" title="Student Zone — Padhai Ke Saare Kaam Ek Jagah" text="Scholarship, admission, exam form, admit card aur result — photo-signature ke sahi size ke saath, bina reject hue. Last date ka intezaar mat karo, pehle din form bharwa lo." />
	<div class="mx-auto max-w-6xl px-4 pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Student Zone' }]} /></div>

	<section class="mx-auto max-w-6xl px-4 py-10" aria-labelledby="stu-services">
		<h2 id="stu-services" class="font-display text-2xl font-black text-slate-900">Chhatron Ki Services</h2>
		<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each [...studentServices, ...extraEducation] as s (s?.slug)}{#if s}<ServiceCard service={s} />{/if}{/each}
		</div>
	</section>

	<section class="bg-teal-50 py-10" aria-labelledby="stu-updates">
		<div class="mx-auto max-w-6xl px-4">
			<div class="flex flex-wrap items-end justify-between gap-3">
				<h2 id="stu-updates" class="font-display text-2xl font-black text-slate-900">Bharti, Admit Card Aur Result Updates</h2>
				<a href="/updates" class="inline-flex min-h-11 items-center font-bold text-teal-900 underline">Sab updates →</a>
			</div>
			<ul class="mt-5 grid gap-3 sm:grid-cols-2">
				{#each studentUpdates as u (u.slug)}
					<li><a href="/updates/{u.slug}" class="press block h-full rounded-2xl bg-white p-5 shadow-sm"><span class="rounded bg-teal-800 px-2 py-0.5 text-xs font-bold text-white">{u.type}</span><span class="mt-2 block font-display font-bold leading-snug text-slate-900">{u.title}</span><span class="mt-1 block text-sm font-semibold text-red-800">Last date: {u.lastDate}</span></a></li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-10" aria-labelledby="stu-tools">
		<h2 id="stu-tools" class="font-display text-2xl font-black text-slate-900">Form Se Pehle Ye Muft Tools Kaam Aayenge</h2>
		<div class="mt-5 grid gap-4 sm:grid-cols-3">
			<a href="/tools#photo-resize" class="press block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon name="camera" class="h-8 w-8 text-teal-800" /><h3 class="mt-2 font-display font-bold text-slate-900">Photo / Signature Resize</h3><p class="mt-1 text-sm text-slate-700">SSC, Railway, Bank — har exam ke sahi KB aur pixel size me photo taiyaar karo.</p></a>
			<a href="/tools#age" class="press block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon name="user" class="h-8 w-8 text-teal-800" /><h3 class="mt-2 font-display font-bold text-slate-900">Age Calculator</h3><p class="mt-1 text-sm text-slate-700">Bharti ki umr-seema (age limit) me aate ho ya nahi — janm tithi se turant hisaab.</p></a>
			<a href="/track-status" class="press block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon name="search" class="h-8 w-8 text-teal-800" /><h3 class="mt-2 font-display font-bold text-slate-900">Result / Status Check</h3><p class="mt-1 text-sm text-slate-700">Admit card, result aur form status ke sab official link ek jagah.</p></a>
		</div>
		{#if guides.length}
			<h2 class="mt-10 font-display text-2xl font-black text-slate-900">Guides — Pehle Padho, Phir Form Bharo</h2>
			<div class="mt-4 grid gap-4 sm:grid-cols-2">
				{#each guides as g (g.slug)}<a href="/blog/{g.slug}" class="press block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p class="text-xs font-bold uppercase tracking-wide text-teal-800">{g.date}</p><p class="mt-1 font-display font-bold leading-snug text-slate-900">{g.title}</p><p class="mt-1 text-sm text-slate-700">{g.excerpt}</p></a>{/each}
				<a href="/blog" class="press block rounded-2xl bg-teal-950 p-5 text-white"><p class="font-display font-bold">Sab Guides Dekho →</p><p class="mt-1 text-sm text-teal-100">PAN, Aadhaar, PM-Kisan, Ayushman — saral Hinglish me poori prakriya.</p></a>
			</div>
		{/if}
		<div class="mt-10 rounded-3xl bg-amber-500 px-6 py-7 text-center">
			<p class="font-display text-xl font-black text-slate-950">Form ki last date paas hai?</p>
			<p class="mx-auto mt-1 max-w-lg font-medium text-slate-900">WhatsApp par form ka naam bhejo — documents ki list aur total kharcha turant bata denge.</p>
			<a href={whatsappLink('Namaste! Main student hu, mujhe ek form bharwana hai.')} target="_blank" rel="noopener noreferrer" class="press mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white"><Icon name="chat" class="h-5 w-5" />WhatsApp Karo</a>
		</div>
	</section>
</main>
