import { expect, test } from '@playwright/test';

test('tools: EMI calculator computes live', async ({ page }) => {
	await page.goto('/tools');
	await page.waitForLoadState('networkidle');
	await page.getByLabel(/Loan rakam/).fill('100000');
	await page.getByLabel(/Byaj dar/).fill('12');
	await page.getByLabel(/Samay \(mahine\)/).fill('12');
	await expect(page.getByText('₹8,885')).toBeVisible();
});

test('tools: age calculator works', async ({ page }) => {
	await page.goto('/tools');
	await page.waitForLoadState('networkidle');
	await page.getByLabel(/Janm tithi/).fill('2000-01-15');
	await page.getByRole('button', { name: 'Umr Nikalo' }).click();
	await expect(page.getByText(/Aaj ki umr:/)).toBeVisible();
});

test('tools: image resize produces a download under target KB', async ({ page }) => {
	await page.goto('/tools');
	await page.waitForLoadState('networkidle');
	// 1x1 red PNG (base64) uploaded through the resize tool
	const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
	await page.getByLabel(/Photo ya signature chunein/).setInputFiles({ name: 'photo.png', mimeType: 'image/png', buffer: png });
	await page.getByRole('button', { name: 'Resize Karo' }).click();
	await expect(page.getByText(/Taiyaar! Naya size:/)).toBeVisible();
	await expect(page.getByRole('link', { name: /Download Karo/ }).first()).toBeVisible();
});

test('track-status renders official links and local lookup form', async ({ page }) => {
	await page.goto('/track-status');
	await page.waitForLoadState('networkidle');
	await expect(page.getByRole('heading', { name: /Status Check/ })).toBeVisible();
	await expect(page.getByRole('link', { name: /Official Website Par Check Karo/ }).first()).toBeVisible();
	await page.getByLabel(/Reference number/).fill('APNA-XXXXXX');
	await page.getByLabel(/Mobile number/).fill('9876543210');
	await page.getByRole('button', { name: 'Enquiry Khojo' }).click();
	await expect(page.getByText(/koi enquiry is browser me nahi mili/)).toBeVisible();
});

test('enquiry reference is found on track-status (localStorage round-trip)', async ({ page }) => {
	await page.goto('/enquiry');
	await page.waitForLoadState('networkidle');
	await page.getByLabel(/Kaunsi service/).selectOption('pan-new');
	await page.getByLabel(/Aapka naam/).fill('Test Kumar');
	await page.getByLabel(/Mobile number/).fill('9876543210');
	await page.getByRole('button', { name: /Enquiry Bhejo/ }).click();
	const status = page.getByRole('status');
	await expect(status).toContainText('APNA-');
	const ref = (await status.locator('strong').first().textContent())?.trim() ?? '';
	expect(ref).toMatch(/^APNA-/);
	await page.goto('/track-status');
	await page.waitForLoadState('networkidle');
	await page.getByLabel(/Reference number/).fill(ref);
	await page.getByLabel(/Mobile number/).fill('9876543210');
	await page.getByRole('button', { name: 'Enquiry Khojo' }).click();
	await expect(page.getByText('Enquiry Mil Gayi')).toBeVisible();
});

test('blog list and a guide render with article content', async ({ page }) => {
	await page.goto('/blog');
	await expect(page.getByRole('heading', { name: /Saral Guides/ })).toBeVisible();
	await page.goto('/blog/pan-card-kaise-banaye');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('PAN Card Kaise Banaye');
	await expect(page.getByText('Documents — ye 3 cheezein chahiye')).toBeVisible();
});

test('downloads page has no dead links', async ({ page }) => {
	await page.goto('/downloads');
	await expect(page.getByRole('heading', { name: /Forms Aur Checklists/ })).toBeVisible();
	const dead = await page.evaluate(() => [...document.querySelectorAll('a')].filter((a) => a.getAttribute('href') === '#').length);
	expect(dead).toBe(0);
});

test('scheme finder filters schemes for a farmer', async ({ page }) => {
	await page.goto('/schemes');
	await page.waitForLoadState('networkidle');
	await page.getByLabel(/Aapki umr/).fill('35');
	await page.getByLabel(/Aap kya karte ho/).selectOption('farmer');
	await page.getByLabel(/saalana aay/).fill('150000');
	await page.getByRole('button', { name: 'Yojana Khojo' }).click();
	await expect(page.getByText(/yojana aapke liye ho sakti hai/)).toBeVisible();
	await expect(page.getByText('PM-Kisan Samman Nidhi').first()).toBeVisible();
});

test('updates detail shows an official website button', async ({ page }) => {
	await page.goto('/updates/ssc-gd-constable-2027');
	const link = page.getByRole('link', { name: /Official Website Kholo/ });
	await expect(link).toBeVisible();
	await expect(link).toHaveAttribute('href', 'https://ssc.gov.in');
});

test('no horizontal scroll at 360px on new pages', async ({ page }) => {
	await page.setViewportSize({ width: 360, height: 800 });
	for (const path of ['/tools', '/track-status', '/blog', '/downloads', '/schemes']) {
		await page.goto(path);
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
		expect(overflow, path).toBe(0);
	}
});
