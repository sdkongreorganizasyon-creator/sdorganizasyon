import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";

type ValueCardsProps = Readonly<{
  items: readonly Readonly<{
    title: string;
    description: string;
    icon?: string;
  }>[];
  className?: string;
  images?: Readonly<Record<string, string>>;
}>;

export function ValueCards({ items, className, images }: ValueCardsProps) {
  return (
    <section
      className={`section section--soft value-cards${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="container card-grid card-grid--three">
        {items.map((item, index) => {
          const image = images?.[item.title];

          return (
            <Reveal delay={index * 0.05} key={item.title}>
              <article className="info-card">
                {image ? (
                  <div className="info-card__media">
                    <Image
                      src={image}
                      alt={`${item.title} görseli`}
                      fill
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div className="info-card__body">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
