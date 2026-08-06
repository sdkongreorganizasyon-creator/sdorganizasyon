import { Reveal } from "@/components/ui/reveal";

type ValueCardsProps = Readonly<{
  items: readonly Readonly<{
    title: string;
    description: string;
    icon?: string;
  }>[];
  className?: string;
}>;

export function ValueCards({ items, className }: ValueCardsProps) {
  return (
    <section
      className={`section section--soft value-cards${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="container card-grid card-grid--three">
        {items.map((item, index) => (
          <Reveal delay={index * 0.05} key={item.title}>
            <article className="info-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
