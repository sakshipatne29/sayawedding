# Sakshi & Yash Wedding Invitation Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single-page, scroll-driven, mobile-first wedding invitation site described in `docs/superpowers/specs/2026-08-26-wedding-invitation-site-design.md`, including the scratch-to-reveal save-the-date and tap-to-open ceremony envelope interactions, an RSVP form backed by Supabase, and a WhatsApp-friendly OG preview.

**Architecture:** Next.js 14 App Router site with one config file (`/data/wedding.ts`) driving all content, a small set of focused presentational components under `/components`, and two client-side interactive components (`ScratchCard`, `CeremonyEnvelope`) built as isolated units with their own state. Supabase handles RSVP storage via a single `rsvps` table.

**Tech Stack:** Next.js 14 (TypeScript, App Router), Tailwind CSS, Framer Motion, shadcn/ui (Button + Form primitives only), Supabase, deployed on Vercel.

**Testing note (deviation from default plan template):** The approved spec states no unit test framework is used for this project — verification is a visual check per phase in the browser plus a Lighthouse pass and manual touchscreen check late in the build. Task steps below replace "write failing test" with "write component" + "type-check" + "visual/interaction check in the browser" accordingly. `npx tsc --noEmit` is used as a cheap automated correctness gate on every code task.

---

## Phase 0 — Project Setup

### Task 1: Scaffold project configuration and verify the dev server boots

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `.eslintrc.json`
- Create: `.gitignore`
- Create: `next-env.d.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "saya-wedding",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.3.0",
    "lucide-react": "^0.400.0",
    "@supabase/supabase-js": "^2.45.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4.4",
    "postcss": "^8.4.39",
    "autoprefixer": "^10.4.19",
    "eslint": "^8",
    "eslint-config-next": "14.2.5"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Write `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Write `postcss.config.mjs`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: Write `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 6: Write `.gitignore`**

```
node_modules
.next
out
.env*.local
.DS_Store
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 7: Write `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 8: Write minimal `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 9: Write minimal `app/layout.tsx`**

```tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 10: Write minimal `app/page.tsx`**

```tsx
export default function Home() {
  return <main className="p-8">Saya Wedding — scaffold OK</main>;
}
```

- [ ] **Step 11: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `package-lock.json` and `node_modules/`.

- [ ] **Step 12: Verify dev server boots**

Run: `npm run dev` (in background), then check `http://localhost:3000` in the browser.
Expected: page loads showing "Saya Wedding — scaffold OK" with no console errors. Stop the dev server after confirming.

- [ ] **Step 13: Commit**

```bash
git add package.json tsconfig.json next.config.mjs postcss.config.mjs .eslintrc.json .gitignore next-env.d.ts app/
git commit -m "chore: scaffold Next.js project"
```

---

### Task 2: Tailwind design tokens + Google Fonts wiring

**Files:**
- Create: `tailwind.config.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write `tailwind.config.ts` with the validated design tokens**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF7F0",
        blush: "#F6E3E2",
        maroon: { DEFAULT: "#4A0E1F", deep: "#31070F" },
        gold: { DEFAULT: "#C9962F", light: "#E9CE8F" },
        emerald: "#1F4A3D",
        navy: "#1C2B47",
        ink: "#2B1B1F",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Wire Cormorant Garamond + Jost into `app/layout.tsx`**

```tsx
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable} font-body bg-ivory text-ink`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Update `app/page.tsx` to smoke-test the tokens**

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ivory p-8">
      <p className="font-display text-4xl italic text-maroon">Sakshi &amp; Yash</p>
      <p className="font-body text-sm uppercase tracking-widest text-gold">Design tokens OK</p>
    </main>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: "Sakshi & Yash" renders in italic serif (Cormorant Garamond) maroon text, "Design tokens OK" renders in Jost gold uppercase text.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/layout.tsx app/page.tsx
git commit -m "feat: wire Tailwind design tokens and Google Fonts"
```

---

### Task 3: Data model — `/data/wedding.ts`

**Files:**
- Create: `data/wedding.ts`

- [ ] **Step 1: Write the typed config with placeholder content**

