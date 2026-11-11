"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { Ceremony } from "@/data/wedding";
import { useReducedMotion } from "@/lib/useReducedMotion";

// ceremony.date is a bare "YYYY-MM-DD" string. `new Date(iso)` parses that as
// UTC midnight, which then renders as the previous day for any guest west of
// UTC once toLocaleDateString applies their local timezone. Parsing the
// calendar components directly keeps the displayed date guest-timezone-proof.
function formatCeremonyDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const accentClasses: Record<Ceremony["accentColor"], { bg: string; text: string; marker: string }> = {
  maroon: { bg: "bg-maroon", text: "text-maroon", marker: "bg-maroon" },
  gold: { bg: "bg-gold", text: "text-gold", marker: "bg-gold" },
  emerald: { bg: "bg-emerald", text: "text-emerald", marker: "bg-emerald" },
  navy: { bg: "bg-navy", text: "text-navy", marker: "bg-navy" },
};

export function CeremonyEnvelope({ ceremony, index }: { ceremony: Ceremony; index: number }) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const accent = accentClasses[ceremony.accentColor];
  const alignEnd = index % 2 === 1;
  const detailId = `ceremony-${ceremony.id}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);

  // An opened card seals itself back into an envelope once it has scrolled
  // fully off screen, so every visit to the section starts with envelopes.
  useEffect(() => {
    if (!inView) setOpen(false);
  }, [inView]);

  const handleOpen = () => setOpen(true);
  const cardStyle = ceremony.cardColor ? { backgroundColor: ceremony.cardColor } : undefined;
  // Dark card colours need light text to stay readable.
  const text = ceremony.lightText
    ? { strong: "text-ivory", soft: "text-ivory/85", faint: "text-ivory/65", hint: "text-ivory/80", name: "text-ivory" }
    : { strong: "text-ink/80", soft: "text-ink/70", faint: "text-ink/50", hint: "text-maroon/70", name: accent.text };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
        ceremony.image ? "md:justify-between" : alignEnd ? "md:justify-end" : ""
      }`}
    >
      <span
        className={`absolute left-6 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ivory transition-colors md:left-1/2 ${
          open ? accent.marker : "bg-ivory ring-1 ring-gold/50"
        }`}
        aria-hidden="true"
      />
      <div className="ml-14 md:ml-0 md:w-[45%]">
        {!open ? (
          <motion.button
            type="button"
            onClick={handleOpen}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            animate={!reducedMotion ? { scale: [1, 1.02, 1] } : undefined}
            transition={
              !reducedMotion
                ? { scale: { duration: 2.4, repeat: Infinity }, opacity: { duration: 0.5 }, y: { duration: 0.5 } }
                : { duration: 0.5 }
            }
            className="w-full text-left"
            aria-expanded={false}
            aria-controls={detailId}
          >
            <div
              className="relative rounded-lg bg-blush px-6 py-10 shadow-md"
              style={cardStyle}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 bg-gold-light/70"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-center pt-6">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm text-ivory ${accent.bg}`}
                >
                  S♥Y
                </span>
                <p className={`mt-4 font-body text-xs uppercase tracking-[0.2em] ${text.hint}`}>
                  Tap to open
                </p>
                <p className={`mt-1 font-display text-xl italic ${text.name}`}>{ceremony.name}</p>
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.div
            id={detailId}
            initial={reducedMotion ? false : { rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            style={{ transformPerspective: 800, ...cardStyle }}
            className="rounded-lg border border-gold/30 bg-ivory p-6 text-left shadow-lg"
          >
            <p
              className={`font-display text-2xl italic ${accent.text}`}
              style={ceremony.titleColor ? { color: ceremony.titleColor } : undefined}
            >
              {ceremony.themeName ?? ceremony.name}
            </p>
            {ceremony.themeName && (
              <p
                className={`mt-1 font-display text-lg font-bold italic ${text.strong}`}
              >
                {ceremony.name}
              </p>
            )}
            <p className={`mt-2 font-body text-sm ${text.soft}`}>
              {ceremony.tagline}
              {ceremony.taglineFlowerColor && (
                <svg
                  viewBox="-12 -12 24 24"
                  className="ml-1.5 inline-block h-4 w-4 align-[-0.2em]"
                  aria-hidden="true"
                >
                  {[0, 72, 144, 216, 288].map((angle) => (
                    <ellipse
                      key={angle}
                      cx="0"
                      cy="-6"
                      rx="4"
                      ry="6"
                      fill={ceremony.taglineFlowerColor}
                      transform={`rotate(${angle})`}
                    />
                  ))}
                  <circle r="2.6" fill="#FFF3C4" />
                </svg>
              )}
            </p>
            <dl className={`mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-body text-sm ${text.strong}`}>
              <dt className={text.faint}>Date</dt>
              <dd>{formatCeremonyDate(ceremony.date)}</dd>
              <dt className={text.faint}>Time</dt>
              <dd>
                {ceremony.startTime}
                {ceremony.endTime ? ` – ${ceremony.endTime}` : ""}
              </dd>
              <dt className={text.faint}>Venue</dt>
              <dd>{ceremony.venueName}</dd>
            </dl>
          </motion.div>
        )}
      </div>
      {ceremony.image && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={`ml-14 md:ml-0 md:w-[45%] ${alignEnd ? "md:order-first" : ""}`}
        >
          <Image
            src={ceremony.image.src}
            alt={ceremony.image.alt}
            width={ceremony.image.width}
            height={ceremony.image.height}
            sizes="(min-width: 768px) 400px, 85vw"
            className="h-auto w-full rounded-lg shadow-lg"
          />
        </motion.div>
      )}
    </div>
  );
}
