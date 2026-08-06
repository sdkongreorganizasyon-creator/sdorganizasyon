import type { LegalDocumentContent } from "@/types/content";

type LegalDocumentProps = Readonly<{
  document: LegalDocumentContent;
}>;

export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <article className="legal-document">
      {document.sections.map((section, sectionIndex) => (
        <section key={`${section.title ?? "section"}-${sectionIndex}`}>
          {section.title ? <h2>{section.title}</h2> : null}

          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}

          {section.subsections?.map((subsection) => (
            <section
              className="legal-document__subsection"
              key={subsection.title}
            >
              <h3>{subsection.title}</h3>

              {subsection.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {subsection.bullets?.length ? (
                <ul>
                  {subsection.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}

              {subsection.closingParagraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          {section.closingParagraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {section.items?.length ? (
            <div className="legal-document__items">
              {section.items.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </article>
  );
}
