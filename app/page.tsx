import { Hero } from "@/components/Hero";
import { FloatingPetals } from "@/components/FloatingPetals";
import { OurStoryTeaser } from "@/components/OurStoryTeaser";
import { Countdown } from "@/components/Countdown";
import { SaveTheDate } from "@/components/SaveTheDate";
import { LaterSections } from "@/components/LaterSections";
import { SectionSeparator } from "@/components/primitives/SectionSeparator";

export default function Home() {
  return (
    <main>
      {/* The petal shower covers everything from the top through the countdown. */}
      <div className="relative">
        <Hero />
        <SectionSeparator />
        <OurStoryTeaser />
        <SectionSeparator />
        <SaveTheDate />
        <SectionSeparator />
        <Countdown />
        <FloatingPetals className="z-20" />
      </div>
      <LaterSections />
    </main>
  );
}
