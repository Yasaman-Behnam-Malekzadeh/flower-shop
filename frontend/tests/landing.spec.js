/* eslint-disable testing-library/prefer-screen-queries -- Playwright tests use page locators, not Testing Library render queries. */
import { test, expect } from '@playwright/test';

test.describe('KnitFlora Landing Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    
    await page.goto('http://localhost:3000/');
  });

  test('should display top bar and main navigation header correctly', async ({ page }) => {
    // 1. Check top banner announcement bar
    await expect(
      page.getByText(/Crocheted with love\. Made to keep forever/i)
    ).toBeVisible();

    // 2. Check brand logo
    await expect(page.getByRole('link', { name: 'KnitFlora' })).toBeVisible();

    // 3. Check navbar links
    await expect(page.getByRole('link', { name: 'Shop bouquets' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Build a bouquet' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'How it works' })).toBeVisible();

    // 4. Check right side header controls
    await expect(page.getByText('EN / DE')).toBeVisible();
    await expect(page.getByRole('button', { name: /search/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /favorites/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /account/i })).toBeVisible();
  });

  test('should render hero section content and badges', async ({ page }) => {
    // 1. Check hero eyebrow & main headline
    await expect(page.getByText(/LITTLE STITCHES\. BIG FEELINGS\./i)).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Flowers that stay forever\./i })
    ).toBeVisible();

    // 2. Check subtitle paragraph
    await expect(
      page.getByText(/A little yarn\. A whole lot of love\./i)
    ).toBeVisible();

    // 3. Check badges & tags around the hero image
    await expect(page.getByText('100%', { exact: true })).toBeVisible();
    await expect(page.getByText('Handmadewith love', { exact: true })).toBeVisible();
    await expect(page.getByText(/No water\. Just love\./i)).toBeVisible();
    await expect(page.getByText(/Dreamed up by you\. Handmade just for you\./i)).toBeVisible();
  });

  test('should navigate to custom bouquet builder on CTA button click', async ({ page }) => {
    // Click the main CTA button "Design your own bouquet"
    const ctaButton = page.getByRole('link', { name: /Design your own bouquet/i });
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    // Verify it redirects to the build route
    await expect(page).toHaveURL(/.*build/);
  });

  test('should display bottom value proposition bar', async ({ page }) => {
    // Check bottom highlights bar items
    await expect(page.getByText(/Every bloom is unique/i)).toBeVisible();
    await expect(page.getByText(/Joy that never wilts/i)).toBeVisible();
    await expect(page.getByText(/Wrapped with love/i)).toBeVisible();
  });
  test('should display the product list and allow interacting with items', async ({ page }) => {
    // 1. Check section header
    await expect(
      page.getByRole('heading', { name: /Made to fall in love with\./i })
    ).toBeVisible();

    // 2. Locate all product cards in the list (assuming they share a common card structure or class/test-id)
    // Adjust the locator to match your product card container (e.g., article, or a specific wrapper class)
    const productCards = page.locator('div > .bg-white, article, [class*="card"]');
    
    // Ensure the list has items loaded
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);

    // 3. Click on the first item in the list to view details
    const firstProduct = productCards.first();
    await firstProduct.click();

    // Or if you have an "Explore all bouquets" / "See all items" link to view the full catalog:
    const exploreLink = page.getByRole('link', { name: /Explore all bouquets|See all/i });
    if (await exploreLink.isVisible()) {
      await exploreLink.click();
      // eslint-disable-next-line jest/no-conditional-expect
      await expect(page).toHaveURL(/.*shop/);
    }
  });
});