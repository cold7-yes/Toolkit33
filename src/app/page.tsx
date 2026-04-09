"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, IconContainer } from "../components/ui/radar-effect";
import { EventLog } from "../components/ui/hud/event-log";
import { BuildInfo } from "../components/ui/hud/build-info";
import { HiCog } from "react-icons/hi";
import { HiCpuChip } from "react-icons/hi2";
import { BsGlobe } from "react-icons/bs";
import { Mail, X } from "lucide-react";

const OPERATOR_NAME = "Carson Dean";
const OPERATOR_EMAIL = "hello@example.com"; // placeholder — replace with real address

const BOOT_LINES = [
  "booting signal...",
  "loading automations · 1 active",
  "loading agents · 1 deployed",
  "loading web tools · 1 live",
  "system online",
];

const NODE_IDS = ["automations", "agents", "web-tools"] as const;
type NodeId = (typeof NODE_IDS)[number];

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [bootLineIdx, setBootLineIdx] = useState(0);
  const [showOperator, setShowOperator] = useState(false);
  const [pulsingNode, setPulsingNode] = useState<NodeId | null>(null);

  // Boot sequence
  useEffect(() => {
    if (bootLineIdx >= BOOT_LINES.length) {
      const t = setTimeout(() => setBooted(true), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBootLineIdx((i) => i + 1), 380);
    return () => clearTimeout(t);
  }, [bootLineIdx]);

  // Random node pulse activity — fires after boot, every 3-5s a random node briefly lights up.
  useEffect(() => {
    if (!booted) return;
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 2800 + Math.random() * 2200;
      timeout = setTimeout(() => {
        const next = NODE_IDS[Math.floor(Math.random() * NODE_IDS.length)];
        setPulsingNode(next);
        setTimeout(() => setPulsingNode(null), 900);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, [booted]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Boot overlay */}
      <AnimatePresence>
        {!booted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black font-mono text-xs text-green-500"
          >
            <div className="flex flex-col gap-1 px-6">
              {BOOT_LINES.slice(0, bootLineIdx).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-green-500/60">&gt; </span>
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-left system label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute top-6 left-6 z-40 flex flex-col gap-0.5 font-mono text-[10px] uppercase tracking-widest text-white/50"
      >
        <div className="text-white/70">SIGNAL</div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          <span>system online</span>
        </div>
      </motion.div>

      {/* Top-right operator identity */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        onClick={() => setShowOperator(true)}
        className="absolute top-6 right-6 z-40 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/50 transition-colors hover:border-white/30 hover:bg-white/[0.06] hover:text-white/90"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400" />
        operator · {OPERATOR_NAME}
      </motion.button>

      {/* Bottom-left event log */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="absolute bottom-6 left-6 z-40 hidden w-[340px] max-w-[40vw] md:block"
      >
        <EventLog />
      </motion.div>

      {/* Bottom-right build info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="absolute bottom-6 right-6 z-40 hidden md:block"
      >
        <BuildInfo />
      </motion.div>

      {/* Operator dialog */}
      <AnimatePresence>
        {showOperator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowOperator(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 w-full max-w-sm rounded-xl border border-white/15 bg-neutral-950 p-6 shadow-2xl"
            >
              <button
                onClick={() => setShowOperator(false)}
                className="absolute top-3 right-3 text-white/40 hover:text-white"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/40">
                System Operator
              </div>
              <div className="text-xl font-semibold text-white">{OPERATOR_NAME}</div>
              <div className="mt-1 text-sm text-white/60">
                Building internal automations, agents, and web tools for Brand33.
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={`mailto:${OPERATOR_EMAIL}`}
                  className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80 transition-colors hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-white"
                >
                  <Mail size={14} />
                  <span className="font-mono text-xs">{OPERATOR_EMAIL}</span>
                </a>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-widest text-white/30">
                Click any node on the radar to explore
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radar hub */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative flex h-[32rem] w-full max-w-6xl flex-col items-center justify-end space-y-6 overflow-hidden px-4 pb-24"
      >
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex w-full items-center justify-between">
            <IconContainer
              text="Automations"
              delay={0.2}
              href="/automations"
              pulsing={pulsingNode === "automations"}
              icon={<HiCog className="h-8 w-8 text-slate-600" />}
            />
            <IconContainer
              delay={0.4}
              text="Agents"
              href="/agents"
              pulsing={pulsingNode === "agents"}
              icon={<HiCpuChip className="h-8 w-8 text-slate-600" />}
            />
            <IconContainer
              text="Web Tools"
              delay={0.3}
              href="/web-tools"
              pulsing={pulsingNode === "web-tools"}
              icon={<BsGlobe className="h-8 w-8 text-slate-600" />}
            />
          </div>
        </div>

        <Radar className="absolute -bottom-12" />
        <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </motion.div>
    </div>
  );
}
