import { capabilityStrip } from "@/config/media";
import { Icon } from "@/components/ui/icon";

export function CapabilityStrip() {
  return (
    <section className="capability-strip" aria-label="Hizmet yaklaşımımız">
      <div className="container capability-strip__grid">
        {capabilityStrip.map((item) => (
          <article key={item.title}>
            <span>
              <Icon name={item.icon} size={28} />
            </span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
