import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { wedding } from "@/data/wedding";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { CurvedArrow } from "@/components/primitives/CurvedArrow";
import { Heart } from "@/components/primitives/Heart";
import { SectionSeparator } from "@/components/primitives/SectionSeparator";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Countdown } from "@/components/Countdown";
import { LaterSections } from "@/components/LaterSections";

export const metadata: Metadata = {
  title: `Our Story · ${wedding.couple.bride} & ${wedding.couple.groom}`,
};

function Label({
  title,
  name,
  family,
  align,
}: {
  title: string;
  name: string;
  family: string[];
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="whitespace-nowrap font-script text-2xl font-bold text-[#E8730C] md:text-3xl">
        <Heart className="mr-1.5 h-5 w-5 align-[-0.05em] md:h-6 md:w-6" />
        {title}
        <span className="text-[#EC3D8C]"> – {name}</span>
      </p>
      <p className="mt-1 font-body text-sm leading-snug text-ink/80 md:text-base">
        {family.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function OurStoryPage() {
  const { couple, families, story } = wedding;
  const groom = <Label title="The Groom" name={couple.groom} family={families.groom} align="left" />;
  const bride = <Label title="The Bride" name={couple.bride} family={families.bride} align="right" />;

  return (
    <main className="min-h-dvh bg-ivory">
      <Section className="text-center" innerClassName="max-w-5xl">
        <Link
          href="/"
          className="font-body text-sm uppercase tracking-[0.2em] text-maroon/70 hover:text-maroon"
        >
          ← Back to invitation
        </Link>
        <div className="mt-8">
          <EyebrowLabel>
            {wedding.couple.bride} &amp; {wedding.couple.groom}
          </EyebrowLabel>
        </div>
        <h1 className="mt-4 font-display text-4xl italic text-maroon md:text-5xl">Our Story</h1>

        {/* Phones: groom above the picture, bride below, arrows pointing in. */}
        <div className="mt-10 md:hidden">
          {/* Yash is on the right of the picture: label top-right, arrow curving down onto him. */}
          <div className="flex items-end justify-end gap-1">
            <Label title="The Groom" name={couple.groom} family={families.groom} align="right" />
            <CurvedArrow className="mb-[-2rem] h-12 w-20 shrink-0 rotate-[95deg] text-[#E8730C]" />
          </div>
          <Image
            src="/our-story-page.jpg"
            alt="Illustration of Sakshi holding yellow flowers and smiling with Yash"
            width={1086}
            height={1448}
            priority
            sizes="80vw"
            className="mx-auto mt-4 h-auto w-[80vw] max-w-sm rounded-2xl shadow-lg"
          />
          {/* Sakshi is on the left: label bottom-left, arrow curving up onto her. */}
          <div className="mt-4 flex items-start justify-start gap-1">
            <CurvedArrow className="mt-[-2rem] h-12 w-20 shrink-0 -rotate-[95deg] text-[#E8730C]" />
            <Label title="The Bride" name={couple.bride} family={families.bride} align="left" />
          </div>
        </div>

        {/* Desktop: bride on the left, groom on the right, arrows curving onto each. */}
        <div className="mt-10 hidden grid-cols-[1fr_auto_1fr] items-start gap-4 md:grid">
          <div className="flex flex-col items-end pt-32">
            {bride}
            <CurvedArrow className="relative z-10 -mr-12 mt-2 h-16 w-28 rotate-[15deg] text-[#E8730C]" />
          </div>
          <Image
            src="/our-story-page.jpg"
            alt="Illustration of Sakshi holding yellow flowers and smiling with Yash"
            width={1086}
            height={1448}
            priority
            sizes="384px"
            className="h-auto w-96 rounded-2xl shadow-lg"
          />
          <div className="flex flex-col items-start pt-16">
            {groom}
            <CurvedArrow className="relative z-10 -ml-12 mt-2 h-16 w-28 -scale-x-100 rotate-[-15deg] text-[#E8730C]" />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-4 font-script text-2xl leading-relaxed text-[#D1477A] md:text-3xl">
          {story.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="pt-2 font-bold">{story.closingLine}</p>
        </div>
      </Section>
      <SectionSeparator />
      <SaveTheDate />
      <SectionSeparator />
      <Countdown />
      <LaterSections />
    </main>
  );
}
