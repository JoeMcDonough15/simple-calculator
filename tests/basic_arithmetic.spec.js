import { test, expect } from "@playwright/test";

test("Add Two Numbers", async ({ page }) => {
  // * 2 + 2 = 4
  await page.goto("http://localhost:3000");
  await page.pause();
  // Click 2
  await page.locator('[id="num_2"]').click();
  await expect(page.locator("[id=display-text]")).toHaveText("2");
  // Click +
  await page.locator('[id="add"]').click();
  // Click 2
  await page.locator('[id="num_2"]').click();
  await expect(page.locator("[id=display-text]")).toHaveText("2");
  // Click =
  await page.locator('[id="equals"]').click();
  await expect(page.locator("[id=display-text]")).toHaveText("4");
});

test("Subtract Two Numbers", async ({ page }) => {
  // * 5 - 4 = 1
  await page.goto("http://localhost:3000");
  await page.pause();

  // Click 5

  // Click -

  // Click 4

  // Click =

  // Assert that the difference is 1
});
