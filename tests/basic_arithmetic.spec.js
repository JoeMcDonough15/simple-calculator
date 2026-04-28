import { test, expect } from "@playwright/test";

test("Add Two Numbers", async ({ page }) => {
  // * 2 + 2 = 4
  await page.goto("http://localhost:3000");
  await page.pause();
  // Click 2
  await page.locator("[id=num_2]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("2");
  // Click +
  await page.locator("[id=add]").click();
  // Click 2
  await page.locator("[id=num_2]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("2");
  // Click =
  await page.locator("[id=equals]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("4");
  await page.close();
});

test("Subtract Two Numbers", async ({ page }) => {
  // * 5 - 4 = 1
  await page.goto("http://localhost:3000");
  await page.pause();
  // Click 5 // id=num_5
  await page.locator("[id=num_5]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("5");
  // Click - // id=subtract
  await page.locator("[id=subtract]").click();
  // Click 4 // id=num_4
  await page.locator("[id=num_4]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("4");
  // Click = // id=equals
  await page.locator("[id=equals]").click();
  // Assert that the difference is 1 // id=display-text
  await expect(page.locator("[id=display-text]")).toHaveText("1");
  await page.close();
});
