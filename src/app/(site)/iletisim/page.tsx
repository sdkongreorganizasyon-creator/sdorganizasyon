import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { InteriorHero } from "@/components/pages/interior-hero";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import {
  normalizePhoneForLink,
  normalizeWhatsapp,
} from "@/lib/utils/format";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "İletişim",
  description:
    "Kongre, toplantı ve etkinlik organizasyonu ihtiyaçlarınız için SDKONGRE ile iletişime geçin.",
  path: "/iletisim",
});

export default async function ContactPage() {
  const settings = await getResolvedSiteSettings();
  const hero = getPageHero(settings, "/iletisim", {
    eyebrow: "İLETİŞİM",
    title: "Bizimle İletişime Geçin",
    description:
      "Sorularınızı, proje kapsamınızı veya iş birliği talebinizi güvenli form üzerinden bize iletin.",
    image: "/media/headers/iletisim.webp",
    video: null,
    animation: "fade",
  });
  const hasContact =
    settings.contact.phone ||
    settings.contact.mobile ||
    settings.contact.email ||
    settings.contact.address;
  const mapSrc =
    "https://www.google.com/maps?q=Me%C5%9Frutiyet%2C%20Atat%C3%BCrk%20Blv%20No%3A109%20D%3A16%2C%2006420%20%C3%87ankaya%2FAnkara&hl=tr&z=17&output=embed";

  return (
    <>
      <InteriorHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image="/media/headers/iletisim.webp"
        video={hero.video}
        animation={hero.animation}
        template={hero.template}
        headingFont={hero.headingFont}
        bodyFont={hero.bodyFont}
        background={hero.background}
        textColor={hero.textColor}
        accentColor={hero.accentColor}
        headingScale={hero.headingScale}
        bodyScale={hero.bodyScale}
        heroSpacing={hero.heroSpacing}
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "İLETİŞİM" },
        ]}
      />

      <section className="section">
        <div className="container contact-layout">
          <aside className="contact-panel">
            <p className="eyebrow">İLETİŞİM KANALLARI</p>
            <h2>Size nasıl yardımcı olabiliriz?</h2>
            <p>
              Organizasyonunuzun kapsamını paylaşın. Ekibimiz ihtiyaçlarınızı
              değerlendirerek sizinle iletişime geçsin.
            </p>

            {hasContact ? (
              <ul className="contact-list">
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
            ) : null}
          </aside>

          <ContactForm />
        </div>
      </section>

      {mapSrc ? (
        <section className="section contact-map-section">
          <div className="container">
            <div className="contact-map">
              <iframe
                src={mapSrc}
                title="SDKONGRE adresi Google Maps haritası"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
