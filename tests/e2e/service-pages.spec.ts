import { expect, test } from "@playwright/test";

for (const route of ["/hizmetlerimiz", "/dijital-hizmetler"]) {
  test(`${route} uses one-page visual cards without detail links`, async ({
    page,
  }) => {
    await page.goto(route);

    const cards = page.locator(".service-card");
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(cards.locator("a")).toHaveCount(0);
    await expect(cards.locator("img").first()).toBeVisible();
    await expect(page.getByText("Devamını Oku", { exact: true })).toHaveCount(
      0,
    );
    await expect(page.getByText("Hizmeti Keşfet", { exact: true })).toHaveCount(
      0,
    );
  });
}
