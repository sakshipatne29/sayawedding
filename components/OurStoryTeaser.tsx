import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { Button } from "@/components/primitives/Button";

export function OurStoryTeaser() {
  return (
    <Section className="text-center">
      <EyebrowLabel>How it all began</EyebrowLabel>
      <Image
        src="/our-story-couple.png"
        alt="Illustration of Yash and Sakshi standing together in traditional outfits"
        width={927}
        height={1435}
        sizes="(min-width: 768px) 320px, 70vw"
        className="mx-auto mt-8 h-auto w-[70vw] max-w-xs"
      />
      <Button asChild className="mt-10 px-8 py-6 text-base">
        <Link href="/our-story">Open Our Story</Link>
      </Button>
    </Section>
  );
}
