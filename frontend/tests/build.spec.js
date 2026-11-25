import { test, expect } from "@playwright/test";

const MOCK_FLOWERS = [
  {
    id: 1,
    name: "Rose",
    price: 2,
  },
  {
    id: 2,
    name: "Tulip",
    price: 10,
  },
  {
    id: 3,
    name: "Daisy",
    price: 100,
  },
];

test.describe("KnitFlora build page test", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/flowers", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_FLOWERS),
      });
    });

    await page.goto("https://knitflora.com/");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    await page.getByRole("link", { name: "build" }).click();
    await expect(page).toHaveURL(/.*build/);
  });

  test("Should display header", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Pick your blooms or let our AI Florist curate a custom mix for you.")).toBeVisible()
  });
});
