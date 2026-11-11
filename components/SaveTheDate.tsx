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
        <ScratchCard cardClassName="bg-[#D7263D]" overlayColor={["#FDE2EA", "#F7B6CB", "#F29AB8"]}
          overlayTextColor="#8A2E52">
          <div>
            <p className="font-display text-3xl italic text-white">{wedding.saveTheDate.headline}</p>
            <p className="mt-4 font-body text-lg text-white">{wedding.saveTheDate.weddingDay}</p>
          </div>
        </ScratchCard>
      </div>
    </Section>
  );
}
