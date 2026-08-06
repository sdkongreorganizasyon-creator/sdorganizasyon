import { expect, test } from "@playwright/test";

test("home page follows the approved SDKONGRE composition", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /DOĞRU YERDE.*DOĞRU ZAMAN.*MÜKEMMEL SONUÇLAR/i,
    }),
  ).toBeVisible();

  await expect(page.locator(".approved-hero")).toHaveCount(1);
  await expect(page.locator(".why-panel")).toHaveCount(1);
  await expect(page.locator(".approved-service-card")).toHaveCount(5);
  await expect(page.locator(".capability-strip")).toHaveCount(1);
  await expect(page.locator(".project-card")).toHaveCount(0);
  await expect(page.locator(".reference-card")).toHaveCount(0);
  await expect(page.locator(".site-footer")).toHaveCount(1);
  await expect(page.getByText(".env.local", { exact: false })).toHaveCount(0);
  await expect(
    page.getByText("Etkinliğinizi birlikte planlayalım.", { exact: true }),
  ).toHaveCount(0);
});

test("full menu opens and preserves key headings", async ({ page }) => {
  await page.goto("/");
  await page.locator("button.menu-trigger").click();

  const menuDialog = page.getByRole("dialog", { name: "Site menüsü" });

  await expect(menuDialog).toBeVisible();
  await expect(
    menuDialog.getByText("HİZMETLERİMİZ", { exact: true }),
  ).toBeVisible();
  await expect(
    menuDialog.getByText("ORGANİZASYON SURECİ", { exact: true }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(menuDialog).toHaveCount(0);
});
