"use client";

import { useEffect, useRef } from "react";

/**
 * Background canvas rain: a field of ~60 monospace glyphs drifting downward.
 * A handful briefly glow green every few hundred ms, echoing the node pulse and
 * event-log activity that already live on the home page.
 *
 * Implementation notes:
 * - Pure canvas 2D. No React state per frame — all motion is imperative via
 *   refs inside a single requestAnimationFrame loop.
 * - DPR-aware (capped at 2x so retina doesn't torch the GPU).
 * - Pauses when the tab is hidden to save battery.
 * - Fully respects `prefers-reduced-motion`: falls back to a static field.
 * - pointer-events-none so foreground clicks always pass through.
 */

interface RainChar {
  x: number;
  y: number;
  speed: number;
  char: string;
  glowUntil: number;
}

const CHAR_POOL =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const COUNT = 60;
const FONT_SIZE = 14;

function randomChar() {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
}

export function CharacterRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // DPR-aware sizing. Recomputed on resize.
    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed characters across the viewport.
    const chars: RainChar[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 8 + Math.random() * 22, // px/sec
      char: randomChar(),
      glowUntil: 0,
    }));

    let last = performance.now();
    let rafId = 0;
    let running = true;
    let nextGlowAt = performance.now() + 400;

    const step = (now: number) => {
      if (!running) return;
      const dt = Math.min(100, now - last); // clamp so tab resumes don't teleport
      last = now;

      // Occasionally promote a few characters to "glowing" for a short window.
      if (now >= nextGlowAt) {
        const pickCount = 2 + Math.floor(Math.random() * 2); // 2–3
        for (let i = 0; i < pickCount; i++) {
          const c = chars[Math.floor(Math.random() * chars.length)];
          c.glowUntil = now + 600 + Math.random() * 400;
        }
        nextGlowAt = now + 350 + Math.random() * 500;
      }

      // Update positions (skipped entirely when reduced motion is on).
      if (!reducedMotion) {
        for (const c of chars) {
          c.y += (c.speed * dt) / 1000;
          if (c.y > height + FONT_SIZE) {
            c.y = -FONT_SIZE;
            c.x = Math.random() * width;
            c.char = randomChar();
          }
        }
      }

      // Clear and redraw.
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;
      ctx.textBaseline = "top";

      // Pass 1 — faint characters, no shadow (cheap).
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(148, 163, 184, 0.18)";
      for (const c of chars) {
        if (now < c.glowUntil) continue;
        ctx.fillText(c.char, c.x, c.y);
      }

      // Pass 2 — glowing characters with a green accent (expensive, few items).
      ctx.shadowColor = "rgba(74, 222, 128, 0.8)";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "rgba(134, 239, 172, 0.95)";
      for (const c of chars) {
        if (now >= c.glowUntil) continue;
        ctx.fillText(c.char, c.x, c.y);
      }
      ctx.shadowBlur = 0;

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    // Pause the loop entirely when the tab is hidden.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        last = performance.now();
        rafId = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
