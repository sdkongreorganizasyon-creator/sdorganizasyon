import Image from "next/image";

import type { ReferenceRecord } from "@/types/content";

type ReferenceGridProps = Readonly<{
  references: readonly ReferenceRecord[];
}>;

export function ReferenceGrid({ references }: ReferenceGridProps) {
  return (
    <div className="reference-grid">
      {references.map((reference) => {
        const content = (
          <>
            <div className="reference-card__logo">
              {reference.logoUrl ? (
                <Image
                  src={reference.logoUrl}
                  alt={`${reference.name} logosu`}
                  fill
                  sizes="220px"
                />
              ) : (
                <span>{reference.name}</span>
              )}
            </div>
            <h2>{reference.name}</h2>
            {reference.category ? <p>{reference.category}</p> : null}
          </>
        );

        return reference.website ? (
          <a
            className="reference-card"
            href={reference.website}
            key={reference.id}
            target="_blank"
            rel="noreferrer"
          >
            {content}
          </a>
        ) : (
          <article className="reference-card" key={reference.id}>
            {content}
          </article>
        );
      })}
    </div>
  );
}
