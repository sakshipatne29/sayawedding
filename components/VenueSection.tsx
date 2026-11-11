import { wedding } from "@/data/wedding";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";

export function VenueSection() {
  const venue = wedding.primaryVenue;

  return (
    <Section className="bg-gradient-to-br from-[#FFF7D9] via-[#F9E7A8] to-[#F5DC8E] text-center">
      <EyebrowLabel>Where to find us</EyebrowLabel>
      <h2 className="mt-4 inline-block rounded-full border border-maroon/30 bg-ivory/70 px-8 py-2 font-display text-3xl italic text-maroon">
        {venue.heading}
      </h2>
      <p className="mt-10 text-balance font-display text-3xl font-bold uppercase tracking-wide text-navy md:text-4xl">
        {venue.name}
      </p>
      <p className="mx-auto mt-4 max-w-md font-display text-lg italic leading-relaxed text-emerald md:text-xl">
        {venue.address}
      </p>
      <div className="mx-auto mt-8 aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border border-maroon/20 shadow-lg">
        <iframe
          src={venue.mapEmbedUrl}
          title={`Map showing ${venue.name}`}
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </Section>
  );
}
