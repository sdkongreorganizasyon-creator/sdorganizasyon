import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/kurumsal",
  "/kurumsal/hakkimizda",
  "/kurumsal/hikayemiz",
  "/kurumsal/misyon",
  "/kurumsal/vizyon",
  "/kurumsal/degerlerimiz",
  "/neden-biz",
  "/hizmetlerimiz",
  "/hizmetlerimiz/kongre-organizasyonlari",
  "/dijital-hizmetler",
  "/dijital-hizmetler/katilimci-ve-kayit-yonetimi",
  "/organizasyon-sureci",
  "/projeler",
  "/referanslar",
  "/kvkk",
  "/kvkk/aydinlatma-metni",
  "/kvkk/gizlilik-politikasi",
  "/kvkk/cerez-politikasi",
  "/kvkk/acik-riza-metni",
  "/kvkk/yasal-dayanaklar",
  "/iletisim",
  "/teklif-al",
];

for (const route of routes) {
  test(`${route} route renders without a server error`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}
