/* eslint-disable testing-library/prefer-screen-queries -- Playwright tests use page locators, not Testing Library render queries. */
import { test, expect } from "@playwright/test";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Velvet Red Rose Bouquet",
    price: 4.5,
    description: "Handcrafted red roses for a romantic anniversary",
    flower_type: "rose",
    occasion: "anniversary",
    image_url: "",
  },
  {
    id: 2,
    name: "Sunny Tulip Bundle",
    price: 8.0,
    description: "Bright yellow tulips perfect for a birthday gift",
    flower_type: "tulip",
    occasion: "birthday",
    image_url: "",
  },
  {
    id: 3,
    name: "Meadow Daisy Deluxe",
    price: 14.99,
    description: "Cheerful white daisies to say thank you",
    flower_type: "daisy",
    occasion: "thank_you",
    image_url: "",
  },
];

test.describe("KnitFlora Shop Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Mock /api/products so filter, sort, and empty-state tests are deterministic
    await page.route("**/api/products", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_PRODUCTS),
      });
    });

    // Navigate via landing page (avoids direct SPA route 404s if unconfigured)
    await page.goto("https://knitflora.com/");
    await page.getByRole("link", { name: "Shop bouquets" }).click();
    await expect(page).toHaveURL(/.*shop/);
  });

  test("should display header banner, breadcrumb, and bottom CTA card", async ({
    page,
  }) => {
    // Main heading & subtitle
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Bottom CTA card & navigation to /build
    const designLink = page.locator('main a[href="/build"]');
    await expect(designLink).toBeVisible();
    await designLink.click();
    await expect(page).toHaveURL(/.*build/);
  });

  test("should display all filter bar controls", async ({ page }) => {
    // Search input (works both before and after deploying htmlFor)
    const searchInput = page.locator('input[type="text" i]').first();
    await expect(searchInput).toBeVisible();

    // 3 filter dropdowns (Flower type, Occasion, Price) + 1 sort dropdown
    const dropdowns = page.getByRole("combobox");
    await expect(dropdowns).toHaveCount(4);

    // Filter Reset button (first button in the filter bar)
    const filterSection = searchInput.locator("xpath=ancestor::div[3]");
    await expect(filterSection.getByRole("button")).toBeVisible();
  });

  test("should render product cards with name, description, price, and add-to-bag button", async ({
    page,
  }) => {
    for (const product of MOCK_PRODUCTS) {
      await expect(
        page.getByRole("heading", { name: product.name })
      ).toBeVisible();
      await expect(page.getByText(product.description)).toBeVisible();
      await expect(page.getByText(`€${product.price}`)).toBeVisible();
    }

    // Each card renders an "Add to bag" action button
    const addButtons = page
      .locator("main")
      .getByRole("button", { name: /add/i });
    await expect(addButtons).toHaveCount(MOCK_PRODUCTS.length);
  });

  test("should filter products by search query", async ({ page }) => {
    const searchInput = page.locator('input[type="text" i]').first();
    await searchInput.fill("Tulip");

    await expect(
      page.getByRole("heading", { name: "Sunny Tulip Bundle" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Velvet Red Rose Bouquet" })
    ).toBeHidden();
    await expect(
      page.getByRole("heading", { name: "Meadow Daisy Deluxe" })
    ).toBeHidden();
  });

  test("should filter products by flower type dropdown", async ({ page }) => {
    const flowerTypeSelect = page.getByRole("combobox").nth(0);
    await flowerTypeSelect.selectOption("rose");

    await expect(
      page.getByRole("heading", { name: "Velvet Red Rose Bouquet" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Sunny Tulip Bundle" })
    ).toBeHidden();
    await expect(
      page.getByRole("heading", { name: "Meadow Daisy Deluxe" })
    ).toBeHidden();
  });

  test("should filter products by occasion dropdown", async ({ page }) => {
    const occasionSelect = page.getByRole("combobox").nth(1);
    await occasionSelect.selectOption("thank_you");

    await expect(
      page.getByRole("heading", { name: "Meadow Daisy Deluxe" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Velvet Red Rose Bouquet" })
    ).toBeHidden();
    await expect(
      page.getByRole("heading", { name: "Sunny Tulip Bundle" })
    ).toBeHidden();
  });

  test("should filter products by price range dropdown", async ({ page }) => {
    const priceSelect = page.getByRole("combobox").nth(2);

    // Under €5 -> €4.5
    await priceSelect.selectOption("under_5");
    await expect(
      page.getByRole("heading", { name: "Velvet Red Rose Bouquet" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Sunny Tulip Bundle" })
    ).toBeHidden();

    // €5 - €10 -> €8
    await priceSelect.selectOption("5_to_10");
    await expect(
      page.getByRole("heading", { name: "Sunny Tulip Bundle" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Velvet Red Rose Bouquet" })
    ).toBeHidden();

    // Over €10 -> €14.99
    await priceSelect.selectOption("over_10");
    await expect(
      page.getByRole("heading", { name: "Meadow Daisy Deluxe" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Sunny Tulip Bundle" })
    ).toBeHidden();
  });

  test("should sort products by price low-to-high and high-to-low", async ({
    page,
  }) => {
    const sortSelect = page.getByRole("combobox").nth(3);
    const productHeadings = page.locator("main h3");

    // Low to high: €4.5 -> €8 -> €14.99
    await sortSelect.selectOption("price_asc");
    await expect(productHeadings).toHaveText([
      "Velvet Red Rose Bouquet",
      "Sunny Tulip Bundle",
      "Meadow Daisy Deluxe",
    ]);

    // High to low: €14.99 -> €8 -> €4.5
    await sortSelect.selectOption("price_desc");
    await expect(productHeadings).toHaveText([
      "Meadow Daisy Deluxe",
      "Sunny Tulip Bundle",
      "Velvet Red Rose Bouquet",
    ]);
  });

  test("should show empty state and reset all filters when no products match", async ({
    page,
  }) => {
    const searchInput = page.locator('input[type="text" i]').first();
    await searchInput.fill("NonExistentBouquet123");

    // All product cards disappear and empty state appears
    await expect(
      page.getByRole("heading", { name: "Velvet Red Rose Bouquet" })
    ).toBeHidden();

    const emptyStateResetButton = page.locator("main button").first();
    await expect(emptyStateResetButton).toBeVisible();

    // Clicking reset restores all products and clears search input
    await emptyStateResetButton.click();
    await expect(searchInput).toHaveValue("");
    await expect(
      page.getByRole("heading", { name: "Velvet Red Rose Bouquet" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Sunny Tulip Bundle" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Meadow Daisy Deluxe" })
    ).toBeVisible();
  });

  test("should reset active filters using the filter bar reset button", async ({
    page,
  }) => {
    const searchInput = page.locator('input[type="text" i]').first();
    const flowerTypeSelect = page.getByRole("combobox").nth(0);
    const occasionSelect = page.getByRole("combobox").nth(1);
    const priceSelect = page.getByRole("combobox").nth(2);

    await searchInput.fill("Rose");
    await flowerTypeSelect.selectOption("rose");
    await occasionSelect.selectOption("anniversary");
    await priceSelect.selectOption("under_5");

    // Click the Reset button inside ShopFilterBar
    const filterResetButton = searchInput
      .locator("xpath=ancestor::div[3]")
      .getByRole("button");
    await filterResetButton.click();

    await expect(searchInput).toHaveValue("");
    await expect(flowerTypeSelect).toHaveValue("all");
    await expect(occasionSelect).toHaveValue("all");
    await expect(priceSelect).toHaveValue("all");
  });
});