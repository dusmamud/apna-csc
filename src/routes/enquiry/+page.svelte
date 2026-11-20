<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { enquirySlots, getService, services, site, slotLabel, whatsappLink } from '#lib/site.ts';
	let serviceSlug = $state('');
	$effect(() => { const s = new URLSearchParams(window.location.search).get('service'); if (s) serviceSlug = s; });
	let name = $state('');
	let mobile = $state('');
	let visitDate = $state('');
	let slot = $state('');
	let note = $state('');
	const todayISO = new Date().toISOString().slice(0, 10);
	let errors = $state<Record<string, string>>({});
	let reference = $state('');
	const selected = $derived(serviceSlug ? getService(serviceSlug) : undefined);
	const waMessage = $derived(`Namaste! Main ${name || '___'} (${mobile || '___'}). Mujhe "${selected?.name ?? 'ek service'}" karwana hai.${visitDate ? ` Main ${visitDate} ko ${slot ? slotLabel(slot) + ' ' : ''}aana chahta/chahti hu.` : ''} ${note}`.trim());
	function submit(e: SubmitEvent) {
		e.preventDefault();
		const next: Record<string, string> = {};
		if (name.trim().length < 3) next.name = 'Apna sahi naam likhein (kam se kam 3 akshar).';
		if (!/^[6-9]\d{9}$/.test(mobile.trim())) next.mobile = '10 anko ka sahi Bharatiya mobile number likhein.';
		if (!serviceSlug) next.service = 'Kaunsi service chahiye, chunein.';
		if (visitDate && visitDate < todayISO) next.visitDate = 'Beeti hui taareekh nahi chalegi — aaj ya aage ki date chunein.';
		if (visitDate && !slot) next.slot = 'Aane ka samay (slot) bhi chunein.';
		errors = next;
		if (Object.keys(next).length) return;
		reference = `APNA-${Math.abs([...(name + mobile)].reduce((a, c) => a * 31 + c.charCodeAt(0) | 0, 7)).toString(36).toUpperCase().padStart(6, '0')}`;
		try {
			const raw = localStorage.getItem('apna-enquiries');
			const list = raw ? JSON.parse(raw) : [];
			list.push({ reference, name: name.trim(), mobile: mobile.trim(), serviceName: selected?.name ?? serviceSlug, date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), visitDate: visitDate || null, slot: slot ? slotLabel(slot) : null });
			localStorage.setItem('apna-enquiries', JSON.stringify(list.slice(-10)));
		} catch { /* private mode — confirmation still works */ }
	}
