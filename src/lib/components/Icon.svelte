<script lang="ts">
	// Custom inline SVG icons only — 24x24 grid, 2px stroke, round caps.
	// One style across the site, no icon fonts, no CDN.
	type Props = { name: string; class?: string };
	let { name, class: className = 'h-6 w-6' }: Props = $props();
	const paths: Record<string, string> = {
		id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M6 16.5c.6-1.4 1.5-2 2.5-2s1.9.6 2.5 2M14 9.5h4M14 13h4"/>',
		certificate: '<rect x="4" y="3" width="16" height="14" rx="2"/><path d="M8 8h8M8 11.5h5"/><circle cx="16.5" cy="14.5" r="1.6"/><path d="M15.5 15.8 15 20l1.7-1 1.7 1-.5-4.2"/>',
		form: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h6M9 16h6M9 8h3"/>',
		landmark: '<path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18M3 17.5h18"/>',
		bank: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10.5h18"/><path d="M7 15.5h4"/>',
		ticket: '<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2.5 2.5 0 0 0 0 5v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a2.5 2.5 0 0 0 0-5z"/><path d="M13 7v2M13 11v2M13 15v2"/>',
		book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.7A1.7 1.7 0 0 0 5 19.7z"/><path d="M5 18.5V4.5M19 18H6.7A1.7 1.7 0 0 0 5 19.7V21h14z"/>',
		printer: '<path d="M7 8V3h10v5"/><rect x="4" y="8" width="16" height="8" rx="2"/><path d="M7 13h10v8H7z"/><circle cx="17" cy="11" r=".6"/>',
		phone: '<path d="M5 4h4l1.5 4.5L8 10a13 13 0 0 0 6 6l1.5-2.5L20 15v4a1.8 1.8 0 0 1-2 2A17 17 0 0 1 3 6a1.8 1.8 0 0 1 2-2"/>',
		chat: '<path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12z"/><path d="M8.5 10.5c.5 2.5 4.5 6 7 6.5l1-1.7-2.7-1.3-1 .8a8 8 0 0 1-2.5-2.5l.8-1L10.8 8.1z"/>',
		clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
		pin: '<path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
		mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>',
		check: '<path d="m4.5 12.5 5 5 10-11"/>',
		arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
		search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/>',
		star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
		shield: '<path d="M12 3 5 5.8v5.4c0 4.6 3 7.7 7 9.3 4-1.6 7-4.7 7-9.3V5.8z"/><path d="m9 11.5 2.2 2.2L15.5 9.5"/>',
		camera: '<rect x="3" y="7.5" width="18" height="12" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M9 7.5 10.5 4h3L15 7.5"/>',
		money: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10M15 9.2c-.6-.8-1.7-1.2-3-1.2-1.7 0-3 .9-3 2.2 0 2.9 6 1.5 6 4.3 0 1.3-1.3 2.2-3 2.2-1.3 0-2.4-.5-3-1.3"/>',
		user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M5 20c.8-3.4 3.6-5 7-5s6.2 1.6 7 5"/>',
		chevron: '<path d="m6 9 6 6 6-6"/>',
		doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>',
		wifi: '<path d="M3.5 10a13 13 0 0 1 17 0M6.5 13.5a8.5 8.5 0 0 1 11 0M9.6 17a4 4 0 0 1 4.8 0"/><circle cx="12" cy="19.8" r=".8"/>'
	};
	const body = $derived(paths[name] ?? paths.doc);
</script>
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} aria-hidden="true">{@html body}</svg>
