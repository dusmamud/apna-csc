# Apna Digital Seva Kendra — CSC & Cyber Cafe (Mock)

SvelteKit 3 / Svelte 5 (runes) / Tailwind 4 / adapter-static website for a mock
Bihar CSC & Cyber Cafe in Gaya. **All content is mock** and lives in ONE file:
`src/lib/site.ts` — swap it with real client data after design approval.

Mock business: Apna Digital Seva Kendra, Shop No. 12, Main Bazaar Road, Near
Bus Stand, Gaya, Bihar 823001 · Owner/VLE Rakesh Kumar · CSC ID BR1234567890.

## Run
```bash
npm install
npm run dev     # dev server
npm run build   # static build in build/
npm run preview # preview the build
npm run check   # svelte-check
npm test        # Vitest unit tests
npm run test:e2e # Playwright (needs preview/build via playwright config)
```

## Pages (world-class upgrade, Nov 2026)
Core: `/` (trust badges, partners strip, scheme-finder + tools teasers, count-up
stats, Google-style 4.8★ reviews summary), `/services` + 45 detail pages
(documents, govt-fee vs shop-charge split, FAQPage + BreadcrumbList schema),
`/online-forms`, `/updates` + detail (official portal button), `/pricing`
(print-friendly A4 rate chart + Print button), `/schemes` (interactive Scheme
Finder), `/banking`, `/print-services`, `/tickets`, `/enquiry` (mock reference
saved to localStorage), `/about`, `/gallery`, `/faq` (FAQPage schema),
`/reviews`, `/contact` (live Open Now status), `/privacy`, `/terms`.

New in the upgrade:
- `/tools` — working browser-only tools: Photo/Signature resize to target KB,
  Image Compressor, Images-to-PDF (print), Age Calculator, EMI Calculator
  (logic in `src/lib/tools.ts`, unit-tested).
- `/track-status` — official status-check directory (PAN, Aadhaar, PM-Kisan,
  RTPS, PNR…) + local enquiry lookup by reference + mobile.
- `/downloads` — printable rate list link, blank-form info and document
  checklists (no dead links).
- `/blog` + 4 Hinglish how-to guides (Article schema).

Motion: scroll reveals, hero entrance, count-ups and accordion animation use
the `motion` package (transform/opacity only, reduced-motion safe, no-JS
visible). Axe audit: `node scripts/audit.mjs` against a running preview —
0 violations on all audited pages. Screenshots: `scripts/screenshot-upgrade.mjs`
→ `screenshots/upgrade-*.png`. Note: Playwright uses port **4174** (4173 is
used by the happy-inn project on this machine).

## Images
Masters are PNG in `static/images/<stem>.png`; responsive AVIF/WebP/JPG/PNG at
480/800/1200/1600 are generated with `node scripts/convert-images.mjs
static/images/<stem>.png` (sharp). Every image renders via
`#lib/components/Picture.svelte`.

## Disclaimer
The shop shown is an independent digital assistance centre, NOT a government
office. Approvals/fees/timelines belong to the concerned government department.
