# Sakshi & Yash — Wedding Invitation Site: Design

## Overview

A single-page, scroll-driven, mobile-first wedding invitation site. Two signature interactions carry the "fun" factor: a scratch-to-reveal save-the-date, and tap-to-open envelope cards for each ceremony. Guests will mostly open this from a WhatsApp link on mid-range phones over mobile data.

**Couple:** Bride — Sakshi · Groom — Yash

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Framer Motion (all interactive animation)
- shadcn/ui (form + button primitives only, not themed defaults)
- Supabase (RSVP storage)
- Deployed on Vercel
- Package manager: npm

## Design tokens (carry over exactly, already validated)

```
--ivory: #FBF7F0
--blush: #F6E3E2
--maroon: #4A0E1F
--maroon-deep: #31070F
--gold: #C9962F
--gold-light: #E9CE8F
--emerald: #1F4A3D
--navy: #1C2B47
--ink: #2B1B1F
```

Fonts: Cormorant Garamond (display/italic, script moments only) + Jost (body/labels), via `next/font/google`.

`prefers-reduced-motion` must be respected everywhere, centralized in one hook (see below) rather than duplicated per component.

## Provenance note

The brief references an "HTML prototype" as the source of these tokens and component behavior, but no such file exists in this project — confirmed with the user. We are building directly from the brief's written description as the full spec, with realistic placeholder content standing in for real wedding details until the user provides them.

## Data model — `/data/wedding.ts`

Single typed config file. Every section pulls content from here — no hardcoded copy in components. This is the file later phases depend on most heavily; restructure only with explicit user sign-off.

```typescript
export interface Ceremony {
  id: string;                // "haldi", "mehendi", "wedding", "reception"
  name: string;               // "Haldi Ceremony"
  tagline: string;            // short italic line
  date: string;                // ISO date "2026-12-04"
  startTime: string;           // "10:00 AM"
  endTime?: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;              // Google Maps link/embed src
  attire: string;
  accentColor: "maroon" | "gold" | "emerald" | "navy"; // maps to design tokens
}

export interface WeddingConfig {
  couple: { bride: string; groom: string };
  hashtag: string;
  saveTheDate: { headline: string; dateRange: string };
  countdownTarget: string;     // ISO datetime for the primary ceremony
  ceremonies: Ceremony[];
  primaryVenue: { name: string; address: string; mapEmbedUrl: string };
}

export const wedding: WeddingConfig = { /* placeholder data */ };
```

Placeholder content: 3 ceremonies (Haldi, Wedding, Reception) with fictional venues/addresses and dates a few months out, to be swapped for real details later.

## Folder structure

```
/app
  layout.tsx        — fonts, metadata/OG tags, <FloatingPetals> mount
  page.tsx           — composes all sections in order
  globals.css        — CSS variables, base typography
/components
  primitives/        — Section, Divider, EyebrowLabel, Button
  FloatingPetals.tsx
  Hero.tsx
  Countdown.tsx
  ScratchCard.tsx     — generic, reusable, no wedding-specific content
  Timeline.tsx        — gold thread + marker rail, maps ceremonies -> CeremonyEnvelope
  CeremonyEnvelope.tsx
  VenueMap.tsx
  RsvpForm.tsx
  Gallery.tsx         — built last, only if time allows
/data
  wedding.ts
/lib
  supabase.ts         — client init from env vars
  useReducedMotion.ts  — shared hook wrapping prefers-reduced-motion
```

## Key components

**`<ScratchCard>`** — generic canvas component taking `revealThreshold`, `hintIcon`, and `children` (hidden content) as props; not coupled to save-the-date copy. Pointer events (mouse + touch) drag to erase via `globalCompositeOperation = 'destination-out'`. Scratched percentage sampled from canvas pixel alpha on an interval; past `revealThreshold` (default 55%), the rest animates away automatically. Visible "Reveal" tap target as a fallback for accessibility / non-pointer devices. "Scratch here" hint pulses before first interaction.

**`<CeremonyEnvelope>`** — per-card state machine, `closed → open`. Closed state: envelope shape (clip-path or inline SVG), wax-seal "S ♥ Y" monogram, idle breathing animation. Open state: flap animates open (Framer Motion, ~500ms spring), detail card slides/fades out. Open/closed state persisted to `localStorage` keyed by ceremony `id`; on mount, already-opened cards restore instantly without replaying the animation. Timeline marker lights up gold once opened. Unopened envelopes stagger into view via `whileInView`.

**`useReducedMotion`** — single hook wrapping the `prefers-reduced-motion` media query; every animated component (petals, envelope flap, scratch auto-reveal, countdown) reads from it instead of duplicating the check. Under reduced motion: petals don't render, envelope flap shows instant open/closed state, scratch card reveals instantly on threshold instead of animating.

## Supabase schema

```sql
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  guest_name text not null,
  attending_count int not null,
  ceremonies text[] not null,   -- array of ceremony ids they'll attend
  meal_preference text,
  message text
);
```

`.env.local` holds placeholder Supabase URL/anon key until the user creates a real project (Phase 7). RSVP submit failure shows an inline form error state, not a crash.

## Build approach

Phased build matching the brief's Phase 0–11 order. After each phase, run the dev server and visually check it before moving to the next — nothing is scaffolded ahead of when it's needed. `/data/wedding.ts`'s shape (above) is confirmed up front since later phases depend on it; any restructuring later requires explicit user sign-off.

## Testing & verification

No unit test framework requested. Verification is: visual check per phase in the browser, a Lighthouse mobile pass in Phase 10, and a color-contrast check on card text. The scratch card and envelope tap interactions need an explicit touchscreen check — this will be flagged to the user, since it can't be verified from a desktop browser alone; the user will need to try it on their phone once deployed or via a local network preview.

## Git & deployment

`git init` happens as part of Phase 0 (via `create-next-app`). GitHub push and Vercel connection happen only in Phase 11, with explicit user confirmation before pushing or deploying anything. Supabase env vars get added to Vercel project settings at that point. OG preview gets verified by pasting the live link into a WhatsApp chat, since that's the primary distribution channel for guests.
