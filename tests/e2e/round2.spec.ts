import { expect, test } from '@playwright/test';

test('offers page lists mock offers with validity and claim CTA', async ({ page }) => {
	await page.goto('/offers');
	await page.waitForLoadState('networkidle');
	await expect(page.getByRole('heading', { name: /Is Mahine Ke Khaas Offers/ })).toBeVisible();
	await expect(page.getByText(/PVC Card Combo/)).toBeVisible();
	await expect(page.getByText(/31 Dec 2026/).first()).toBeVisible();
	await expect(page.getByRole('link', { name: /WhatsApp Par Claim Karo/ }).first()).toBeVisible();
});

test('student zone aggregates scholarship/admission services and updates', async ({ page }) => {
	await page.goto('/student-zone');
	await page.waitForLoadState('networkidle');
	await expect(page.getByRole('heading', { name: /Student Zone/ }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: /Scholarship Form Filling/ }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: /Photo \/ Signature Resize/ })).toBeVisible();
});

test('kisan corner aggregates PM-Kisan, KCC, fasal bima and status links', async ({ page }) => {
	await page.goto('/kisan-corner');
	await page.waitForLoadState('networkidle');
	await expect(page.getByRole('heading', { name: /Kisan Corner/ }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: /PM Fasal Bima/ }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: /Official Website Par Check Karo/ }).first()).toBeVisible();
});

test('tools: UPI QR generator produces a QR image', async ({ page }) => {
	await page.goto('/tools');
	await page.waitForLoadState('networkidle');
	await page.getByLabel(/UPI ID/).fill('9876543210@paytm');
	await page.getByLabel(/Naam \(jisko paisa milega\)/).fill('Test Kumar');
	await page.getByRole('button', { name: 'QR Banao' }).click();
	const qr = page.getByAltText('Aapka UPI QR code');
	await expect(qr).toBeVisible();
	await expect(qr).toHaveAttribute('src', /data:image\/png/);
});

test('tools: GST calculator splits inclusive GST', async ({ page }) => {
	await page.goto('/tools');
	await page.waitForLoadState('networkidle');
	await page.getByLabel(/Rakam \(₹\)/).fill('1180');
	await page.getByLabel(/GST Slab/).selectOption('18');
	await page.getByLabel(/Hisaab Ka Tarika/).selectOption('included');
	await expect(page.getByText('₹1,000').first()).toBeVisible();
});

test('enquiry with preferred date and slot shows slot in confirmation', async ({ page }) => {
	await page.goto('/enquiry');
	await page.waitForLoadState('networkidle');
	await page.getByLabel(/Kaunsi service/).selectOption('pan-new');
	await page.getByLabel(/Aapka naam/).fill('Slot Kumar');
	await page.getByLabel(/Mobile number/).fill('9876543210');
	// pick a future date (next month, day 15) in local time
	const d = new Date();
	d.setMonth(d.getMonth() + 1);
	d.setDate(15);
	const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-15`;
	await page.getByLabel(/Kab aaoge/).fill(iso);
	await page.getByLabel(/Time slot/).selectOption('09-11');
	await page.getByRole('button', { name: /Enquiry Bhejo/ }).click();
	await expect(page.getByRole('status')).toContainText('APNA-');
	await expect(page.getByRole('status')).toContainText('Subah 9');
});

test('PWA manifest and theme-color are present', async ({ page, request }) => {
	const res = await request.get('/manifest.webmanifest');
	expect(res.ok()).toBeTruthy();
	const manifest = await res.json();
	expect(manifest.short_name).toBe('Apna CSC');
	expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
	await page.goto('/');
	const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
	expect(themeColor).toBe('#042f2e');
});

test('back-to-top appears after scroll and does not overlap the mobile bar', async ({ page }) => {
	await page.setViewportSize({ width: 360, height: 800 });
	await page.goto('/');
	await page.evaluate(() => window.scrollTo(0, 3000));
	const btt = page.locator('[data-backtotop]');
	await expect(btt).toBeVisible();
	const box = await btt.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.x).toBeLessThan(60); // left side, WhatsApp float is on the right
});

test('no horizontal scroll on new pages at 360px', async ({ page }) => {
	await page.setViewportSize({ width: 360, height: 800 });
	for (const path of ['/offers', '/student-zone', '/kisan-corner', '/tools']) {
		await page.goto(path);
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
		expect(overflow, path).toBeLessThanOrEqual(0);
	}
});
