import type { ReactNode } from "react";

import { CookieConsent } from "@/components/layout/cookie-consent";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { SkipLink } from "@/components/ui/skip-link";
import { getResolvedSiteSettings } from "@/lib/content/settings";

type SiteLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const settings = await getResolvedSiteSettings();

  return (
    <div className="site-shell">
      <SkipLink />
      <SiteHeader settings={settings} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <SiteFooter settings={settings} />
      <WhatsappFab settings={settings} />
      <CookieConsent />
    </div>
  );
}
