import { CheckCircle2 } from "lucide-react";

import type { ProcessStep } from "@/types/content";

type ProcessTimelineProps = Readonly<{
  steps: readonly ProcessStep[];
}>;

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="process-timeline">
      {steps.map((step) => (
        <article className="process-step" key={step.stepKey}>
          <div className="process-step__rail">
            <span>{step.number}</span>
          </div>

          <div className="process-step__content">
            <p className="eyebrow">{step.title}</p>
            <h2>{step.subtitle}</h2>
            <p className="process-step__description">{step.description}</p>

            {step.groups?.length ? (
              <div className="process-groups">
                {step.groups.map((group) => (
                  <section key={group.title}>
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>
                          <CheckCircle2 aria-hidden="true" size={18} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : null}

            {step.items.length ? (
              <ul className="process-step__items">
                {step.items.map((item) => (
                  <li key={item}>
                    <CheckCircle2 aria-hidden="true" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {step.closing ? <p>{step.closing}</p> : null}

            <div className="process-step__outputs">
              <h3>Bu Aşamanın Çıktıları</h3>
              <ul>
                {step.outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
