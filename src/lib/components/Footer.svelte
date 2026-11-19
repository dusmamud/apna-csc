<script lang="ts">
	import { categories, footer, portals, site } from '#lib/site.ts';
	import Icon from '#lib/components/Icon.svelte';
</script>
<footer class="bg-slate-950 pb-24 text-slate-200 lg:pb-0">
	<div class="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
		<div>
			<p class="font-display text-xl font-black text-white">{site.name}</p>
			<p class="mt-1 font-semibold text-amber-300">{site.tagline}</p>
			<p class="mt-3 text-sm leading-relaxed">{site.contact.address}</p>
			<p class="mt-2 text-sm">Owner / VLE: {site.owner} · CSC ID: {site.cscId} (mock)</p>
			<p class="mt-3 flex items-center gap-2 text-sm"><Icon name="star" class="h-5 w-5 text-amber-400" /><strong class="text-white">{site.rating}/5</strong> · {site.reviewCount} Google reviews (mock)</p>
		</div>
		<nav aria-label="Services">
			<p class="font-display font-bold text-white">Services</p>
			<ul class="mt-3 space-y-2 text-sm">
				{#each categories as c (c.slug)}<li><a class="hover:text-amber-300" href="/services?cat={c.slug}">{c.name}</a></li>{/each}
			</ul>
		</nav>
		<nav aria-label="Useful pages">
			<p class="font-display font-bold text-white">Kaam ke Pages</p>
			<ul class="mt-3 space-y-2 text-sm">
				<li><a class="hover:text-amber-300" href="/online-forms">Online Forms</a></li>
				<li><a class="hover:text-amber-300" href="/updates">Latest Jobs, Admit Card, Results</a></li>
				<li><a class="hover:text-amber-300" href="/pricing">Rate Chart / Pricing</a></li>
				<li><a class="hover:text-amber-300" href="/schemes">Sarkari Yojana</a></li>
				<li><a class="hover:text-amber-300" href="/banking">Banking & AePS</a></li>
				<li><a class="hover:text-amber-300" href="/enquiry">Online Enquiry</a></li>
				<li><a class="hover:text-amber-300" href="/track-status">Track Status / Status Check</a></li>
				<li><a class="hover:text-amber-300" href="/tools">Free Tools — Photo Resize, Age/EMI Calculator</a></li>
				<li><a class="hover:text-amber-300" href="/downloads">Downloads — Forms & Checklists</a></li>
				<li><a class="hover:text-amber-300" href="/blog">Blog / Guides (Hinglish)</a></li>
				<li><a class="hover:text-amber-300" href="/faq">FAQ</a></li>
				<li><a class="hover:text-amber-300" href="/privacy">Privacy Policy</a></li>
				<li><a class="hover:text-amber-300" href="/terms">Terms & Disclaimer</a></li>
			</ul>
		</nav>
		<nav aria-label="Official portals">
			<p class="font-display font-bold text-white">Official Sarkari Portals</p>
			<ul class="mt-3 space-y-2 text-sm">
				{#each portals as p (p.href)}<li><a class="hover:text-amber-300" href={p.href} target="_blank" rel="noopener noreferrer">{p.name} ↗</a></li>{/each}
			</ul>
			<p class="mt-4 text-sm leading-relaxed"><Icon name="phone" class="mr-1 inline h-4 w-4 text-amber-300" />{site.contact.phone}<br /><Icon name="mail" class="mr-1 inline h-4 w-4 text-amber-300" />{site.contact.email}</p>
		</nav>
	</div>
	<div class="border-t border-slate-800">
		<div class="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-slate-300">
			<p><strong class="text-amber-300">Disclaimer:</strong> {site.disclaimer}</p>
			<p class="mt-3">{footer.note}</p>
			<p class="mt-1">{footer.copyright}</p>
		</div>
	</div>
</footer>
