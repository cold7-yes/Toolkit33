"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

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
 *
 * Re-initialises the SDK on every client-side navigation so
 * the WebGL canvas survives React reconciliation.
 */
export function AuraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!window.UnicornStudio) {
      // First load — inject the SDK script
      window.UnicornStudio = {
        isInitialized: false,
        init: () => {},
        destroy: () => {},
      };
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.onload = () => {
        if (window.UnicornStudio) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    } else if (window.UnicornStudio.isInitialized) {
      // SDK already loaded — re-init so it picks up the DOM element
      // after a client-side navigation
      window.UnicornStudio.destroy();
      window.UnicornStudio.init();
    } else {
      window.UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  }, [pathname]);

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