```ts
export type AccentColor = "maroon" | "gold" | "emerald" | "navy";

export interface Ceremony {
  id: string;
  name: string;
  tagline: string;
  date: string; // ISO date, e.g. "2026-12-04"
  startTime: string; // "10:00 AM"
  endTime?: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  attire: string;
  accentColor: AccentColor;
}

export interface WeddingConfig {
  couple: { bride: string; groom: string };
  hashtag: string;
  saveTheDate: { headline: string; dateRange: string };
  countdownTarget: string; // ISO datetime
  ceremonies: Ceremony[];
  primaryVenue: { name: string; address: string; mapEmbedUrl: string };
}

export const wedding: WeddingConfig = {
  couple: { bride: "Sakshi", groom: "Yash" },
  hashtag: "#SakshiWedsYash",
  saveTheDate: {
    headline: "We're Getting Married!",
    dateRange: "December 4–6, 2026",
  },
  countdownTarget: "2026-12-04T10:00:00+05:30",
  primaryVenue: {
    name: "The Grand Ivory Lawns",
    address: "14 Palm Grove Road, Alibaug, Maharashtra 402201",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.0!2d72.87!3d18.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM4JzI0LjAiTiA3MsKwNTInMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000",
  },
  ceremonies: [
    {
      id: "haldi",
      name: "Haldi Ceremony",
      tagline: "A morning of turmeric, laughter, and yellow everything",
      date: "2026-12-04",
      startTime: "10:00 AM",
      endTime: "1:00 PM",
      venueName: "The Grand Ivory Lawns — Garden Pavilion",
      venueAddress: "14 Palm Grove Road, Alibaug, Maharashtra 402201",
      mapUrl: "https://maps.google.com/?q=The+Grand+Ivory+Lawns+Alibaug",
      attire: "Yellow & mustard, traditional",
      accentColor: "gold",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      tagline: "Two families, one sacred fire",
      date: "2026-12-05",
      startTime: "7:00 PM",
      endTime: "11:00 PM",
      venueName: "The Grand Ivory Lawns — Main Mandap",
      venueAddress: "14 Palm Grove Road, Alibaug, Maharashtra 402201",
      mapUrl: "https://maps.google.com/?q=The+Grand+Ivory+Lawns+Alibaug",
      attire: "Traditional formal, maroon & gold encouraged",
      accentColor: "maroon",
    },
    {
      id: "reception",
      name: "Reception",
      tagline: "Dinner, dancing, and a toast to forever",
      date: "2026-12-06",
      startTime: "8:00 PM",
      venueName: "The Grand Ivory Lawns — Emerald Hall",
      venueAddress: "14 Palm Grove Road, Alibaug, Maharashtra 402201",
      mapUrl: "https://maps.google.com/?q=The+Grand+Ivory+Lawns+Alibaug",
      attire: "Cocktail / Indo-western formal",
      accentColor: "emerald",
    },
  ],
};
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add data/wedding.ts
git commit -m "feat: add wedding config data model with placeholder content"
```

---

## Phase 1 — Global Layout & Design System

### Task 4: `globals.css` variables + typography scale

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add CSS variables and base typography**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ivory: #FBF7F0;
  --blush: #F6E3E2;
  --maroon: #4A0E1F;
  --maroon-deep: #31070F;
  --gold: #C9962F;
  --gold-light: #E9CE8F;
  --emerald: #1F4A3D;
  --navy: #1C2B47;
  --ink: #2B1B1F;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--ivory);
  color: var(--ink);
}

