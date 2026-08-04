"use client";

import { motion, useReducedMotion } from "motion/react";

import { Icon } from "@/components/ui/icon";
import type { HomeValue } from "@/types/content";

export function ValueGrid({
  values,
}: Readonly<{ values: readonly HomeValue[] }>) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="value-section" id="degerler" aria-labelledby="values-title">
      <h2 className="sr-only" id="values-title">
        Çalışma İlkelerimiz
      </h2>

      <div className="container value-grid">
        {values.map((item, index) => (
          <motion.article
            className="value-card"
            key={item.number}
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 32, filter: "blur(8px)" }
            }
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={reducedMotion ? undefined : { y: -6 }}
            transition={{
              duration: 0.55,
              delay: reducedMotion ? 0 : index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="value-card__top">
              <span>{item.number}</span>
              <Icon name={item.icon} size={30} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
