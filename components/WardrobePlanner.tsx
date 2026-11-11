import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { Button } from "@/components/primitives/Button";

const PDF = "/Wedding_Wardrobe.pdf";

export function WardrobePlanner() {
  return (
    <Section className="text-center">
      <EyebrowLabel>A little style inspiration</EyebrowLabel>
      <h2 className="mt-4 font-display text-3xl italic text-maroon md:text-4xl">Wedding Wardrobe Planner</h2>
      <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-ink/80 md:text-lg">
        Outfit ideas and colour themes for every celebration. Tap to open it, or save a copy to your phone.
      </p>

      <a
        href={PDF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the Wedding Wardrobe Planner (PDF)"
        className="mx-auto mt-8 block w-56 transition-transform hover:-translate-y-1 md:w-64"
      >
        <Image
          src="/wardrobe-cover.jpg"
          alt="Cover of the Wedding Wardrobe Planner"
          width={636}
          height={900}
          sizes="256px"
          className="h-auto w-full rounded-lg shadow-xl ring-1 ring-gold/30"
        />
      </a>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild className="px-8">
          <a href={PDF} target="_blank" rel="noopener noreferrer">
            Open Planner
          </a>
        </Button>
        <Button asChild className="border border-maroon bg-transparent px-8 text-maroon hover:bg-maroon hover:text-ivory">
          <a href={PDF} download="Sakshi-Yash-Wedding-Wardrobe-Planner.pdf">
            Download PDF
          </a>
        </Button>
      </div>
    </Section>
  );
}
