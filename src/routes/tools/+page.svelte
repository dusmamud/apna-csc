<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { inr, photoSizeGuide, sectionHindi, toolsList } from '#lib/site.ts';
	import { calculateAge, calculateEmi, type AgeResult, type EmiResult } from '#lib/tools.ts';

	// ---------- shared image helpers (all client-side, nothing uploads) ----------
	function loadImage(file: File): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const url = URL.createObjectURL(file);
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = url;
		});
	}
	function canvasBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
		return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
	}
	async function shrinkToTargetKb(file: File, targetKb: number, maxDim: number): Promise<{ blob: Blob; url: string; kb: number; w: number; h: number }> {
		const img = await loadImage(file);
		let scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
		let best: Blob | null = null;
		for (let attempt = 0; attempt < 14; attempt++) {
			const w = Math.max(20, Math.round(img.naturalWidth * scale));
			const h = Math.max(20, Math.round(img.naturalHeight * scale));
			const canvas = document.createElement('canvas');
			canvas.width = w; canvas.height = h;
			const ctx = canvas.getContext('2d')!;
			ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
			ctx.drawImage(img, 0, 0, w, h);
			let blob = await canvasBlob(canvas, 0.92);
			for (let q = 0.85; blob && blob.size / 1024 > targetKb && q >= 0.3; q -= 0.12) blob = await canvasBlob(canvas, q);
			if (blob) { best = blob; if (blob.size / 1024 <= targetKb) return { blob, url: URL.createObjectURL(blob), kb: Math.round(blob.size / 102.4) / 10, w, h }; }
			scale *= 0.82;
		}
		if (!best) throw new Error('Image process nahi ho payi');
		return { blob: best, url: URL.createObjectURL(best), kb: Math.round(best.size / 102.4) / 10, w: 0, h: 0 };
	}
	const kbOf = (f: File) => Math.round(f.size / 102.4) / 10;

	// ---------- resize tool ----------
	let resizeFile = $state<File | null>(null);
	let resizeTarget = $state(50);
	let resizeMaxDim = $state(400);
	let resizeOut = $state<{ url: string; kb: number; w: number; h: number } | null>(null);
	let resizeBusy = $state(false);
	async function runResize() {
		if (!resizeFile) return;
		resizeBusy = true;
		try { resizeOut = await shrinkToTargetKb(resizeFile, resizeTarget, resizeMaxDim); } finally { resizeBusy = false; }
	}
	// ---------- compress tool ----------
	let compFile = $state<File | null>(null);
	let compTarget = $state(100);
	let compOut = $state<{ url: string; kb: number; w: number; h: number } | null>(null);
	let compBusy = $state(false);
	async function runCompress() {
		if (!compFile) return;
		compBusy = true;
		try { compOut = await shrinkToTargetKb(compFile, compTarget, 4000); } finally { compBusy = false; }
	}
	// ---------- age ----------
	let dob = $state('');
	let age = $state<AgeResult | null>(null);
	let ageError = $state('');
	function runAge() {
		ageError = '';
		age = dob ? calculateAge(dob) : null;
		if (!age) ageError = 'Sahi janm tithi chunein — bhavishya ki date nahi chalegi.';
	}
	// ---------- EMI ----------
	let principal = $state(100000);
	let rate = $state(11);
	let months = $state(24);
	const emi = $derived(calculateEmi(principal || 0, rate || 0, months || 0) as EmiResult | null);
	// ---------- images to PDF ----------
	let pdfUrls = $state<string[]>([]);
	function onPdfFiles(e: Event) {
		const files = (e.target as HTMLInputElement).files;
		if (files) pdfUrls = [...files].map((f) => URL.createObjectURL(f));
	}
	const inputCls = 'mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3';
	const labelCls = 'font-bold text-slate-900';
</script>
<svelte:head>
	<title>Free Online Tools — Photo Resize, Age Calculator, EMI Calculator | Apna CSC Gaya</title>
	<meta name="description" content="Muft tools: photo/signature ko KB me resize karo, image compress karo, umr aur EMI hisaab karo, photo se PDF banao. Sab browser me hota hai — file kahin upload nahi hoti." />
