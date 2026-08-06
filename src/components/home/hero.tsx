"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { approvedHeroPoster, whyUsHighlights } from "@/config/media";
import { Icon } from "@/components/ui/icon";
import type { ResolvedSiteSettings } from "@/lib/content/settings";

export function Hero({
  hero,
}: Readonly<{ hero: ResolvedSiteSettings["hero"] }>) {
  const reducedMotion = useReducedMotion();
  const hasVideo = Boolean(hero.desktopVideo || hero.mobileVideo);
  const poster = hero.poster || approvedHeroPoster;

  return (
    <section className="approved-hero" aria-labelledby="hero-title">
      <div className="approved-hero__media" aria-hidden="true">
        {hasVideo && !reducedMotion ? (
          <video autoPlay muted loop playsInline preload="metadata" poster={poster}>
            {hero.mobileVideo ? (
              <source media="(max-width: 767px)" src={hero.mobileVideo} />
            ) : null}
            {hero.desktopVideo ? <source src={hero.desktopVideo} /> : null}
          </video>
        ) : (
          <Image src={poster} alt="" fill priority sizes="100vw" />
        )}
      </div>
      <div className="approved-hero__shade" aria-hidden="true" />
      <div className="approved-hero__grid" aria-hidden="true" />

      <div className="container approved-hero__layout">
        <motion.div
          className="approved-hero__copy"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="approved-hero__eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title">
            <span>{hero.titleLine1}</span>
            <span>{hero.titleLine2}</span>
            <strong>{hero.titleHighlight}</strong>
          </h1>
          <p className="approved-hero__lead">{hero.description}</p>

          <div className="approved-hero__actions">
            <Link
              className="approved-button approved-button--primary"
              href={hero.primaryButtonUrl || "/hizmetlerimiz"}
            >
              <span>{hero.primaryButtonLabel}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              className="approved-button approved-button--secondary"
              href={hero.secondaryButtonUrl || "/kurumsal/hakkimizda"}
            >
              <span>{hero.secondaryButtonLabel}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </motion.div>

        <motion.aside
          className="why-panel"
          aria-labelledby="why-panel-title"
          initial={reducedMotion ? false : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: reducedMotion ? 0 : 0.14 }}
        >
          <h2 id="why-panel-title">NEDEN BİZ?</h2>
          <ul>
            {whyUsHighlights.map((item) => (
              <li key={item.title}>
                <span className="why-panel__icon">
                  <Icon name={item.icon} size={28} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}
