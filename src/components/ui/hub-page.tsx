"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OpsConsoleList } from "@/components/ui/ops-console-list";
import type { Project } from "@/lib/content";

interface HubPageProps {
  category: string;
  categoryLabel: string;
  tagline: string;
  items: Project[];
}

/**
 * Shared hub page layout for Automations / Agents / Web Tools.
 * A small HUD header, tagline, and an ops-console list of case studies.
 */
export function HubPage({ category, categoryLabel, tagline, items }: HubPageProps) {
  const activeCount = items.filter((i) => i.status === "live").length;

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Fixed top chrome */}
      <div className="sticky top-0 z-40 border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={12} />
            return to signal
          </Link>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <span>
              {items.length} {items.length === 1 ? "system" : "systems"}
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {activeCount} live
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          ~/signal/{category}
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {categoryLabel}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/50">{tagline}</p>

        {/* Decorative scanline rule */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* List */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <OpsConsoleList items={items} category={category} />
      </div>
    </div>
  );
}
