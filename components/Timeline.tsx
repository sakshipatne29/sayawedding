import { wedding } from "@/data/wedding";
import { CeremonyEnvelope } from "@/components/CeremonyEnvelope";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";

export function Timeline() {
  return (
    <Section className="relative" innerClassName="max-w-4xl">
      <EyebrowLabel>The Celebrations</EyebrowLabel>
      <h2 className="mt-4 text-center font-display text-3xl italic text-maroon">Our Ceremonies</h2>
      <div className="relative mt-16">
        <div className="absolute left-6 top-0 h-full w-px bg-gold/40 md:left-1/2" aria-hidden="true" />
        <div className="flex flex-col gap-16">
          {wedding.ceremonies.map((ceremony, index) => (
            <CeremonyEnvelope key={ceremony.id} ceremony={ceremony} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
