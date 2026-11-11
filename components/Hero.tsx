import Image from "next/image";
import { wedding } from "@/data/wedding";
import { Divider } from "@/components/primitives/Divider";

export function Hero() {
  return (
    <section className="relative flex min-h-screen min-h-dvh flex-col items-center overflow-hidden bg-ivory px-6 pb-24 pt-8 text-center md:pt-10">
      <Image
        src="/ganesh.png"
        alt="Shri Ganesh"
        width={651}
        height={836}
        priority
        sizes="160px"
        className="relative z-10 h-28 w-auto md:h-40"
      />
      {/* Red sampled from the Ganesh artwork so the title reads as part of it. */}
      <p className="relative z-10 mt-4 text-balance font-display text-[1.7rem] font-bold uppercase leading-tight tracking-wide text-[#D7263D] md:mt-6 md:text-5xl">
        {wedding.invitation.title}
      </p>

      {/* flex-1 + vh-based gaps: the message spreads to use the rest of the screen, staying centred. */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-[4vh] py-[4vh]">
        <p className="font-display text-3xl italic text-maroon md:text-5xl">
          {wedding.invitation.opening}
        </p>
        <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-ink/80 md:text-2xl md:leading-relaxed">
          {wedding.invitation.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="font-display text-2xl italic text-maroon md:text-4xl">
          {wedding.invitation.closing}
        </p>
        <div>
          <Divider />
          <h1 className="font-display text-4xl italic text-[#D7263D] md:text-6xl">
            {wedding.couple.bride} &amp; {wedding.couple.groom}
          </h1>
        </div>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-maroon/60" aria-hidden="true">
        <span className="font-body text-xs uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-maroon/40" />
      </div>
    </section>
  );
}
