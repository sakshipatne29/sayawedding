"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface Falling {
  id: number;
  kind: "petal" | "flower";
  left: number;
  startY: number;
  fall: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  spin: number;
  drift: number;
  color: string;
}

const PETAL_PINKS = ["#F7B9CE", "#F9C9D9", "#F4A9C2", "#FBD5E1"];
const FLOWER_BLUES = ["#87CEEB", "#9AD7F0", "#7CC4E8"];
const FLOWER_CENTRE = "#FFF3C4";
const PER_SCREEN = 22;
const MAX_ITEMS = 60;

// The layer can span several screens. Rather than one very long fall, each item
// drifts down about one screen from its own starting height, so wherever the
// guest has scrolled within the layer there are petals falling and fading out.
function generateFalling(areaHeight: number, screenHeight: number): Falling[] {
  const screens = Math.max(1, areaHeight / screenHeight);
  const count = Math.min(MAX_ITEMS, Math.round(PER_SCREEN * screens));
  const fall = screenHeight * 1.1;
  return Array.from({ length: count }, (_, id) => {
    const kind = id % 3 === 2 ? "flower" : "petal";
    // The first few start just above the top so the opening screen fills at once.
    const startY =
      id < PER_SCREEN / 3
        ? -0.1 * screenHeight
        : // Up to half a fall from the bottom, so petals still drift across the
          // last section (the countdown) before fading; the layer clips the rest.
          -0.1 * screenHeight + Math.random() * Math.max(0, areaHeight - fall * 0.5);
    return {
      id,
      kind,
      left: Math.random() * 100,
      startY,
      fall,
      size: kind === "flower" ? 14 + Math.random() * 8 : 12 + Math.random() * 14,
      duration: 9 + Math.random() * 8,
      delay: id < PER_SCREEN / 3 ? Math.random() * 1.5 : Math.random() * 6,
      rotation: Math.random() * 360,
      spin: (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 360),
      drift: (Math.random() < 0.5 ? -1 : 1) * (20 + Math.random() * 50),
      color:
        kind === "flower"
          ? FLOWER_BLUES[Math.floor(id / 3) % FLOWER_BLUES.length]
          : PETAL_PINKS[id % PETAL_PINKS.length],
    };
  });
}

function Flower({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="0" cy="-6" rx="4" ry="6" fill={color} transform={`rotate(${angle})`} />
      ))}
      <circle r="2.6" fill={FLOWER_CENTRE} />
    </svg>
  );
}

// Fills its positioned parent; place it inside the element the shower should cover.
export function FloatingPetals({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Falling[]>([]);

  // Generated after mount (Math.random() during render would cause a hydration
  // mismatch), and again only if the covered area changes height noticeably.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    let generatedFor = 0;
    const regenerate = () => {
      const height = layer.clientHeight;
      const screen = window.innerHeight;
      if (Math.abs(height - generatedFor) < screen * 0.25) return;
      generatedFor = height;
      setItems(generateFalling(height, screen));
    };
    regenerate();
    const observer = new ResizeObserver(regenerate);
    observer.observe(layer);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      ref={layerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute top-0 block"
          style={
            item.kind === "petal"
              ? {
                  left: `${item.left}%`,
                  width: item.size,
                  height: item.size * 1.35,
                  borderRadius: "80% 0 80% 0",
                  backgroundColor: item.color,
                }
              : { left: `${item.left}%`, lineHeight: 0 }
          }
          initial={{ y: item.startY, x: 0, opacity: 0, rotate: item.rotation }}
          animate={{
            y: item.startY + item.fall,
            x: [0, item.drift, -item.drift * 0.5, item.drift * 0.8],
            opacity: [0, 1, 1, 0],
            rotate: item.rotation + item.spin,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
            x: { duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
            // Fully visible from 10% of the fall, fading out over the last 30%.
            opacity: {
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              times: [0, 0.1, 0.7, 1],
              ease: "linear",
            },
          }}
        >
          {item.kind === "flower" && <Flower size={item.size} color={item.color} />}
        </motion.span>
      ))}
    </div>
  );
}
