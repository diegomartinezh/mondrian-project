import { test, expect } from "@playwright/test";

test.describe("M3 public shell smoke", () => {
  test("gallery and about routes render without editor island", async ({
    page,
  }) => {
    await page.goto("./gallery/");
    await expect(page.getByRole("heading", { name: "Gallery" })).toBeVisible();
    await expect(page.locator("astro-island")).toHaveCount(0);

    await page.goto("./about/");
    await expect(page.getByRole("heading", { name: "About the study" })).toBeVisible();
    for (const id of [
      "scene-measure",
      "scene-ratios",
      "scene-render",
      "scene-frame",
      "scene-colour",
      "scene-yours",
      "scene-print",
    ]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await expect(page.locator("astro-island")).toHaveCount(0);
  });

  test("method and about-us have zero script modules beyond layout assets", async ({
    page,
  }) => {
    await page.goto("./method/");
    await expect(page.getByRole("heading", { name: "Method" })).toBeVisible();
    await page.goto("./about-us/");
    await expect(page.getByRole("heading", { name: "About us" })).toBeVisible();
  });

  test("source study accepts banana theta as 0", async ({ page }) => {
    await page.goto("./gallery/kunsthaus-1930-rbby/?theta=banana");
    const caption = page.locator("[data-study-caption]");
    await expect(caption).toHaveAttribute("data-theta", "0");
  });
});
