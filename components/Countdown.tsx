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
    <div className="w-full bg-maroon bg-gradient-to-br from-[#6B1830] via-maroon to-maroon-deep py-10 text-ivory">
      <div className="mx-auto mb-8 max-w-2xl px-6 text-center">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.2em] text-gold-light md:text-3xl">
          {wedding.countdown.heading}
        </h2>
        <p className="mt-2 font-display text-lg italic text-ivory/85 md:text-xl">
          {wedding.countdown.subheading}
        </p>
      </div>
      <div className="mx-auto flex max-w-2xl items-center justify-center gap-6 px-6 md:gap-12">
        {units.length === 0 ? (
          <p className="font-body text-sm uppercase tracking-widest">Loading countdown…</p>
        ) : (
          units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span
                className={`font-display text-4xl md:text-5xl ${unit.label === "Sec" ? "text-[#FFD54A]" : ""}`}
              >
                {unit.value}
              </span>
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
