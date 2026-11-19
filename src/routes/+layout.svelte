<script lang="ts">
	import '../app.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { site, whatsappLink } from '#lib/site.ts';
	let { children } = $props();
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: site.name,
		description: site.description,
		url: site.url,
		email: site.contact.email,
		telephone: site.contact.phone,
		priceRange: '₹₹',
		address: { '@type': 'PostalAddress', streetAddress: 'Shop No. 12, Main Bazaar Road, Near Bus Stand', addressLocality: 'Gaya', addressRegion: 'Bihar', postalCode: '823001', addressCountry: 'IN' },
		openingHours: ['Mo-Sa 09:00-20:00', 'Su 10:00-14:00'],
		aggregateRating: { '@type': 'AggregateRating', ratingValue: site.rating, reviewCount: site.reviewCount }
	};
</script>
<svelte:head>
	<title>{site.name} — {site.tagline} | CSC & Cyber Cafe, Gaya</title>
	<meta name="description" content={site.description} />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{site.name} — {site.tagline}" />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={site.url} />
	<meta property="og:locale" content="en_IN" />
	<meta property="og:image" content="{site.url}/images/shop-front-1200.jpg" />
	<meta property="og:image:alt" content="Apna Digital Seva Kendra — CSC & Cyber Cafe, Gaya" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{site.name} — {site.tagline}" />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content="{site.url}/images/shop-front-1200.jpg" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-3 focus:font-bold focus:text-slate-950">Skip to content</a>
<Header />
{@render children()}
<Footer />
<aside aria-label="WhatsApp quick contact">
<a href={whatsappLink('Namaste! Mujhe ek service ke baare me jaankari chahiye.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp par baat karo" class="fixed bottom-20 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-green-700 text-white shadow-lg hover:bg-green-800 lg:bottom-6">
	<Icon name="chat" class="h-7 w-7" />
</a>
</aside>
<nav aria-label="Quick contact" class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-300 bg-white text-center shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden">
	<a href="tel:{site.contact.phoneHref}" class="flex min-h-12 flex-col items-center justify-center gap-0.5 py-2 text-xs font-bold text-slate-900"><Icon name="phone" class="h-5 w-5 text-teal-800" />Call</a>
	<a href={whatsappLink('Namaste! Mujhe ek service ke baare me jaankari chahiye.')} target="_blank" rel="noopener noreferrer" class="flex min-h-12 flex-col items-center justify-center gap-0.5 py-2 text-xs font-bold text-slate-900"><Icon name="chat" class="h-5 w-5 text-green-700" />WhatsApp</a>
	<a href="/enquiry" class="flex min-h-12 flex-col items-center justify-center gap-0.5 py-2 text-xs font-bold text-slate-900"><Icon name="form" class="h-5 w-5 text-amber-600" />Enquiry</a>
</nav>
