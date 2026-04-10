"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init: () => void;
      destroy: () => void;
    };
  }
}

/**
 * Full-screen aura background powered by UnicornStudio.
 * Renders behind all page content as a fixed layer.
 */
export function AuraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load UnicornStudio SDK once
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false, init: () => {}, destroy: () => {} };
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.onload = () => {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    } else if (!window.UnicornStudio.isInitialized) {
      // SDK loaded but not yet initialized
      window.UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    >
      <div
        data-us-project="yaha7Bz5f3cRBAa5js9K"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