h1, h2, h3 {
  font-family: var(--font-display), serif;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: page still renders as before (Task 2's smoke test content), no visual regressions.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add global CSS variables and base typography"
```

---

### Task 5: Layout primitives + shadcn/ui Button

**Files:**
- Create: `components/primitives/Section.tsx`
- Create: `components/primitives/Divider.tsx`
- Create: `components/primitives/EyebrowLabel.tsx`
- Create: `components.json`
- Create: `lib/utils.ts`
- Create: `components/primitives/Button.tsx`

- [ ] **Step 1: Write `components/primitives/Section.tsx`**

```tsx
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
}

export function Section({ children, className = "", innerClassName = "max-w-3xl", id }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-16 md:py-24 ${className}`}>
      <div className={`mx-auto ${innerClassName}`}>{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/primitives/Divider.tsx`**

```tsx
export function Divider() {
  return (
    <div className="my-8 flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-12 bg-gold/60" />
      <span className="text-gold text-sm">✦</span>
      <span className="h-px w-12 bg-gold/60" />
    </div>
  );
}
```

- [ ] **Step 3: Write `components/primitives/EyebrowLabel.tsx`**

```tsx
import { ReactNode } from "react";

export function EyebrowLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-center font-body text-xs uppercase tracking-[0.3em] text-maroon/70">
      {children}
    </p>
  );
}
```

- [ ] **Step 4: Write `components.json` for shadcn/ui (neutral base, no themed CSS variables — we apply our own tokens via className)**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": false,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

- [ ] **Step 5: Add the shadcn/ui Button component**

Run: `npx shadcn@latest add button -y`
Expected: creates `components/ui/button.tsx` and `lib/utils.ts`, and installs `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot` into `package.json`.

- [ ] **Step 6: Write `components/primitives/Button.tsx` wrapping the shadcn Button with our tokens**

```tsx
import { ComponentProps } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

type ButtonProps = ComponentProps<typeof ShadcnButton>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <ShadcnButton
      className={`rounded-full bg-maroon font-body text-sm uppercase tracking-widest text-ivory hover:bg-maroon-deep ${className}`}
      {...props}
    />
  );
}
```

- [ ] **Step 7: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add components/primitives components.json lib/utils.ts package.json package-lock.json
git commit -m "feat: add layout primitives and shadcn/ui Button"
```

---

### Task 6: `useReducedMotion` hook + `FloatingPetals`

**Files:**
- Create: `lib/useReducedMotion.ts`
- Create: `components/FloatingPetals.tsx`

- [ ] **Step 1: Write `lib/useReducedMotion.ts`**

```ts
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Write `components/FloatingPetals.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: 10 + Math.random() * 14,
    duration: 12 + Math.random() * 10,
    delay: Math.random() * 10,
    rotation: Math.random() * 360,
  }));
}

export function FloatingPetals({ count = 18 }: { count?: number }) {
  const reducedMotion = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(generatePetals(count));
  }, [count]);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute block rounded-full bg-gold-light/60"
          style={{ left: `${petal.left}%`, width: petal.size, height: petal.size * 0.7 }}
          initial={{ y: "-10%", opacity: 0, rotate: petal.rotation }}
          animate={{ y: "110%", opacity: [0, 1, 1, 0], rotate: petal.rotation + 180 }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Install Framer Motion (if not already present) and type-check**

Run: `npm install` (framer-motion is already in `package.json` from Task 1; this ensures `node_modules` is current), then `npx tsc --noEmit`.
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/useReducedMotion.ts components/FloatingPetals.tsx
git commit -m "feat: add useReducedMotion hook and FloatingPetals component"
```

(No standalone visual check here — `FloatingPetals` is not yet mounted anywhere. It will be visually verified when `Hero` mounts it in Task 8.)

---

### Task 7: Root layout metadata + OG image route

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Add metadata to `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { wedding } from "@/data/wedding";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const title = `${wedding.couple.bride} & ${wedding.couple.groom} are getting married`;
const description = `Join us to celebrate ${wedding.couple.bride} and ${wedding.couple.groom} — ${wedding.saveTheDate.dateRange}. ${wedding.hashtag}`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable} font-body bg-ivory text-ink`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Write `app/opengraph-image.tsx` (generates the OG image from code — no external asset needed)**

```tsx
import { ImageResponse } from "next/og";
import { wedding } from "@/data/wedding";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FBF7F0",
        }}
      >
        <div style={{ fontSize: 28, color: "#C9962F", letterSpacing: 6 }}>
          TOGETHER WITH THEIR FAMILIES
        </div>
        <div style={{ fontSize: 96, color: "#4A0E1F", fontStyle: "italic", marginTop: 24 }}>
          {wedding.couple.bride} &amp; {wedding.couple.groom}
        </div>
        <div style={{ fontSize: 32, color: "#2B1B1F", marginTop: 24 }}>
          {wedding.saveTheDate.dateRange}
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, open `http://localhost:3000/opengraph-image` directly in the browser.
Expected: a 1200x630 PNG renders showing "Sakshi & Yash" in maroon italic on an ivory background. Also view page source of `http://localhost:3000` and confirm `<title>` and `<meta property="og:title">` reflect the couple's names.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/opengraph-image.tsx
git commit -m "feat: add page metadata and generated OG image"
```

---

## Phase 2 — Hero Section

### Task 8: Hero component

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `components/Hero.tsx`**

```tsx
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
```

(`min-h-dvh` is listed after `min-h-screen` deliberately — Tailwind lets the later rule win on browsers that support the `dvh` unit, which avoids `100vh`'s known iOS/mobile-Chrome overflow behind the address bar, while `min-h-screen` still applies as a fallback on older browsers. The scroll cue is `aria-hidden` since it's a purely visual affordance with no interactive target — the document order already conveys "more content below" to assistive tech.)

- [ ] **Step 2: Mount it in `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Visual checkpoint**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: full-viewport hero, centered, "Sakshi & Yash" in large italic maroon serif, gold petals gently drifting behind the text, scroll cue at the bottom. Toggle "Emulate CSS prefers-reduced-motion: reduce" in Chrome DevTools Rendering tab and confirm the petals disappear entirely.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section"
```

---

## Phase 3 — Live Countdown

### Task 9: Countdown component

**Files:**
- Create: `components/Countdown.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `components/Countdown.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(wedding.countdownTarget));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(wedding.countdownTarget));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = timeLeft
    ? [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
      ]
    : [];

  return (
    <div className="w-full bg-maroon py-8 text-ivory">
      <div className="mx-auto flex max-w-2xl items-center justify-center gap-6 px-6 md:gap-12">
        {units.length === 0 ? (
          <p className="font-body text-sm uppercase tracking-widest">Loading countdown…</p>
        ) : (
          units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span className="font-display text-4xl md:text-5xl">{unit.value}</span>
              <span className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-gold-light">
                {unit.label}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

Note: the `timeLeft === null` initial render (server-rendered) intentionally shows "Loading countdown…" so the server-rendered HTML matches the client's first paint before `useEffect` runs — this avoids a hydration mismatch.

- [ ] **Step 2: Mount it in `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
    </main>
  );
}
```

- [ ] **Step 3: Visual checkpoint**

Run: `npm run dev`, open `http://localhost:3000`, scroll to the maroon countdown band.
Expected: Days/Hours/Min/Sec tick down every second with no flash of mismatched content and no hydration warnings in the browser console.

- [ ] **Step 4: Commit**

```bash
git add components/Countdown.tsx app/page.tsx
git commit -m "feat: add live Countdown component"
```

---

## Phase 4 — Scratch-to-Reveal Save-the-Date

### Task 10: `ScratchCard` generic component

**Files:**
- Create: `components/ScratchCard.tsx`

- [ ] **Step 1: Write `components/ScratchCard.tsx`**

