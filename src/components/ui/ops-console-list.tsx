"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectStatus } from "@/lib/content";

interface OpsConsoleListProps {
  items: Project[];
  category: string;
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = {
    live: { dot: "bg-green-400", text: "text-green-400", label: "LIVE" },
    beta: { dot: "bg-sky-400", text: "text-sky-400", label: "BETA" },
    pending: { dot: "bg-yellow-400", text: "text-yellow-400", label: "PENDING" },
    archived: { dot: "bg-white/30", text: "text-white/40", label: "ARCHIVED" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest ${config.text}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export function OpsConsoleList({ items, category }: OpsConsoleListProps) {
  return (
    <div className="w-full">
      {/* Column header */}
      <div className="hidden md:grid grid-cols-[70px_1fr_auto_120px_140px_32px] items-center gap-4 border-b border-white/10 pb-2 font-mono text-[10px] uppercase tracking-widest text-white/30">
        <div>ID</div>
        <div>NAME</div>
        <div>STACK</div>
        <div className="text-right">TIME SAVED</div>
        <div className="text-right">STATUS</div>
        <div />
      </div>

      {items.length === 0 && (
        <div className="py-12 text-center font-mono text-xs uppercase tracking-widest text-white/30">
          no systems in this category
        </div>
      )}

      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/${category}/${item.slug}`}
          className="group relative grid grid-cols-[70px_1fr_auto_32px] md:grid-cols-[70px_1fr_auto_120px_140px_32px] items-center gap-4 border-b border-white/5 py-4 transition-colors hover:bg-white/[0.02]"
        >
          {/* Left accent bar on hover */}
          <span className="absolute left-0 top-0 h-full w-0 bg-green-400/60 transition-all duration-200 group-hover:w-0.5" />

          {/* ID */}
          <div className="font-mono text-[11px] uppercase tracking-widest text-white/40 group-hover:text-white/70">
            {item.id}
          </div>

          {/* Name + excerpt */}
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-white">
              {item.title}
            </div>
            <div className="truncate text-xs text-white/50 mt-0.5">
              {item.excerpt}
            </div>
          </div>

          {/* Stack tags (desktop) */}
          <div className="hidden md:flex max-w-[260px] flex-wrap items-center gap-1 justify-end">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/50 group-hover:border-white/20 group-hover:text-white/70"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                +{item.tags.length - 3}
              </span>
            )}
          </div>

          {/* Time saved (desktop) */}
          <div className="hidden md:block text-right font-mono text-[11px] uppercase tracking-widest text-white/40 group-hover:text-white/70">
            {item.timeSaved ?? "—"}
          </div>

          {/* Status (desktop) */}
          <div className="hidden md:flex justify-end">
            <StatusBadge status={item.status} />
          </div>

          {/* Arrow */}
          <div className="flex justify-end text-white/20 transition-colors group-hover:text-white/80">
            <ArrowUpRight size={14} />
          </div>
        </Link>
      ))}
    </div>
  );
}
