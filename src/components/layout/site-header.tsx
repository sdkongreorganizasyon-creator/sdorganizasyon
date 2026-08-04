"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { MenuOverlay } from "@/components/layout/menu-overlay";
import { ButtonLink } from "@/components/ui/button";
import type { ResolvedSiteSettings } from "@/lib/content/settings";
import { normalizePhoneForLink } from "@/lib/utils/format";

export function SiteHeader({
  settings,
}: Readonly<{ settings: ResolvedSiteSettings }>) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 20);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " site-header--scrolled" : ""}`}
    >
      <div className="container site-header__inner">
        <Link className="site-header__brand" href="/" aria-label="Ana sayfa">
          <Logo compact className="site-header__logo" />
        </Link>

        <div className="site-header__actions">
          {settings.contact.phone ? (
            <a
              className="site-header__phone"
              href={`tel:${normalizePhoneForLink(settings.contact.phone)}`}
            >
              <Phone aria-hidden="true" size={18} />
              <span>{settings.contact.phone}</span>
            </a>
          ) : null}

          <ButtonLink
            className="site-header__quote"
            href="/teklif-al"
            variant="secondary"
          >
            Teklif Al
          </ButtonLink>

          <MenuOverlay />
        </div>
      </div>
    </header>
  );
}
