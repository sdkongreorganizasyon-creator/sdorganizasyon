import Image from "next/image";

import type { ProcessStep } from "@/types/content";

type ProcessTimelineProps = Readonly<{
  steps: readonly ProcessStep[];
}>;

const processImages: Record<string, string> = {
  brief: "/media/process/brief.webp",
  planlama: "/media/process/planlama.webp",
  teklif: "/media/process/teklif.webp",
  onay: "/media/process/onay.webp",
  operasyon: "/media/process/operasyon.webp",
  raporlama: "/media/process/raporlama.webp",
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="process-timeline">
      {steps.map((step) => (
        <article className="process-step" key={step.stepKey}>
          <div className="process-step__media">
            <Image
              src={
                processImages[step.stepKey] ??
                "/media/pages/organizasyon-sureci.webp"
              }
              alt={`${step.title} organizasyon süreci görseli`}
              fill
              sizes="(max-width: 760px) 100vw, 33vw"
            />
          </div>

          <div className="process-step__content">
            <div className="process-step__heading">
              <span>{step.number}</span>
              <div>
                <p className="eyebrow">{step.title}</p>
                <h2>{step.subtitle}</h2>
              </div>
            </div>

            <p className="process-step__description">{step.description}</p>

            {step.groups?.length ? (
              <div className="process-groups">
                {step.groups.map((group) => (
                  <section key={group.title}>
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : null}

            {step.items.length ? (
              <ul className="process-step__items">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {step.closing ? (
              <p className="process-step__closing">{step.closing}</p>
            ) : null}


          </div>
        </article>
      ))}
    </div>
  );
}
