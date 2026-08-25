import { wedding } from "@/data/wedding";
import { FloatingPetals } from "@/components/FloatingPetals";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { Divider } from "@/components/primitives/Divider";

export function Hero() {
  return (
    <section className="relative flex min-h-screen min-h-dvh flex-col items-center justify-center overflow-hidden bg-ivory px-6 text-center">
      <FloatingPetals />
      <div className="relative z-10">
        <EyebrowLabel>Together with their families</EyebrowLabel>
        <p className="mt-6 font-display text-3xl text-gold" aria-hidden="true">
          ✦ S ♥ Y ✦
        </p>
        <h1 className="mt-4 font-display text-5xl italic text-maroon md:text-7xl">
          {wedding.couple.bride} &amp; {wedding.couple.groom}
        </h1>
        <Divider />
        <p className="font-body text-lg tracking-wide text-ink/80">
          {wedding.saveTheDate.dateRange}
        </p>
      </div>
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-maroon/60" aria-hidden="true">
        <span className="font-body text-xs uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-maroon/40" />
      </div>
    </section>
  );
}
