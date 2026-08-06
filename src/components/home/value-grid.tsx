"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import type { HomeValue } from "@/types/content";

export function ValueGrid({
  values,
}: Readonly<{ values: readonly HomeValue[] }>) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="approved-service-section"
      id="degerler"
      aria-labelledby="values-title"
    >
      <h2 className="sr-only" id="values-title">
        Öne Çıkan Hizmetlerimiz
      </h2>

      <div className="container approved-service-grid">
        {values
          .filter((item) => item.active !== false)
          .map((item, index) => (
            <motion.article
              className="approved-service-card"
              key={item.title}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.42,
                delay: reducedMotion ? 0 : index * 0.04,
              }}
            >
              <div className="approved-service-card__media">
                <Image
                  src={
                    item.image ||
                    "/media/services/physical/kongre-organizasyonlari.webp"
                  }
                  alt={`${item.title} hizmetini temsil eden görsel`}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 20vw"
                />
              </div>

              <div className="approved-service-card__content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
      </div>
    </section>
  );
}
