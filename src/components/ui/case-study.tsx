"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Zap, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MeshGradient } from "@paper-design/shaders-react";
import { HudButton } from "@/components/ui/hud-button";
import type { Project, ProjectStatus } from "@/lib/content";

interface CaseStudyProps {
  project: Project;
}

function StatusChip({ status }: { status: ProjectStatus }) {
  const config = {
    live: { dot: "bg-green-400", text: "text-green-400", label: "LIVE" },
    beta: { dot: "bg-sky-400", text: "text-sky-400", label: "BETA" },
    pending: { dot: "bg-yellow-400", text: "text-yellow-400", label: "PENDING" },
    archived: { dot: "bg-white/30", text: "text-white/40", label: "ARCHIVED" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${config.text}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

/** Screenshot with gradient fallback if src is missing or 404s */
function Screenshot({ src, title }: { src?: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setFailed(true);
    }
  }, [src]);

  if (!src || failed) {
    return (
      <div className="relative flex aspect-[12/7] w-full items-end overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-sky-900/40 via-purple-900/30 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.2),transparent_55%)]" />
        <div className="relative z-10 p-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            preview pending
          </div>
          <div className="mt-1 text-xl font-semibold text-white/80">{title}</div>
        </div>
      </div>
    );
  }
  return (
    <img
      ref={imgRef}
      src={src}
      alt={title}
      onError={() => setFailed(true)}
      className="w-full rounded-lg border border-white/10 object-cover"
    />
  );
}

export function CaseStudy({ project }: CaseStudyProps) {
  const backHref = `/${project.category}`;

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Mesh gradient header */}
      <div className="relative w-full overflow-hidden">
        <MeshGradient
          colors={["#5b00ff", "#00ffa3", "#ff9a00", "#ea00ff"]}
          swirl={0.55}
          distortion={0.85}
          speed={0.1}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />

        <div className="relative mx-auto max-w-5xl px-6 py-14">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft size={12} />
            back to {project.category}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-white/60">
            <span>{project.id}</span>
            <span className="text-white/30">·</span>
            <span>case study</span>
            {project.version && (
              <>
                <span className="text-white/30">·</span>
                <span>{project.version}</span>
              </>
            )}
            {project.client && (
              <>
                <span className="text-white/30">·</span>
                <span className="text-white/40">client</span>
                <span className="text-white/80">{project.client}</span>
              </>
            )}
          </div>

          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/75">
            {project.excerpt}
          </p>

          {/* Meta strip */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <StatusChip status={project.status} />
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/15 bg-white/[0.05] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-b border-white/5">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-3">
          <StatTile
            icon={<Clock size={14} />}
            label="time saved"
            value={project.timeSaved ?? "—"}
          />
          <StatTile
            icon={<Zap size={14} />}
            label="runs to date"
            value={project.runsToDate?.toLocaleString() ?? "—"}
          />
          <StatTile
            icon={<FileText size={14} />}
            label="last updated"
            value={project.lastUpdated}
          />
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
          {/* Main column */}
          <div>
            <Screenshot src={project.screenshot} title={project.title} />

            <div className="mt-10 text-white/80 text-[15px] leading-relaxed [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-widest [&_h3]:text-white/50 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-white/75 [&_li]:marker:text-white/30 [&_strong]:text-white [&_h2:first-child]:mt-0">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.body}
              </ReactMarkdown>
            </div>
          </div>

          {/* Right rail */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col items-center gap-6 rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <div className="text-center">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  access system
                </div>
                <div className="mt-1 text-sm text-white/70">
                  Live, running right now
                </div>
              </div>

              {project.launchUrl ? (
                <a
                  href={project.launchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <HudButton style="style2" variant="primary" size="default">
                    LAUNCH
                  </HudButton>
                </a>
              ) : (
                <div className="text-xs text-white/30">no public endpoint</div>
              )}

              {project.sopUrl && (
                <a
                  href={project.sopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-widest text-white/40 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  view sop →
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded border border-white/5 bg-white/[0.02] p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-white/[0.03] text-white/60">
        {icon}
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}