```tsx
"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ScratchCardProps {
  children: ReactNode;
  width?: number;
  height?: number;
  revealThreshold?: number;
  overlayColor?: string;
  className?: string;
}

export function ScratchCard({
  children,
  width = 320,
  height = 400,
  revealThreshold = 0.55,
  overlayColor = "#C9962F",
  className = "",
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const hasScratched = useRef(false);
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = overlayColor;
    ctx.fillRect(0, 0, width, height);
    ctx.font = "600 16px Jost, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to reveal", width / 2, height / 2);

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();
    };

    const checkScratchedPercent = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      let total = 0;
      const sampleStep = 32;
      for (let i = 3; i < imageData.length; i += sampleStep) {
        total++;
        if (imageData[i] === 0) transparent++;
      }
      if (total > 0 && transparent / total >= revealThreshold) {
        setRevealed(true);
      }
    };

    let checkInterval: ReturnType<typeof setInterval> | null = null;

    const startDrawing = (e: PointerEvent) => {
      isDrawing.current = true;
      if (!hasScratched.current) {
        hasScratched.current = true;
        setShowHint(false);
        checkInterval = setInterval(checkScratchedPercent, 400);
      }
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const draw = (e: PointerEvent) => {
      if (!isDrawing.current) return;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const stopDrawing = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointerleave", stopDrawing);

    return () => {
      canvas.removeEventListener("pointerdown", startDrawing);
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerup", stopDrawing);
      canvas.removeEventListener("pointerleave", stopDrawing);
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [width, height, revealThreshold, overlayColor, reducedMotion]);

  return (
    <div className={`relative select-none ${className}`} style={{ width, height }}>
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-ivory p-6 text-center shadow-lg">
        {children}
      </div>
      <AnimatePresence>
        {!revealed && (
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 touch-none rounded-2xl"
            style={{ width, height }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      {!revealed && showHint && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <span className="text-3xl">👆</span>
        </motion.div>
      )}
      {!revealed && (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="absolute bottom-3 right-3 rounded-full bg-maroon px-4 py-1.5 font-body text-xs uppercase tracking-widest text-ivory shadow"
        >
          Reveal
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ScratchCard.tsx
git commit -m "feat: add generic ScratchCard component"
```

---

### Task 11: Save-the-date section wiring `ScratchCard`

**Files:**
- Create: `components/SaveTheDate.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `components/SaveTheDate.tsx`**

```tsx
import { wedding } from "@/data/wedding";
import { ScratchCard } from "@/components/ScratchCard";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";

