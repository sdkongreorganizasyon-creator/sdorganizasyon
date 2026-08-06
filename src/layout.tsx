import type { CSSProperties, ReactNode } from "react";
import { draftMode } from "next/headers";

import { CookieConsent } from "@/components/layout/cookie-consent";
import { PreviewToolbar } from "@/components/layout/preview-toolbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { SkipLink } from "@/components/ui/skip-link";
import { getResolvedSiteSettings } from "@/lib/content/settings";

type SiteLayoutProps = Readonly<{
  children: ReactNode;
}>;

const fontStacks = {
  system:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  geometric: '"Avenir Next", Avenir, Montserrat, Futura, ui-sans-serif, sans-serif',
  humanist: '"Trebuchet MS", "Segoe UI", ui-sans-serif, sans-serif',
} as const;

const radiusMap = {
  compact: "0.65rem",
  soft: "1.15rem",
  rounded: "1.75rem",
} as const;

const containerMap = {
  narrow: "72rem",
  standard: "90rem",
  wide: "104rem",
} as const;

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const [settings, preview] = await Promise.all([
    getResolvedSiteSettings(),
    draftMode(),
  ]);

  const headingScale = settings.theme.headingScale;

  const style = {
    "--navy": settings.theme.background,
    "--graphite": settings.theme.background,
    "--surface-dark": settings.theme.surface,
    "--graphite-2": settings.theme.surfaceAlt,
    "--gold": settings.theme.accent,
    "--approved-gold": settings.theme.accent,
    "--white": settings.theme.text,
    "--text-muted": settings.theme.muted,
    "--border-soft": settings.theme.border,
    "--radius-card": radiusMap[settings.theme.radius],
    "--radius-media": radiusMap[settings.theme.radius],
    "--container": containerMap[settings.theme.container],
    "--site-heading-font": fontStacks[settings.theme.headingFont],
    "--site-body-font": fontStacks[settings.theme.bodyFont],
    "--site-heading-scale": String(headingScale),
    "--site-hero-title-min": `${2.5 * headingScale}rem`,
    "--site-hero-title-max": `${4.15 * headingScale}rem`,
    "--site-page-title-min": `${2 * headingScale}rem`,
    "--site-page-title-max": `${3.65 * headingScale}rem`,
    "--site-section-title-min": `${1.8 * headingScale}rem`,
    "--site-section-title-max": `${3.6 * headingScale}rem`,
    "--site-body-scale": String(settings.theme.bodyScale),
    "--site-section-spacing": `${settings.theme.sectionSpacing}px`,
    "--site-card-padding": `${settings.theme.cardPadding}px`,
    "--site-card-gap": `${settings.theme.cardGap}px`,
    "--site-content-gap": `${settings.theme.contentGap}px`,
    "--site-hero-spacing": `${settings.theme.heroSpacing}px`,
    "--site-motion-duration": `${settings.motion.duration}ms`,
  } as CSSProperties;

  return (
    <div
      className="site-shell"
      data-motion={
        settings.motion.enabled ? settings.motion.preset : "none"
      }
      style={style}
    >
      <SkipLink />
      <SiteHeader settings={settings} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter settings={settings} />
      <WhatsappFab settings={settings} />
      <CookieConsent />
      {preview.isEnabled ? <PreviewToolbar /> : null}
    </div>
  );
}
