import { Timeline } from "@/components/Timeline";
import { WardrobePlanner } from "@/components/WardrobePlanner";
import { VenueSection } from "@/components/VenueSection";
import { ClosingSection } from "@/components/ClosingSection";
import { SectionSeparator } from "@/components/primitives/SectionSeparator";

// Everything after the countdown, shared by the home page and the Our Story page.
export function LaterSections() {
  return (
    <>
      <SectionSeparator />
      <Timeline />
      <SectionSeparator />
      <WardrobePlanner />
      <SectionSeparator />
      <VenueSection />
      <SectionSeparator />
      <ClosingSection />
    </>
  );
}
