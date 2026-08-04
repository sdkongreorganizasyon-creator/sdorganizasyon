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
import { navigation } from "@/config/navigation";
import type { ResolvedSiteSettings } from "@/lib/content/settings";
import {
  normalizePhoneForLink,
  normalizeWhatsapp,
} from "@/lib/utils/format";

export function SiteFooter({
  settings,
}: Readonly<{ settings: ResolvedSiteSettings }>) {
  const legalMenu = navigation.find((item) => item.id === "privacy");
  const quickMenu = navigation.filter(
    (item) => !["privacy", "home"].includes(item.id),
  );

  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="container site-footer__grid">
        <section className="site-footer__brand">
          <Link href="/" aria-label="SD Kongre ana sayfa">
            <Logo className="site-footer__logo" />
          </Link>
          <p>
            Ulusal ve uluslararası kongre, toplantı ve etkinlik
            organizasyonlarında planlamadan uygulamaya profesyonel çözümler
            sunuyoruz.
          </p>

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
          </div>
        </section>

        <section>
          <h2>Hızlı Menü</h2>
          <ul className="site-footer__links">
            <li>
              <Link href="/">ANA SAYFA</Link>
            </li>
            {quickMenu.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/teklif-al">Teklif Al</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>Yasal Metinler</h2>
          <ul className="site-footer__links">
            {legalMenu?.children
              ? legalMenu.children.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))
              : null}
          </ul>
          <button
            className="cookie-settings-button"
            type="button"
            data-open-cookie-settings
          >
            Çerez Tercihlerini Yönet
          </button>
        </section>

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
                  WhatsApp&apos;tan Yazın
                </a>
              </li>
            ) : null}
          </ul>

          {!settings.contact.phone &&
          !settings.contact.email &&
          !settings.contact.address ? (
            <p className="site-footer__pending">
              İletişim bilgileri `.env.local` üzerinden eklenecektir.
            </p>
          ) : null}
        </section>
      </div>

      <div className="container site-footer__bottom">
        <p>© {new Date().getFullYear()} SDKONGRE. Tüm hakları saklıdır.</p>
        <p>Planlama · Koordinasyon · Operasyon</p>
      </div>
    </footer>
  );
}
