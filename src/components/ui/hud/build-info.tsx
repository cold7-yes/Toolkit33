"use client";

import { useEffect, useState } from "react";

/** Timestamp we treat as "deploy time" for the uptime counter. Bump when you ship. */
const DEPLOYED_AT = new Date("2026-04-09T00:00:00Z").getTime();

function formatUptime(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return `${days}d ${hours.toString().padStart(2, "0")}h ${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
}

export function BuildInfo() {
  const [uptime, setUptime] = useState<string>("0d 00h 00m 00s");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => setUptime(formatUptime(Date.now() - DEPLOYED_AT));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none select-none text-right font-mono text-[10px] leading-relaxed uppercase tracking-[0.2em] text-white/40">
      <div className="flex items-center justify-end gap-2 border-b border-white/10 pb-1.5">
        <span className="text-white/60">build · v1.0.0</span>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
      </div>
      <div className="mt-2 flex flex-col gap-0.5 text-[10px]">
        <div>
          <span className="text-white/30">region</span>{" "}
          <span className="text-white/60">iad1</span>
        </div>
        <div>
          <span className="text-white/30">uptime</span>{" "}
          <span className="text-white/60 tabular-nums">{uptime}</span>
        </div>
        <div>
          <span className="text-white/30">systems</span>{" "}
          <span className="text-white/60">3 active</span>
        </div>
      </div>
    </div>
  );
}