export function SaveTheDate() {
  return (
    <Section className="flex flex-col items-center text-center">
      <EyebrowLabel>A little surprise</EyebrowLabel>
      <h2 className="mt-4 font-display text-3xl italic text-maroon">Save the Date</h2>
      <div className="mt-8">
        <ScratchCard>
          <div>
            <p className="font-display text-2xl italic text-maroon">{wedding.saveTheDate.headline}</p>
            <p className="mt-3 font-body text-lg text-ink/80">{wedding.saveTheDate.dateRange}</p>
          </div>
        </ScratchCard>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Mount it in `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { SaveTheDate } from "@/components/SaveTheDate";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <SaveTheDate />
    </main>
  );
}
```

- [ ] **Step 3: Visual + interaction checkpoint**

Run: `npm run dev`, open `http://localhost:3000`, scroll to Save the Date.
Expected: gold overlay with "Scratch to reveal" text and a pulsing finger hint. Click-drag across the canvas erases it; once roughly 55% is scratched, the rest fades/scales away automatically revealing the message. Click "Reveal" and confirm it also works as an immediate fallback. Reload the page and confirm the card resets (not persisted — matches spec, only envelope state persists).

- [ ] **Step 4: Flag for later:** this interaction must also be checked on an actual touchscreen device — not verifiable from a desktop browser. Carry this forward to the Phase 10 polish pass.

- [ ] **Step 5: Commit**

```bash
git add components/SaveTheDate.tsx app/page.tsx
git commit -m "feat: add Save the Date section with scratch-to-reveal"
```

---

## Phase 5 — Ceremony Timeline with Envelope-Open Cards

### Task 12: `CeremonyEnvelope` component

**Files:**
- Create: `components/CeremonyEnvelope.tsx`

- [ ] **Step 1: Write `components/CeremonyEnvelope.tsx`**

```tsx
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
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function persistOpenedId(id: string) {
  const current = readOpenedIds();
  if (current.includes(id)) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, id]));
}

const accentClasses: Record<Ceremony["accentColor"], { bg: string; text: string; marker: string }> = {
  maroon: { bg: "bg-maroon", text: "text-maroon", marker: "bg-maroon" },
  gold: { bg: "bg-gold", text: "text-gold", marker: "bg-gold" },
  emerald: { bg: "bg-emerald", text: "text-emerald", marker: "bg-emerald" },
  navy: { bg: "bg-navy", text: "text-navy", marker: "bg-navy" },
};

export function CeremonyEnvelope({ ceremony, index }: { ceremony: Ceremony; index: number }) {
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const reducedMotion = useReducedMotion();
  const accent = accentClasses[ceremony.accentColor];
  const alignEnd = index % 2 === 1;

  useEffect(() => {
    setOpen(readOpenedIds().includes(ceremony.id));
    setHydrated(true);
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
        <motion.button
          type="button"
          onClick={handleOpen}
          initial={hydrated ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          animate={!open && !reducedMotion ? { scale: [1, 1.02, 1] } : undefined}
          transition={
            !open && !reducedMotion
              ? { scale: { duration: 2.4, repeat: Infinity }, opacity: { duration: 0.5 }, y: { duration: 0.5 } }
              : { duration: 0.5 }
          }
          className="w-full text-left"
          aria-expanded={open}
        >
          {!open ? (
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
          ) : (
            <motion.div
              initial={reducedMotion ? false : { rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              style={{ transformPerspective: 800 }}
              className="rounded-lg border border-gold/30 bg-ivory p-6 shadow-lg"
            >
              <p className={`font-display text-2xl italic ${accent.text}`}>{ceremony.name}</p>
              <p className="mt-1 font-body text-sm text-ink/70">{ceremony.tagline}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-body text-sm text-ink/80">
                <dt className="text-ink/50">Date</dt>
                <dd>
                  {new Date(ceremony.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
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
        </motion.button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/CeremonyEnvelope.tsx
git commit -m "feat: add CeremonyEnvelope component"
```

---

### Task 13: `Timeline` component + mount

**Files:**
- Create: `components/Timeline.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `components/Timeline.tsx`**

```tsx
import { wedding } from "@/data/wedding";
import { CeremonyEnvelope } from "@/components/CeremonyEnvelope";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";

export function Timeline() {
  return (
    <Section className="relative" innerClassName="max-w-4xl">
      <EyebrowLabel>The Celebrations</EyebrowLabel>
      <h2 className="mt-4 text-center font-display text-3xl italic text-maroon">Our Ceremonies</h2>
      <div className="relative mt-16">
        <div className="absolute left-6 top-0 h-full w-px bg-gold/40 md:left-1/2" aria-hidden="true" />
        <div className="flex flex-col gap-16">
          {wedding.ceremonies.map((ceremony, index) => (
            <CeremonyEnvelope key={ceremony.id} ceremony={ceremony} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Mount it in `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <SaveTheDate />
      <Timeline />
    </main>
  );
}
```

- [ ] **Step 3: Visual + interaction checkpoint**

Run: `npm run dev`, open `http://localhost:3000`, scroll to Our Ceremonies.
Expected: gold vertical thread with three envelope cards alternating sides on desktop (stacked on mobile), each gently breathing/pulsing when closed. Clicking one flips it open with a spring animation showing the ceremony detail grid, and its timeline marker turns solid gold. Reload the page — the opened card should still show open (persisted via `localStorage`).

- [ ] **Step 4: Flag for later:** tap-to-open must also be checked on an actual touchscreen device. Carry forward to the Phase 10 polish pass alongside the scratch card.

- [ ] **Step 5: Commit**

```bash
git add components/Timeline.tsx app/page.tsx
git commit -m "feat: add ceremony Timeline with envelope cards"
```

---

## Phase 6 — Venue & Directions

### Task 14: `VenueMap` component + mount

**Files:**
- Create: `components/VenueMap.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `components/VenueMap.tsx`**

```tsx
import { wedding } from "@/data/wedding";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";

export function VenueMap() {
  const { primaryVenue, ceremonies } = wedding;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primaryVenue.address)}`;

  return (
    <Section className="text-center">
      <EyebrowLabel>Getting There</EyebrowLabel>
      <h2 className="mt-4 font-display text-3xl italic text-maroon">{primaryVenue.name}</h2>
      <p className="mt-2 font-body text-ink/70">{primaryVenue.address}</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-gold/30 shadow-md">
        <iframe
          title={primaryVenue.name}
          src={primaryVenue.mapEmbedUrl}
          width="100%"
          height="320"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-maroon px-6 py-2.5 font-body text-sm uppercase tracking-widest text-ivory transition hover:bg-maroon-deep"
      >
        Get Directions
      </a>
      <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
        {ceremonies.map((ceremony) => (
          <div key={ceremony.id} className="rounded-xl bg-blush/60 p-4">
            <p className="font-display italic text-maroon">{ceremony.name}</p>
            <p className="mt-1 font-body text-sm text-ink/70">{ceremony.venueName}</p>
            <p className="font-body text-xs text-ink/50">{ceremony.venueAddress}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Mount it in `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Timeline } from "@/components/Timeline";
import { VenueMap } from "@/components/VenueMap";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <SaveTheDate />
      <Timeline />
      <VenueMap />
    </main>
  );
}
```

- [ ] **Step 3: Visual checkpoint**

Run: `npm run dev`, open `http://localhost:3000`, scroll to Getting There.
Expected: embedded map loads, "Get Directions" opens Google Maps in a new tab with the venue address prefilled, and the three per-ceremony mini address blocks render below.

- [ ] **Step 4: Commit**

```bash
git add components/VenueMap.tsx app/page.tsx
git commit -m "feat: add VenueMap section with directions and per-ceremony addresses"
```

---

## Phase 7 — RSVP Form

### Task 15: Supabase client + env vars + table schema

**Files:**
- Create: `lib/supabase.ts`
- Create: `.env.local`
- Create: `.env.local.example`
- Create: `supabase/schema.sql`

- [ ] **Step 1: Write `lib/supabase.ts`**

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 2: Write `.env.local` and `.env.local.example` with placeholder values**

`.env.local` (gitignored — real values go here later):
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

`.env.local.example` (committed, documents the required vars):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- [ ] **Step 3: Write `supabase/schema.sql` — run this in the Supabase SQL editor once the user creates their project**

```sql
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  guest_name text not null,
  attending_count int not null,
  ceremonies text[] not null,
  meal_preference text,
  message text
);

alter table rsvps enable row level security;

create policy "Allow public inserts"
  on rsvps for insert
  to anon
  with check (true);
```

The insert-only policy lets the public RSVP form write rows with the anon key while preventing anyone from reading other guests' responses back through the client.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (the empty-string fallback env vars are enough for `createClient` to construct without throwing at import time).

- [ ] **Step 5: Commit**

```bash
git add lib/supabase.ts .env.local.example supabase/schema.sql
git commit -m "feat: add Supabase client, env var template, and rsvps table schema"
```

Note: `.env.local` is gitignored and intentionally not committed.

---

### Task 16: `RsvpForm` (shadcn/ui form) + mount

**Files:**
- Modify: `package.json` (via npm install)
- Create: `components/RsvpForm.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Install form dependencies**

Run: `npm install react-hook-form zod @hookform/resolvers`
Expected: added to `dependencies` in `package.json`.

- [ ] **Step 2: Add the remaining shadcn/ui form components**

Run: `npx shadcn@latest add input textarea checkbox label form -y`
Expected: creates `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/checkbox.tsx`, `components/ui/label.tsx`, `components/ui/form.tsx`, and installs `@radix-ui/react-checkbox` and `@radix-ui/react-label`.

- [ ] **Step 3: Write `components/RsvpForm.tsx`**

```tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/primitives/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const rsvpSchema = z.object({
  guestName: z.string().min(2, "Please enter your name"),
  attendingCount: z.coerce.number().min(1, "At least 1 guest").max(10, "Max 10 guests"),
  ceremonies: z.array(z.string()).min(1, "Select at least one ceremony"),
  mealPreference: z.string().optional(),
  message: z.string().optional(),
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guestName: "", attendingCount: 1, ceremonies: [], mealPreference: "", message: "" },
  });

  const onSubmit = async (values: RsvpFormValues) => {
    setError(null);
    const { error: supabaseError } = await supabase.from("rsvps").insert({
      guest_name: values.guestName,
      attending_count: values.attendingCount,
      ceremonies: values.ceremonies,
      meal_preference: values.mealPreference || null,
      message: values.message || null,
    });
    if (supabaseError) {
      setError("Something went wrong submitting your RSVP. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-xl">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-blush p-10 text-center"
          >
            <p className="font-display text-2xl italic text-maroon">Thank you!</p>
            <p className="mt-2 font-body text-ink/70">We can&apos;t wait to celebrate with you.</p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attendingCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number Attending</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ceremonies"
                  render={() => (
                    <FormItem>
                      <FormLabel>Which ceremonies will you join?</FormLabel>
                      <div className="flex flex-col gap-2">
                        {wedding.ceremonies.map((ceremony) => (
                          <FormField
                            key={ceremony.id}
                            control={form.control}
                            name="ceremonies"
                            render={({ field }) => {
                              const checked = field.value?.includes(ceremony.id);
                              return (
                                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={checked}
                                      onCheckedChange={(isChecked) => {
                                        const next = isChecked
                                          ? [...field.value, ceremony.id]
                                          : field.value.filter((id: string) => id !== ceremony.id);
                                        field.onChange(next);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-body font-normal">{ceremony.name}</FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mealPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Preference</FormLabel>
                      <FormControl>
                        <Input placeholder="Vegetarian, Jain, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (optional)</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && <p className="font-body text-sm text-maroon">{error}</p>}

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sending…" : "Send RSVP"}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 4: Mount it in `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Timeline } from "@/components/Timeline";
import { VenueMap } from "@/components/VenueMap";
import { RsvpForm } from "@/components/RsvpForm";
import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <SaveTheDate />
      <Timeline />
      <VenueMap />
      <Section className="text-center">
        <EyebrowLabel>Join Us</EyebrowLabel>
        <h2 className="mt-4 font-display text-3xl italic text-maroon">RSVP</h2>
        <div className="mt-8">
          <RsvpForm />
        </div>
      </Section>
    </main>
  );
}
```

- [ ] **Step 5: Visual checkpoint**

Run: `npm run dev`, open `http://localhost:3000`, scroll to RSVP.
Expected: all fields render with our design tokens (not shadcn's default gray theme), client-side validation errors appear on submit with empty required fields. Actual submission will fail against the placeholder Supabase URL — confirm the inline error state renders instead of a crash. Full end-to-end submission gets verified once the user provides real Supabase credentials (flagged as a follow-up, not blocking this task).

- [ ] **Step 6: Commit**

```bash
git add components/RsvpForm.tsx app/page.tsx package.json package-lock.json
git commit -m "feat: add RSVP form with Supabase submission"
```

---

## Phase 8 — Gallery

### Task 17: `Gallery` component + mount

**Files:**
- Create: `components/Gallery.tsx`
- Modify: `app/page.tsx`

No real photos exist yet (confirmed during brainstorming — placeholder content is being used throughout). This task builds a fully working gallery using gradient placeholder tiles instead of `next/image` pointed at files that don't exist; swapping in real photos later is a matter of replacing the `gradient` fields with `src` fields and switching to `next/image`, without changing the component's structure.

- [ ] **Step 1: Write `components/Gallery.tsx`**

```tsx
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryImage {
  id: string;
  alt: string;
  gradient: string;
}

const images: GalleryImage[] = [
  { id: "1", alt: "Sakshi and Yash — photo 1", gradient: "from-maroon to-gold" },
  { id: "2", alt: "Sakshi and Yash — photo 2", gradient: "from-emerald to-gold-light" },
  { id: "3", alt: "Sakshi and Yash — photo 3", gradient: "from-navy to-blush" },
  { id: "4", alt: "Sakshi and Yash — photo 4", gradient: "from-gold to-maroon-deep" },
];

export function Gallery() {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActive(image)}
            className={`aspect-square rounded-lg bg-gradient-to-br ${image.gradient}`}
            aria-label={image.alt}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`aspect-[4/5] w-full max-w-lg rounded-lg bg-gradient-to-br ${active.gradient}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Mount it in `app/page.tsx`, between the RSVP section and the closing footer slot**

```tsx
import { Gallery } from "@/components/Gallery";
// ...existing imports

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <SaveTheDate />
      <Timeline />
      <VenueMap />
      <Section className="text-center">
        <EyebrowLabel>Join Us</EyebrowLabel>
        <h2 className="mt-4 font-display text-3xl italic text-maroon">RSVP</h2>
        <div className="mt-8">
          <RsvpForm />
        </div>
      </Section>
      <Section className="text-center">
        <EyebrowLabel>Moments</EyebrowLabel>
        <h2 className="mt-4 font-display text-3xl italic text-maroon">Gallery</h2>
        <div className="mt-8">
          <Gallery />
        </div>
      </Section>
    </main>
  );
}
```

- [ ] **Step 3: Visual checkpoint**

Run: `npm run dev`, open `http://localhost:3000`, scroll to Gallery.
Expected: 2-column (mobile) / 4-column (desktop) grid of gradient tiles; clicking one opens a centered lightbox overlay, clicking the overlay closes it.

- [ ] **Step 4: Commit**

```bash
git add components/Gallery.tsx app/page.tsx
git commit -m "feat: add Gallery section with lightbox (placeholder tiles pending real photos)"
```

---

## Phase 9 — Closing Section

### Task 18: `Footer` component + mount

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `components/Footer.tsx`**

```tsx
import { wedding } from "@/data/wedding";

export function Footer() {
  return (
    <footer className="bg-maroon-deep py-16 text-center text-ivory">
      <p className="font-display text-4xl italic">
        {wedding.couple.bride} &amp; {wedding.couple.groom}
      </p>
      <p className="mt-4 font-body text-sm uppercase tracking-[0.3em] text-gold-light">
        With love, the families
      </p>
      <p className="mt-6 font-body text-sm text-ivory/70">{wedding.hashtag}</p>
    </footer>
  );
}
```

- [ ] **Step 2: Mount it as the last element in `app/page.tsx`**

```tsx
import { Footer } from "@/components/Footer";
// ...existing imports

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <SaveTheDate />
      <Timeline />
      <VenueMap />
      <Section className="text-center">
        <EyebrowLabel>Join Us</EyebrowLabel>
        <h2 className="mt-4 font-display text-3xl italic text-maroon">RSVP</h2>
        <div className="mt-8">
          <RsvpForm />
        </div>
      </Section>
      <Section className="text-center">
        <EyebrowLabel>Moments</EyebrowLabel>
        <h2 className="mt-4 font-display text-3xl italic text-maroon">Gallery</h2>
        <div className="mt-8">
          <Gallery />
        </div>
      </Section>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Visual checkpoint**

Run: `npm run dev`, open `http://localhost:3000`, scroll to the bottom.
Expected: maroon-deep band with "Sakshi & Yash" in large italic script, "With love, the families" and the hashtag beneath it. Also re-check `view-source:http://localhost:3000` to confirm `<title>` still reads correctly after all sections were added (metadata was set once in Task 7 and doesn't need to change).

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add closing Footer section"
```

---

## Phase 10 — Polish Pass

### Task 19: Reduced-motion, touchscreen, Lighthouse, and contrast verification

This task is verification-only — no new component code, just checks with concrete pass/fail criteria, and any fixes those checks turn up.

**Files:**
- Modify: whichever component fails a check below (fixes only, no new features)

- [ ] **Step 1: Reduced-motion audit**

In Chrome DevTools, open the Rendering tab (Cmd+Shift+P → "Show Rendering"), set "Emulate CSS media feature prefers-reduced-motion" to "reduce", and reload `http://localhost:3000`.
Expected: `FloatingPetals` renders nothing, `CeremonyEnvelope` cards show no breathing pulse and open instantly without the flap spring animation, `ScratchCard` reveals its content immediately instead of requiring scratching, and the page's `scroll-behavior` is `auto` not `smooth`. Fix any component where this isn't true before proceeding.

- [ ] **Step 2: Touchscreen check (flagged in Tasks 11 and 13 — resolve now)**

Run `npm run dev`, note your machine's LAN IP (e.g. `ipconfig getifaddr en0` on macOS), and open `http://<your-lan-ip>:3000` on a real phone on the same network. Scratch the save-the-date card with a finger and tap-open each ceremony envelope.
Expected: both interactions register cleanly on touch — no stuck scratch state, no accidental double-taps re-triggering the envelope animation. If anything misbehaves, note it and fix the corresponding component (`ScratchCard.tsx` or `CeremonyEnvelope.tsx`) before proceeding — this step needs the user's own phone since it can't be done from this environment.

- [ ] **Step 3: Lighthouse mobile pass**

Run: `npm run build && npm run start`, then in Chrome DevTools open the Lighthouse tab, select "Mobile" + "Performance" + "Accessibility", and run the audit against `http://localhost:3000`.
Expected: Performance score in the 80s or above (petals/canvas work is deferred behind interaction, fonts are subset via `next/font`), Accessibility score 90+. If Performance is low, check the Lighthouse report's "opportunities" list first — common culprits at this scope are unoptimized font loading or render-blocking CSS, not the interactive components themselves.

- [ ] **Step 4: Color contrast check**

Using the Lighthouse Accessibility report (or Chrome DevTools' contrast checker on individual text elements), verify: `text-maroon` on `bg-ivory`, `text-ivory` on `bg-maroon`/`bg-maroon-deep`, and `text-ink/70` on `bg-blush` all meet WCAG AA (4.5:1 for body text).
Expected: all pass. If `text-ink/70` on `bg-blush` fails (translucent text on a light background is the most likely offender), bump it to `text-ink/80` or `text-ink` in the affected component.

- [ ] **Step 4b: OG image font polish**

`app/opengraph-image.tsx` (Task 7) sets `fontStyle: "italic"` on the couple's names, but Satori's fallback font has no italic face, so it renders upright — a missed brand touch on the single most-seen surface of this site (the WhatsApp link preview). If time allows, embed the actual Cormorant Garamond italic face: fetch the font file bytes (e.g. `fetch('https://fonts.gstatic.com/s/cormorantgaramond/...') ` for the italic weight actually used, or bundle a local `.ttf` under `/public/fonts` and read it with `fs.readFile` — note `runtime = "edge"` in that file restricts filesystem access, so a `fetch` of a public font URL is the more compatible approach) and pass it via `ImageResponse`'s second-argument `fonts: [{ name: "Cormorant Garamond", data: fontData, style: "italic", weight: 600 }]` option. Not a blocker if time is short — the current version is legible and on-brand in color/layout, just not italic.

- [ ] **Step 5: Commit any fixes found above**

```bash
git add -A
git commit -m "fix: polish pass — reduced-motion, touch, lighthouse, contrast fixes"
```

(Skip this commit if no fixes were needed.)

---

## Phase 11 — Deploy

### Task 20: GitHub push, Vercel connection, Supabase env vars

This task involves pushing code to a remote and deploying to a live URL — both require the user's explicit go-ahead per the standing safety rules around actions visible to others / affecting shared state. Do not run the push or deploy steps without asking first, even though they're written out below.

**Files:** none (infrastructure/config only)

- [ ] **Step 1: Ask the user for their GitHub repo URL (new or existing) and confirm before pushing**

Ask: "Ready to push this to GitHub — do you have a repo URL, or should I walk you through creating one? I won't push until you confirm."

- [ ] **Step 2: Add remote and push (only after user confirms)**

```bash
git remote add origin <user-provided-repo-url>
git push -u origin main
```

- [ ] **Step 3: Confirm before connecting Vercel**

Ask: "I'll now walk through connecting this repo to Vercel — you'll need to do the actual account login/import through the Vercel dashboard since that requires your credentials. Ready?"
Guide the user to import the GitHub repo at vercel.com/new; framework preset auto-detects as Next.js.

- [ ] **Step 4: Add Supabase env vars to Vercel project settings**

In the Vercel project's Settings → Environment Variables, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with the real values from the user's Supabase project (created back in Task 15's follow-up). Redeploy after adding them.

- [ ] **Step 4b: Set `metadataBase` now that the real production URL is known**

Task 7's `app/layout.tsx` metadata was built without a `metadataBase`, which `next dev` warns about (`metadataBase property in metadata export is not set`) — without it, the OG image URL Next.js generates for `<meta property="og:image">` can resolve incorrectly once deployed, undermining the WhatsApp preview the brief calls out as the top priority. Add it once the Vercel URL (or custom domain) is confirmed:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://<the-real-deployed-domain>"),
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};
```

Commit:
```bash
git add app/layout.tsx
git commit -m "fix: set metadataBase for correct OG image URL resolution in production"
```

- [ ] **Step 5: Verify the deployed OG preview**

Ask the user to paste the live Vercel URL into a WhatsApp chat to themselves and confirm the generated OG image (from Task 7) and title/description unfurl correctly.

- [ ] **Step 6: Optional — QR code**

If the user wants a QR code for physical cards, generate one from the live URL (e.g. via `qrcode` npm package run as a one-off script, or a QR generator site) and hand them the image file.
