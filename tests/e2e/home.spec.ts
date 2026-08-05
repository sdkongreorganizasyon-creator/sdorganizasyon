import { expect, test } from "@playwright/test";

test("home page follows the locked content scope", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Doğru Planlama.*Unutulmaz Deneyimler/i,
    }),
  ).toBeVisible();

  await expect(page.locator(".hero")).toHaveCount(1);
  await expect(page.locator(".value-card")).toHaveCount(5);
  await expect(page.locator(".service-card")).toHaveCount(0);
  await expect(page.locator(".project-card")).toHaveCount(0);
  await expect(page.locator(".reference-card")).toHaveCount(0);
  await expect(page.locator(".site-footer")).toHaveCount(1);
});

test("full menu opens and preserves key headings", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Menü/i }).click();

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