</svelte:head>
<style>
	@media print {
		:global(body *) { visibility: hidden; }
		:global(.pdf-area), :global(.pdf-area *) { visibility: visible; }
		:global(.pdf-area) { position: absolute; inset: 0; display: block !important; }
		:global(.pdf-area img) { width: 100%; page-break-after: always; }
	}
</style>
<main id="main">
	<PageHero eyebrow="Free Tools · {sectionHindi.tools}" title="Muft Tools — Form Ka Kaam Ghar Baithe Taiyaar" text="Photo resize, image compress, umr aur EMI ka hisaab — sab kuch browser me hota hai. Aapki file hamare server par kabhi jaati hi nahi." />
	<div class="mx-auto max-w-6xl px-4 pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Free Tools' }]} /></div>

	<section class="mx-auto max-w-6xl px-4 py-8" aria-label="Tools list">
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each toolsList as t (t.id)}
				<a href="#{t.id}" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-700 hover:shadow-md">
					<h2 class="font-display text-lg font-bold text-slate-900">{t.name}</h2>
					<p class="text-sm font-semibold text-teal-800">{t.hindi}</p>
					<p class="mt-2 text-sm leading-relaxed text-slate-700">{t.text}</p>
				</a>
			{/each}
			<a href="/track-status" class="rounded-2xl bg-teal-950 p-5 text-white transition hover:bg-teal-900">
				<h2 class="font-display text-lg font-bold">Status Check Links</h2>
				<p class="text-sm font-semibold text-amber-300">स्थिति जाँचें</p>
				<p class="mt-2 text-sm leading-relaxed text-teal-100">PAN, Aadhaar, PM-Kisan, PNR — sab official status link ek jagah.</p>
			</a>
		</div>
	</section>

	<div class="mx-auto grid max-w-6xl gap-6 px-4 pb-12 lg:grid-cols-2">
		<section id="photo-resize" class="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="resize-h">
			<h2 id="resize-h" class="font-display text-2xl font-black text-slate-900">Photo / Signature Resize (KB me)</h2>
			<p class="mt-1 text-sm font-semibold text-teal-800">फ़ोटो / हस्ताक्षर का आकार बदलें</p>
			<div class="mt-4 grid gap-4 sm:grid-cols-3">
				<div class="sm:col-span-3"><label class={labelCls} for="resize-file">Photo ya signature chunein</label><input id="resize-file" type="file" accept="image/*" class={inputCls} onchange={(e) => { resizeFile = (e.target as HTMLInputElement).files?.[0] ?? null; resizeOut = null; }} />{#if resizeFile}<p class="mt-1 text-sm text-slate-600">Original size: {kbOf(resizeFile)} KB</p>{/if}</div>
				<div><label class={labelCls} for="resize-target">Target size (KB)</label><input id="resize-target" type="number" min="5" max="500" bind:value={resizeTarget} class={inputCls} /></div>
				<div><label class={labelCls} for="resize-dim">Max chaudi/unchai (px)</label><input id="resize-dim" type="number" min="50" max="2000" step="10" bind:value={resizeMaxDim} class={inputCls} /></div>
				<div class="flex items-end"><button type="button" onclick={runResize} disabled={!resizeFile || resizeBusy} class="min-h-12 w-full rounded-xl bg-teal-800 px-4 py-3 font-bold text-white hover:bg-teal-900 disabled:opacity-50">{resizeBusy ? 'Ho raha hai…' : 'Resize Karo'}</button></div>
			</div>
			{#if resizeOut}
				<div class="mt-4 flex items-center gap-4 rounded-2xl bg-teal-50 p-4" role="status">
					<img src={resizeOut.url} alt="Resize hua parinaam" class="h-20 w-20 rounded-lg object-cover" />
					<p class="text-sm font-semibold text-slate-900">Taiyaar! Naya size: {resizeOut.kb} KB{#if resizeOut.w} · {resizeOut.w}×{resizeOut.h} px{/if}<br /><a href={resizeOut.url} download="resized-photo.jpg" class="mt-1 inline-block font-bold text-teal-900 underline">Download Karo ↓</a></p>
				</div>
			{/if}
			<details class="mt-5">
				<summary class="cursor-pointer font-bold text-teal-900">Kaun se exam me kitna size? (Guide)</summary>
				<div class="mt-3 overflow-x-auto">
					<table class="w-full min-w-130 text-left text-sm">
						<thead><tr class="border-b border-slate-200"><th class="py-2 pr-3">Exam / Form</th><th class="py-2 pr-3">Photo</th><th class="py-2 pr-3">Signature</th><th class="py-2">Size Limit</th></tr></thead>
						<tbody>{#each photoSizeGuide as g (g.exam)}<tr class="border-b border-slate-100"><td class="py-2 pr-3 font-semibold">{g.exam}</td><td class="py-2 pr-3">{g.photo}</td><td class="py-2 pr-3">{g.signature}</td><td class="py-2">{g.maxKb}</td></tr>{/each}</tbody>
					</table>
				</div>
				<p class="mt-2 text-xs text-slate-600">Note: Aakhiri niyam hamesha official notification ke hi maanein — guide lagbhag (approximate) hai.</p>
			</details>
		</section>

		<section id="compress" class="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="compress-h">
			<h2 id="compress-h" class="font-display text-2xl font-black text-slate-900">Image Compressor</h2>
			<p class="mt-1 text-sm font-semibold text-teal-800">इमेज छोटा करें</p>
			<div class="mt-4 grid gap-4 sm:grid-cols-2">
				<div class="sm:col-span-2"><label class={labelCls} for="comp-file">Image chunein</label><input id="comp-file" type="file" accept="image/*" class={inputCls} onchange={(e) => { compFile = (e.target as HTMLInputElement).files?.[0] ?? null; compOut = null; }} />{#if compFile}<p class="mt-1 text-sm text-slate-600">Original size: {kbOf(compFile)} KB</p>{/if}</div>
				<div><label class={labelCls} for="comp-target">Target size (KB)</label><input id="comp-target" type="number" min="10" max="2000" bind:value={compTarget} class={inputCls} /></div>
				<div class="flex items-end"><button type="button" onclick={runCompress} disabled={!compFile || compBusy} class="min-h-12 w-full rounded-xl bg-teal-800 px-4 py-3 font-bold text-white hover:bg-teal-900 disabled:opacity-50">{compBusy ? 'Ho raha hai…' : 'Compress Karo'}</button></div>
			</div>
			{#if compOut}
				<div class="mt-4 flex items-center gap-4 rounded-2xl bg-teal-50 p-4" role="status">
					<img src={compOut.url} alt="Compress hua parinaam" class="h-20 w-20 rounded-lg object-cover" />
					<p class="text-sm font-semibold text-slate-900">Taiyaar! Naya size: {compOut.kb} KB<br /><a href={compOut.url} download="compressed-image.jpg" class="mt-1 inline-block font-bold text-teal-900 underline">Download Karo ↓</a></p>
				</div>
			{/if}
			<p class="mt-4 flex gap-2 text-sm leading-relaxed text-slate-700"><Icon name="shield" class="mt-0.5 h-5 w-5 shrink-0 text-teal-800" />Privacy: dono image tools poori tarah aapke phone/computer ke browser me chalte hain. Koi file internet par upload nahi hoti.</p>
		</section>

		<section id="age" class="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="age-h">
			<h2 id="age-h" class="font-display text-2xl font-black text-slate-900">Age Calculator</h2>
			<p class="mt-1 text-sm font-semibold text-teal-800">उम्र कैलकुलेटर — नौकरी फ़ॉर्म की उम्र-सीमा जाँचें</p>
			<div class="mt-4 grid gap-4 sm:grid-cols-2">
				<div><label class={labelCls} for="dob">Janm tithi (Date of Birth)</label><input id="dob" type="date" bind:value={dob} class={inputCls} /></div>
				<div class="flex items-end"><button type="button" onclick={runAge} class="min-h-12 w-full rounded-xl bg-teal-800 px-4 py-3 font-bold text-white hover:bg-teal-900">Umr Nikalo</button></div>
			</div>
			{#if ageError}<p class="mt-3 font-semibold text-red-800" role="alert">{ageError}</p>{/if}
			{#if age}
				<div class="mt-4 rounded-2xl bg-teal-50 p-4" role="status">
					<p class="font-display text-xl font-black text-slate-900">Aaj ki umr: {age.years} saal, {age.months} mahina, {age.days} din</p>
					<p class="mt-1 text-sm text-slate-700">Kul {age.totalDays.toLocaleString('en-IN')} din. Form me "age as on" wali date se hisaab karna ho to dukaan par muft me check kara lo.</p>
				</div>
			{/if}
		</section>

		<section id="emi" class="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="emi-h">
			<h2 id="emi-h" class="font-display text-2xl font-black text-slate-900">EMI Calculator</h2>
			<p class="mt-1 text-sm font-semibold text-teal-800">किस्त कैलकुलेटर — लोन लेने से पहले हिसाब</p>
			<div class="mt-4 grid gap-4 sm:grid-cols-3">
				<div><label class={labelCls} for="principal">Loan rakam (₹)</label><input id="principal" type="number" min="0" step="1000" bind:value={principal} class={inputCls} /></div>
				<div><label class={labelCls} for="rate">Byaj dar (% / saal)</label><input id="rate" type="number" min="0" step="0.1" bind:value={rate} class={inputCls} /></div>
				<div><label class={labelCls} for="months">Samay (mahine)</label><input id="months" type="number" min="1" max="360" bind:value={months} class={inputCls} /></div>
			</div>
			{#if emi}
				<div class="mt-4 grid gap-3 rounded-2xl bg-teal-50 p-4 text-center sm:grid-cols-3" role="status">
					<p><span class="block text-xs font-bold uppercase tracking-wide text-teal-900">Mahina Kist (EMI)</span><strong class="font-display text-2xl font-black text-slate-900">{inr(emi.emi)}</strong></p>
					<p><span class="block text-xs font-bold uppercase tracking-wide text-teal-900">Kul Byaj</span><strong class="font-display text-2xl font-black text-slate-900">{inr(emi.totalInterest)}</strong></p>
					<p><span class="block text-xs font-bold uppercase tracking-wide text-teal-900">Kul Bhugtan</span><strong class="font-display text-2xl font-black text-slate-900">{inr(emi.totalPayment)}</strong></p>
				</div>
			{/if}
			<p class="mt-3 text-xs leading-relaxed text-slate-600">Ye sirf ek anumaan hai — asal EMI bank ke niyam, processing fee aur byaj dar badalne se alag ho sakti hai. KCC loan ki sahi jaankari ke liye <a class="font-bold text-teal-900 underline" href="/services/kisan-credit-card">Kisan Credit Card page</a> dekho.</p>
		</section>

		<section id="images-pdf" class="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2" aria-labelledby="pdf-h">
			<h2 id="pdf-h" class="font-display text-2xl font-black text-slate-900">Images to PDF</h2>
			<p class="mt-1 text-sm font-semibold text-teal-800">फ़ोटो से PDF बनाएँ</p>
			<p class="mt-2 text-sm leading-relaxed text-slate-700">Documents ki photo chunein, phir "PDF Banao" dabakar print wale screen par "Save as PDF" chunein — har photo ek page par aayegi.</p>
			<div class="mt-4 grid gap-4 sm:grid-cols-2">
				<div><label class={labelCls} for="pdf-files">Photos chunein (ek se zyada chalegi)</label><input id="pdf-files" type="file" accept="image/*" multiple class={inputCls} onchange={onPdfFiles} /></div>
				<div class="flex items-end"><button type="button" onclick={() => window.print()} disabled={!pdfUrls.length} class="min-h-12 w-full rounded-xl bg-teal-800 px-4 py-3 font-bold text-white hover:bg-teal-900 disabled:opacity-50">PDF Banao / Print Karo</button></div>
			</div>
			{#if pdfUrls.length}
				<div class="mt-4 flex flex-wrap gap-3">{#each pdfUrls as u, i (u)}<img src={u} alt="PDF ke liye chuni gayi file {i + 1}" class="h-24 w-20 rounded-lg object-cover" />{/each}</div>
			{/if}
		</section>
	</div>
	<div class="pdf-area" style="display:none" aria-hidden="true">
		{#each pdfUrls as u, i (u)}<img src={u} alt="" />{/each}
	</div>
</main>
