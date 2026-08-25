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
