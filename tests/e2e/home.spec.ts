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

test("top navigation shows process and the corporate submenu", async ({
  page,
}) => {
  await page.goto("/");

  const mainNavigation = page.getByRole("navigation", { name: "Ana menü" });

  await expect(page.locator("button.menu-trigger")).toHaveCount(0);
  await expect(
    mainNavigation.getByRole("link", {
      name: "ORGANİZASYON SURECİ",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    mainNavigation.getByRole("link", { name: "İLETİŞİM", exact: true }),
  ).toBeVisible();

  const corporateButton = mainNavigation.getByRole("button", {
    name: "KURUMSAL",
    exact: true,
  });

  await corporateButton.click();
  await expect(
    mainNavigation.getByRole("menuitem", { name: "Hakkımızda", exact: true }),
  ).toBeVisible();
  await expect(
    mainNavigation.getByRole("menuitem", { name: "Değerlerimiz", exact: true }),
  ).toBeVisible();
  await expect(
    mainNavigation.getByRole("menuitem", { name: "Misyon", exact: true }),
  ).toHaveCount(0);
  await expect(
    mainNavigation.getByRole("menuitem", { name: "Vizyon", exact: true }),
  ).toHaveCount(0);

  await page.locator(".approved-hero").hover();
  await expect(page.locator(".site-header__dropdown-menu")).toHaveCount(0);
});
