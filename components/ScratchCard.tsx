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
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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

    hasScratched.current = false;

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

    // Percentage tracking reads from a small downsampled offscreen canvas
    // rather than the full DPR-scaled buffer, so getImageData stays cheap
    // (a few KB instead of several MB) even while actively dragging.
    const sampleWidth = 96;
    const sampleHeight = Math.max(1, Math.round(sampleWidth * (height / width)));
    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = sampleWidth;
    sampleCanvas.height = sampleHeight;
    const sampleCtx = sampleCanvas.getContext("2d");

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
      if (!sampleCtx) return;
      sampleCtx.clearRect(0, 0, sampleWidth, sampleHeight);
      sampleCtx.drawImage(canvas, 0, 0, sampleWidth, sampleHeight);
      const imageData = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;
      let transparent = 0;
      let total = 0;
      for (let i = 3; i < imageData.length; i += 4) {
        total++;
        if (imageData[i] === 0) transparent++;
      }
      if (total > 0 && transparent / total >= revealThreshold) {
        setRevealed(true);
      }
    };

    const stopInterval = () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    };

    const startDrawing = (e: PointerEvent) => {
      isDrawing.current = true;
      canvas.setPointerCapture(e.pointerId);
      if (!hasScratched.current) {
        hasScratched.current = true;
        setShowHint(false);
        checkIntervalRef.current = setInterval(checkScratchedPercent, 400);
      }
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const draw = (e: PointerEvent) => {
      if (!isDrawing.current) return;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const stopDrawing = (e: PointerEvent) => {
      isDrawing.current = false;
      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    };

    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointercancel", stopDrawing);

    return () => {
      canvas.removeEventListener("pointerdown", startDrawing);
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerup", stopDrawing);
      canvas.removeEventListener("pointercancel", stopDrawing);
      stopInterval();
    };
  }, [width, height, revealThreshold, overlayColor, reducedMotion]);

  useEffect(() => {
    // The main effect's cleanup only fires on unmount or prop change, but on
    // a single-page site this component stays mounted after being revealed —
    // so stop polling scratched-percentage as soon as it's no longer needed,
    // whether triggered by the threshold check or the manual Reveal button.
    if (revealed && checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
  }, [revealed]);

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
            aria-hidden="true"
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
          aria-label="Reveal hidden content"
          className="absolute bottom-3 right-3 rounded-full bg-maroon px-4 py-1.5 font-body text-xs uppercase tracking-widest text-ivory shadow"
        >
          Reveal
        </button>
      )}
    </div>
  );
}
