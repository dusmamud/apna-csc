/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Minimal offline support for the static site (SvelteKit 3: $app/manifest).
// - Precache: built JS/CSS (immutable) + prerendered HTML pages (NOT static
//   images/fonts — those are runtime-cached on first use so install stays light).
// - Navigations: network first, fall back to cache, finally to cached home.
// - Other same-origin GETs: stale-while-revalidate.
// Cache name carries the build version, so every deploy replaces it cleanly.
import { immutable, prerendered } from '$app/manifest';
import { version } from '$app/env';

const worker = self as unknown as ServiceWorkerGlobalScope;
const CACHE = `apna-csc-${version}`;
const PRECACHE = [...immutable.map((f) => f.path), ...prerendered.map((p) => p.path)];

worker.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(PRECACHE))
			.then(() => worker.skipWaiting())
	);
});

worker.addEventListener('activate', (event: ExtendableEvent) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
			.then(() => worker.clients.claim())
	);
});

worker.addEventListener('fetch', (event: FetchEvent) => {
	const { request } = event;
	if (request.method !== 'GET') return;
	const url = new URL(request.url);
	if (url.origin !== worker.location.origin) return;

	if (request.mode === 'navigate') {
		event.respondWith(
			fetch(request)
				.then((response) => {
					const copy = response.clone();
					caches.open(CACHE).then((cache) => cache.put(request, copy));
					return response;
				})
				.catch(async () => {
					const cache = await caches.open(CACHE);
					return (await cache.match(request)) ?? (await cache.match('/')) ?? Response.error();
				})
		);
		return;
	}

	event.respondWith(
		caches.open(CACHE).then(async (cache) => {
			const cached = await cache.match(request);
			const network = fetch(request)
				.then((response) => {
					if (response.ok) cache.put(request, response.clone());
					return response;
				})
				.catch(() => cached);
			return cached ?? network;
		})
	);
});
