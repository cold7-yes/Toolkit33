"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEvent {
  id: number;
  ts: string;
  source: string;
  verb: string;
  detail?: string;
  level: "info" | "ok" | "warn";
}

/** Static pool of plausible activity lines tied to real projects. Weighted so job_kickoff fires more often. */
const EVENT_TEMPLATES: Array<Omit<LogEvent, "id" | "ts">> = [
  { source: "automation.job_kickoff", verb: "run completed", detail: "2.3s", level: "ok" },
  { source: "automation.job_kickoff", verb: "brief parsed", detail: "14 fields", level: "info" },
  { source: "automation.job_kickoff", verb: "sharepoint folders provisioned", level: "ok" },
  { source: "automation.job_kickoff", verb: "ziflow proof created", level: "ok" },
  { source: "automation.job_kickoff", verb: "asana project opened", level: "ok" },
  { source: "automation.job_kickoff", verb: "function point estimate drafted", level: "ok" },
  { source: "automation.job_kickoff", verb: "run completed", detail: "1.9s", level: "ok" },
  { source: "agent.hr_agent", verb: "query received", detail: "pto policy", level: "info" },
  { source: "agent.hr_agent", verb: "answered from source", detail: "handbook v4.2", level: "ok" },
  { source: "agent.hr_agent", verb: "escalated to hr team", level: "warn" },
  { source: "agent.hr_agent", verb: "query received", detail: "401k match", level: "info" },
  { source: "web_tool.brand_scorecard", verb: "audit started", detail: "progressive.com", level: "info" },
  { source: "web_tool.brand_scorecard", verb: "audit completed", detail: "78/99", level: "ok" },
  { source: "web_tool.brand_scorecard", verb: "campaign data captured", level: "info" },
  { source: "signal", verb: "operator session active", level: "info" },
  { source: "signal", verb: "telemetry heartbeat", level: "info" },
];

function pickWeighted(): Omit<LogEvent, "id" | "ts"> {
  return EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
}

function formatTs(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const levelColor = {
  info: "text-white/50",
  ok: "text-green-400/80",
  warn: "text-yellow-400/80",
} as const;

export function EventLog() {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let id = 0;

    // Seed with 4 initial events spaced out in the recent past so the panel isn't empty on load.
    const now = new Date();
    const seed: LogEvent[] = Array.from({ length: 4 }).map((_, i) => {
      const t = new Date(now.getTime() - (3 - i) * 3500);
      return { id: id++, ts: formatTs(t), ...pickWeighted() };
    });
    setEvents(seed);

    const interval = setInterval(() => {
      setEvents((prev) => {
        const next: LogEvent = { id: id++, ts: formatTs(new Date()), ...pickWeighted() };
        return [next, ...prev].slice(0, 5);
      });
    }, 2800 + Math.random() * 1200);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none select-none font-mono text-[10px] leading-relaxed">
      {/* Header */}
      <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-1.5">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
        <span className="uppercase tracking-[0.2em] text-white/60">recent activity</span>
        <span className="ml-auto rounded border border-white/10 px-1 py-px text-[9px] uppercase tracking-widest text-white/30">
          demo
        </span>
      </div>

      {/* Log lines */}
      <div className="flex flex-col gap-0.5">
        <AnimatePresence initial={false}>
          {events.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-baseline gap-1.5 text-white/60"
            >
              <span className="text-white/30">[{e.ts}]</span>
              <span className={levelColor[e.level]}>{e.source}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">{e.verb}</span>
              {e.detail && (
                <>
                  <span className="text-white/40">·</span>
                  <span className="text-white/50">{e.detail}</span>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
