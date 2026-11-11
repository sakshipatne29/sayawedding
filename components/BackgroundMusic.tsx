"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { wedding } from "@/data/wedding";

// Browsers only allow audio with sound to start from a user gesture. To make sure
// every guest hears the song, the first visit in a session opens on a welcome
// screen whose tap starts the music. After that, any tap or key press starts it.
// Mounted in the root layout, so it keeps playing across page navigations.
const START_EVENTS = ["click", "touchend", "keydown"] as const;
export const OPENED_KEY = "sayawedding:opened";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pausedByGuest = useRef(false);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(OPENED_KEY)) setWelcomeOpen(false);
    } catch {
      setWelcomeOpen(false);
    }
  }, []);

  // Keep the page behind the welcome screen from scrolling.
  useEffect(() => {
    document.body.style.overflow = welcomeOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [welcomeOpen]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    // The file can finish loading before React attaches its handlers.
    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) setAvailable(true);

    const start = (event: Event) => {
      // The music button handles its own taps.
      if ((event.target as Element | null)?.closest?.("[data-music-toggle]")) return;
      if (pausedByGuest.current || !audio.paused) return;
      audio.play().catch(() => {});
    };
    const removeStarters = () => START_EVENTS.forEach((e) => window.removeEventListener(e, start));
    START_EVENTS.forEach((e) => window.addEventListener(e, start, { passive: true }));

    const onPlay = () => {
      setPlaying(true);
      removeStarters();
    };
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      removeStarters();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const openInvitation = () => {
    audioRef.current?.play().catch(() => {});
    try {
      sessionStorage.setItem(OPENED_KEY, "1");
    } catch {}
    setWelcomeOpen(false);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      pausedByGuest.current = false;
      audio.play().catch(() => {});
    } else {
      pausedByGuest.current = true;
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={wedding.music.src}
        loop
        preload="metadata"
        onLoadedMetadata={() => setAvailable(true)}
        onError={() => setAvailable(false)}
      />

      <AnimatePresence>
        {welcomeOpen && (
          <motion.div
            key="welcome"
            data-invite-welcome
            role="dialog"
            aria-modal="true"
            aria-label="Welcome"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            onClick={openInvitation}
            className="fixed inset-0 z-[60] flex cursor-pointer flex-col items-center justify-center bg-ivory bg-gradient-to-b from-ivory via-[#FCEFF2] to-ivory px-6 text-center"
          >
            <Image src="/ganesh.png" alt="" width={651} height={836} priority sizes="96px" className="h-24 w-auto" />
            <p className="mt-8 font-body text-xs uppercase tracking-[0.35em] text-maroon/70">You&apos;re invited</p>
            <p className="mt-4 font-display text-5xl italic text-[#D7263D] md:text-6xl">
              {wedding.couple.bride} &amp; {wedding.couple.groom}
            </p>
            <p className="mt-3 font-display text-lg italic text-ink/70">{wedding.saveTheDate.dateRange}</p>
            <button
              type="button"
              autoFocus
              onClick={(e) => {
                e.stopPropagation();
                openInvitation();
              }}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3 font-body text-sm uppercase tracking-widest text-ivory shadow-lg transition hover:bg-maroon-deep"
            >
              <Music className="h-4 w-4" aria-hidden="true" />
              Open Invitation
            </button>
            <p className="mt-4 font-body text-xs text-ink/50">Best enjoyed with sound on</p>
          </motion.div>
        )}
      </AnimatePresence>

      {available && !welcomeOpen && (
        <button
          type="button"
          data-music-toggle
          onClick={toggle}
          aria-label={playing ? "Pause background music" : "Play background music"}
          aria-pressed={playing}
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-ivory shadow-lg ring-2 ring-gold-light/60 transition hover:bg-maroon-deep"
        >
          {playing ? <Music className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
        </button>
      )}
    </>
  );
}
