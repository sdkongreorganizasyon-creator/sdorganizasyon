import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import {
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/icons/social-icons";
import type { ResolvedSiteSettings } from "@/lib/content/settings";
import {
  normalizePhoneForLink,
  normalizeWhatsapp,
} from "@/lib/utils/format";

export function SiteFooter({
  settings,
}: Readonly<{ settings: ResolvedSiteSettings }>) {
  const legalMenu = settings.navigation.find(
    (item) => item.id === "privacy" && item.visible,
  );
  const quickMenu = settings.navigation.filter(
    (item) => item.visible && item.showInFooter && item.id !== "privacy",
  );

  const hasContact = Boolean(
    settings.contact.phone ||
      settings.contact.mobile ||
      settings.contact.email ||
      settings.contact.address ||
      settings.contact.workingHours ||
      settings.contact.whatsapp,
  );

  const hasSocial = Boolean(
    settings.social.instagram ||
      settings.social.linkedin ||
      settings.social.youtube ||
      settings.social.x,
  );

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <section className="site-footer__brand">
          <Link href="/" aria-label="SD Kongre ana sayfa">
            <span className="site-footer__logo-halo" aria-hidden="true" />
            <Logo
              src={settings.branding.footerLogoUrl}
              className="site-footer__logo"
            />
          </Link>
          <p>{settings.footer.description}</p>

          {settings.footer.showSocialLinks && hasSocial ? (
            <div className="site-footer__social">
              {settings.social.instagram ? (
                <a
                  aria-label="Instagram"
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon aria-hidden="true" />
                </a>
              ) : null}
              {settings.social.linkedin ? (
                <a
                  aria-label="LinkedIn"
                  href={settings.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon aria-hidden="true" />
                </a>
              ) : null}
              {settings.social.youtube ? (
                <a
                  aria-label="YouTube"
                  href={settings.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  <YouTubeIcon aria-hidden="true" />
                </a>
              ) : null}
              {settings.social.x ? (
                <a
                  aria-label="X"
                  href={settings.social.x}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden="true">𝕏</span>
                </a>
              ) : null}
            </div>
          ) : null}
        </section>

        {settings.footer.showQuickMenu ? (
          <section>
            <h2>Hızlı Menü</h2>
            <ul className="site-footer__links site-footer__links--columns">
              {quickMenu.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {settings.footer.showLegalLinks ? (
          <section>
            <h2>Yasal Metinler</h2>
            <ul className="site-footer__links">
              {legalMenu?.children?.filter((item) => item.visible).map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <button
              className="cookie-settings-button"
              type="button"
              data-open-cookie-settings
            >
              Çerez Tercihlerini Yönet
            </button>
          </section>
        ) : null}

        {settings.footer.showContact && hasContact ? (
          <section>
            <h2>İletişim</h2>
            <ul className="site-footer__contact">
              {settings.contact.phone ? (
                <li>
                  <Phone aria-hidden="true" />
                  <a
                    href={`tel:${normalizePhoneForLink(
                      settings.contact.phone,
                    )}`}
                  >
                    {settings.contact.phone}
                  </a>
                </li>
              ) : null}
              {settings.contact.mobile ? (
                <li>
                  <Phone aria-hidden="true" />
                  <a
                    href={`tel:${normalizePhoneForLink(
                      settings.contact.mobile,
                    )}`}
                  >
                    {settings.contact.mobile}
                  </a>
                </li>
              ) : null}
              {settings.contact.email ? (
                <li>
                  <Mail aria-hidden="true" />
                  <a href={`mailto:${settings.contact.email}`}>
                    {settings.contact.email}
                  </a>
                </li>
              ) : null}
              {settings.contact.address ? (
                <li>
                  <MapPin aria-hidden="true" />
                  {settings.contact.mapUrl ? (
                    <a
                      href={settings.contact.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {settings.contact.address}
                    </a>
                  ) : (
                    <span>{settings.contact.address}</span>
                  )}
                </li>
              ) : null}
              {settings.contact.workingHours ? (
                <li>
                  <Clock3 aria-hidden="true" />
                  <span>{settings.contact.workingHours}</span>
                </li>
              ) : null}
              {settings.contact.whatsapp ? (
                <li>
                  <MessageCircle aria-hidden="true" />
                  <a
                    href={`https://wa.me/${normalizeWhatsapp(
                      settings.contact.whatsapp,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}
            </ul>
          </section>
        ) : null}
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {new Date().getFullYear()}{" "}
          {settings.footer.copyrightText ||
            "SDKONGRE Organizasyon Hizmetleri. Tüm hakları saklıdır."}
        </p>
        <div>
          <Link href="/kvkk">KVKK</Link>
          <Link href="/kvkk/gizlilik-politikasi">Gizlilik</Link>
        </div>
      </div>
    </footer>
  );
}
