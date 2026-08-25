import { wedding } from "@/data/wedding";
import { ScratchCard } from "@/components/ScratchCard";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";

export function SaveTheDate() {
  return (
    <Section className="flex flex-col items-center text-center">
      <EyebrowLabel>A little surprise</EyebrowLabel>
      <h2 className="mt-4 font-display text-3xl italic text-maroon">Save the Date</h2>
      <div className="mt-8">
        <ScratchCard>
          <div>
            <p className="font-display text-2xl italic text-maroon">{wedding.saveTheDate.headline}</p>
            <p className="mt-3 font-body text-lg text-ink/80">{wedding.saveTheDate.dateRange}</p>
          </div>
        </ScratchCard>
      </div>
    </Section>
  );
}
