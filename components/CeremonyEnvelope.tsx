"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Ceremony } from "@/data/wedding";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STORAGE_KEY = "sayawedding:opened-envelopes";

function readOpenedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistOpenedId(id: string) {
  const current = readOpenedIds();
  if (current.includes(id)) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, id]));
}

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

  useEffect(() => {
    setOpen(readOpenedIds().includes(ceremony.id));
  }, [ceremony.id]);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    persistOpenedId(ceremony.id);
  };

  return (
    <div className={`relative flex flex-col md:flex-row ${alignEnd ? "md:justify-end" : ""}`}>
      <span
        className={`absolute left-6 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ivory transition-colors md:left-1/2 ${
          open ? accent.marker : "bg-ivory ring-1 ring-gold/50"
        }`}
        aria-hidden="true"
      />
      <div className="ml-14 w-full md:ml-0 md:w-[45%]">
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
            <div className="relative rounded-lg bg-blush px-6 py-10 shadow-md">
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
                <p className="mt-4 font-body text-xs uppercase tracking-[0.2em] text-maroon/70">
                  Tap to open
                </p>
                <p className={`mt-1 font-display text-xl italic ${accent.text}`}>{ceremony.name}</p>
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.div
            id={detailId}
            initial={reducedMotion ? false : { rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            style={{ transformPerspective: 800 }}
            className="rounded-lg border border-gold/30 bg-ivory p-6 text-left shadow-lg"
          >
            <p className={`font-display text-2xl italic ${accent.text}`}>{ceremony.name}</p>
            <p className="mt-1 font-body text-sm text-ink/70">{ceremony.tagline}</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-body text-sm text-ink/80">
              <dt className="text-ink/50">Date</dt>
              <dd>{formatCeremonyDate(ceremony.date)}</dd>
              <dt className="text-ink/50">Time</dt>
              <dd>
                {ceremony.startTime}
                {ceremony.endTime ? ` – ${ceremony.endTime}` : ""}
              </dd>
              <dt className="text-ink/50">Venue</dt>
              <dd>{ceremony.venueName}</dd>
              <dt className="text-ink/50">Attire</dt>
              <dd>{ceremony.attire}</dd>
            </dl>
          </motion.div>
        )}
      </div>
    </div>
  );
}
