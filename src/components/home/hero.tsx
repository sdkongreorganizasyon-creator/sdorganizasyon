"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import type { ResolvedSiteSettings } from "@/lib/content/settings";

export function Hero({
  hero,
}: Readonly<{ hero: ResolvedSiteSettings["hero"] }>) {
  const reducedMotion = useReducedMotion();
  const hasVideo = Boolean(
    hero.desktopVideo || hero.mobileVideo,
  );

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        {hasVideo && !reducedMotion ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.poster}
          >
            {hero.mobileVideo ? (
              <source
                media="(max-width: 767px)"
                src={hero.mobileVideo}
              />
            ) : null}
            {hero.desktopVideo ? (
              <source src={hero.desktopVideo} />
            ) : null}
          </video>
        ) : (
          <Image
            src={hero.poster}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        )}
        <div className="hero__overlay" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        <motion.p
          className="eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          KONGRE · TOPLANTI · ETKİNLİK
        </motion.p>

        <motion.h1
          id="hero-title"
          initial={reducedMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: reducedMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Doğru Planlama.
          <br />
          <span>Unutulmaz Deneyimler.</span>
        </motion.h1>

        <motion.p
          className="hero__lead"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: reducedMotion ? 0 : 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Ulusal ve uluslararası kongre, toplantı ve etkinlik
          organizasyonlarında fikirleri kusursuz deneyimlere dönüştürüyoruz.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: reducedMotion ? 0 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ButtonLink href="/teklif-al">
            Teklif Al
            <ArrowRight aria-hidden="true" size={18} />
          </ButtonLink>
          <ButtonLink href="/projeler" variant="secondary">
            Projelerimizi İncele
          </ButtonLink>
        </motion.div>
      </div>

      <a className="hero__scroll" href="#degerler">
        <span>Aşağı Kaydır</span>
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