</script>
<svelte:head><title>Online Enquiry — Apna Digital Seva Kendra Gaya</title><meta name="description" content="Service chuno, naam-mobile bharo — hum call / WhatsApp par documents aur total kharcha bata denge." /></svelte:head>
<main id="main">
	<PageHero eyebrow="Enquiry" title="Online Enquiry — Jawaab Phone Par" text="Form bharo, hum sampark karenge. Ya seedha WhatsApp kar do — jo asaan lage." />
	<section class="mx-auto max-w-3xl px-4 py-10">
		{#if reference}
			<div class="rounded-3xl border-2 border-teal-700 bg-teal-50 p-8 text-center" role="status">
				<Icon name="check" class="mx-auto h-12 w-12 text-teal-800" />
				<h2 class="mt-3 font-display text-2xl font-black text-slate-900">Enquiry Mil Gayi, {name.split(' ')[0]} Ji!</h2>
				<p class="mt-2 leading-relaxed text-slate-800">Aapka reference number: <strong class="rounded bg-white px-2 py-1 text-teal-900">{reference}</strong></p>
				{#if visitDate}<p class="mt-3 inline-block rounded-xl bg-white px-4 py-2.5 font-bold text-teal-900">Aapka chuna samay: {new Date(visitDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}{slot ? ` · ${slotLabel(slot)}` : ''}</p>{/if}
				<p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-700">Apna reference number note kar lo — <a class="font-bold text-teal-900 underline" href="/track-status">Track Status page</a> par isi browser me apni enquiry dobara dekh sakte ho. Ye ek mock (demo) confirmation hai — asli website par ye enquiry seedha dukaan ke WhatsApp / email par jayegi. Hum dukaan ke samay me <strong>{mobile}</strong> par sampark karenge.</p>
				<p class="mt-5 flex flex-wrap justify-center gap-3">
					<a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-12 items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"><Icon name="chat" class="h-5 w-5" />WhatsApp par Bhi Bhej Do</a>
					<a href="/track-status" class="inline-flex min-h-12 items-center rounded-xl border-2 border-teal-800 px-5 py-3 font-bold text-teal-900">Track Your Enquiry</a>
					<a href="/services" class="inline-flex min-h-12 items-center rounded-xl border-2 border-teal-800 px-5 py-3 font-bold text-teal-900">Aur Services Dekho</a>
				</p>
			</div>
		{:else}
			<form onsubmit={submit} novalidate class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<div>
					<label for="service" class="font-bold text-slate-900">Kaunsi service chahiye? *</label>
					<select id="service" bind:value={serviceSlug} class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" aria-invalid={!!errors.service} aria-describedby={errors.service ? 'err-service' : undefined}>
						<option value="">— Service chunein —</option>
						{#each services as s (s.slug)}<option value={s.slug}>{s.name}</option>{/each}
					</select>
					{#if errors.service}<p id="err-service" class="mt-1.5 text-sm font-semibold text-red-800">{errors.service}</p>{/if}
				</div>
				{#if selected}
					<div class="mt-4 rounded-2xl bg-teal-50 p-4">
						<p class="font-bold text-slate-900">{selected.name} — {selected.price > 0 ? `₹${selected.price.toLocaleString('en-IN')} ${selected.priceNote}` : selected.priceNote} · {selected.duration}</p>
						<p class="mt-2 text-sm font-semibold text-slate-800">Ye documents taiyaar rakhein:</p>
						<ul class="mt-1.5 space-y-1 text-sm text-slate-700">{#each selected.documents as d (d)}<li class="flex gap-2"><Icon name="check" class="mt-0.5 h-4 w-4 shrink-0 text-teal-800" />{d}</li>{/each}</ul>
					</div>
				{/if}
				<div class="mt-5 grid gap-5 sm:grid-cols-2">
					<div><label for="name" class="font-bold text-slate-900">Aapka naam *</label><input id="name" bind:value={name} type="text" autocomplete="name" placeholder="Jaise: Ramesh Kumar" class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" aria-invalid={!!errors.name} />{#if errors.name}<p class="mt-1.5 text-sm font-semibold text-red-800">{errors.name}</p>{/if}</div>
					<div><label for="mobile" class="font-bold text-slate-900">Mobile number (WhatsApp wala) *</label><input id="mobile" bind:value={mobile} type="tel" inputmode="numeric" autocomplete="tel" placeholder="10 anko ka number" class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" aria-invalid={!!errors.mobile} />{#if errors.mobile}<p class="mt-1.5 text-sm font-semibold text-red-800">{errors.mobile}</p>{/if}</div>
				</div>
				<div class="mt-5 grid gap-5 sm:grid-cols-2">
					<div><label for="visit-date" class="font-bold text-slate-900">Kab aaoge? Date chuno (optional)</label><input id="visit-date" bind:value={visitDate} type="date" min={todayISO} class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" aria-invalid={!!errors.visitDate} />{#if errors.visitDate}<p class="mt-1.5 text-sm font-semibold text-red-800">{errors.visitDate}</p>{/if}</div>
					<div><label for="slot" class="font-bold text-slate-900">Time slot (date chuna to ye bhi)</label><select id="slot" bind:value={slot} class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" aria-invalid={!!errors.slot}>
						<option value="">— Slot chunein —</option>
						{#each enquirySlots as sl (sl.value)}<option value={sl.value}>{sl.label}</option>{/each}
					</select>{#if errors.slot}<p class="mt-1.5 text-sm font-semibold text-red-800">{errors.slot}</p>{/if}</div>
				</div>
				<p class="mt-2 text-sm text-slate-600">Slot sirf prathmikta (preference) hai — dukaan par pehle aao, pehle pao bhi chalta hai. Ravivaar dukaan 10–2 hi khulti hai.</p>
				<div class="mt-5"><label for="note" class="font-bold text-slate-900">Kuch aur batana hai? (optional)</label><textarea id="note" bind:value={note} rows="3" placeholder="Jaise: form ki last date 31 Dec hai, tatkal chahiye…" class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"></textarea></div>
				<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-800 px-5 py-3 font-bold text-white hover:bg-teal-900">Enquiry Bhejo <Icon name="arrow" class="h-5 w-5" /></button>
				<p class="mt-3 text-center text-sm text-slate-600">Submit karte hi mock confirmation milega. Dukaan ka number: <a class="font-bold text-teal-900 underline" href="tel:{site.contact.phoneHref}">{site.contact.phone}</a></p>
			</form>
		{/if}
	</section>
</main>
