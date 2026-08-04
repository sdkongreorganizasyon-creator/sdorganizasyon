import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

type ValueCardsProps = Readonly<{
  items: readonly Readonly<{
    title: string;
    description: string;
    icon?: string;
  }>[];
}>;

export function ValueCards({ items }: ValueCardsProps) {
  return (
    <section className="section section--soft">
      <div className="container card-grid card-grid--three">
        {items.map((item, index) => (
          <Reveal delay={index * 0.05} key={item.title}>
            <article className="info-card">
              <span className="info-card__icon">
                <Icon name={item.icon} size={28} />
              </span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
