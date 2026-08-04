import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";

type ProseContentProps = Readonly<{
  paragraphs: readonly string[];
  aside?: ReactNode;
}>;

export function ProseContent({ paragraphs, aside }: ProseContentProps) {
  return (
    <section className="content-section">
      <div className="container content-layout">
        <div className="prose">
          {paragraphs.map((paragraph, index) => (
            <Reveal delay={index * 0.04} key={`${paragraph.slice(0, 30)}-${index}`}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
        {aside ? <aside className="content-aside">{aside}</aside> : null}
      </div>
    </section>
  );
}
