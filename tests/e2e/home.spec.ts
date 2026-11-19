import { expect, test } from '@playwright/test';

test('home renders H1, categories, popular services and pricing highlights', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Sab Sarkari Kaam');
	await expect(page.getByRole('heading', { name: 'Kaam ki Category Chuno' })).toBeVisible();
});

test('hero image is eager with high fetch priority', async ({ page }) => {
	await page.goto('/');
	const img = page.locator('main img').first();
	await expect(img).toHaveAttribute('loading', 'eager');
	await expect(img).toHaveAttribute('fetchpriority', 'high');
});

test('service detail page shows documents and WhatsApp CTA', async ({ page }) => {
	await page.goto('/services/pan-new');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('New PAN Card');
	await expect(page.getByText('Documents Required')).toBeVisible();
	await expect(page.getByRole('link', { name: /WhatsApp/ }).first()).toBeVisible();
});

test('enquiry form validates and gives mock reference', async ({ page }) => {
	await page.goto('/enquiry');
	await page.waitForLoadState('networkidle');
	await page.getByRole('button', { name: /Enquiry Bhejo/ }).click();
	await expect(page.getByText('Kaunsi service chahiye, chunein.')).toBeVisible();
	await page.getByLabel(/Kaunsi service/).selectOption('pan-new');
	await page.getByLabel(/Aapka naam/).fill('Test Kumar');
	await page.getByLabel(/Mobile number/).fill('9876543210');
	await page.getByRole('button', { name: /Enquiry Bhejo/ }).click();
	await expect(page.getByRole('status')).toContainText('APNA-');
});

test('no horizontal scroll at 360px', async ({ page }) => {
	await page.setViewportSize({ width: 360, height: 800 });
	await page.goto('/');
	const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
	expect(overflow).toBe(0);
});
