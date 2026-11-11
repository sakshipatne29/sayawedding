import { wedding } from "@/data/wedding";
import { Section } from "@/components/primitives/Section";
import { Heart } from "@/components/primitives/Heart";

export function ClosingSection() {
  const { closing, couple } = wedding;

  return (
    <Section className="pb-24 text-center">
      <p className="flex items-center justify-center gap-3 font-body text-sm uppercase tracking-[0.3em] text-maroon/80 md:text-base">
        <Heart className="h-3.5 w-3.5" />
        {closing.signoff}
        <Heart className="h-3.5 w-3.5" />
      </p>
      <p className="mt-6 font-display text-5xl italic text-[#D7263D] md:text-6xl">
        {couple.bride} &amp; {couple.groom}
      </p>
      <p className="mx-auto mt-6 max-w-md font-display text-xl italic text-ink/80 md:text-2xl">
        {closing.line}
      </p>
      <div className="mt-8 flex items-end justify-center gap-2" aria-hidden="true">
        <Heart className="h-3 w-3 opacity-60" />
        <Heart className="h-4 w-4 opacity-80" />
        <Heart className="h-5 w-5" />
        <Heart className="h-4 w-4 opacity-80" />
        <Heart className="h-3 w-3 opacity-60" />
      </div>
    </Section>
  );
}
