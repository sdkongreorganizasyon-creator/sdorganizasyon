import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";

type ProseContentProps = Readonly<{
  paragraphs: readonly string[];
  aside?: ReactNode;
  className?: string;
}>;

export function ProseContent({
  paragraphs,
  aside,
  className,
}: ProseContentProps) {
  return (
    <section
      className={`content-section${className ? ` ${className}` : ""}`}
    >
      <div className={`container content-layout${aside ? "" : " content-layout--single"}`}>
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
