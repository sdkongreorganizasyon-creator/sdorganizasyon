import {
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import type { ResolvedSiteSettings } from "@/lib/content/settings";
import {
  normalizePhoneForLink,
  normalizeWhatsapp,
} from "@/lib/utils/format";

export function TopBanner({
  settings,
}: Readonly<{ settings: ResolvedSiteSettings }>) {
  const hasContact =
    settings.contact.phone ||
    settings.contact.email ||
    settings.contact.whatsapp;

  return (
    <div className="top-banner">
      <div className="container top-banner__inner">
        <div className="top-banner__contact">
          {settings.contact.phone ? (
            <a
              href={`tel:${normalizePhoneForLink(settings.contact.phone)}`}
            >
              <Phone aria-hidden="true" size={15} />
              <span>{settings.contact.phone}</span>
            </a>
          ) : null}

          {settings.contact.email ? (
            <a href={`mailto:${settings.contact.email}`}>
              <Mail aria-hidden="true" size={15} />
              <span>{settings.contact.email}</span>
            </a>
          ) : null}

          {settings.contact.whatsapp ? (
            <a
              href={`https://wa.me/${normalizeWhatsapp(
                settings.contact.whatsapp,
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle aria-hidden="true" size={15} />
              <span>WhatsApp</span>
            </a>
          ) : null}

          {!hasContact ? (
            <span>Etkinliğinizi birlikte planlayalım.</span>
          ) : null}
        </div>

        <div className="top-banner__social">
          {settings.social.instagram ? (
            <a
              aria-label="Instagram"
              href={settings.social.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram aria-hidden="true" size={16} />
            </a>
          ) : null}
          {settings.social.linkedin ? (
            <a
              aria-label="LinkedIn"
              href={settings.social.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin aria-hidden="true" size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
