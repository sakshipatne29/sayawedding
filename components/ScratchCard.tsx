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
