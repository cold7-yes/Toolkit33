"use client";

import { useState } from "react";
import Image from "next/image";

import type { CaseStudy } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

const TAG_COLORS: Record<string, string> = {
  n8n: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  make: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  zapier: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  openai: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  slack: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  airtable: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  hubspot: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  shopify: "bg-green-500/10 text-green-400 border-green-500/20",
  notion: "bg-stone-500/10 text-stone-400 border-stone-500/20",
  gmail: "bg-red-500/10 text-red-400 border-red-500/20",
  default: "bg-neutral-800 text-neutral-300 border-neutral-700",
};

function getTagColor(tool: string): string {
  const key = tool.toLowerCase().replace(/\s+/g, "");
  for (const [k, v] of Object.entries(TAG_COLORS)) {
    if (key.includes(k)) return v;
  }
  return TAG_COLORS.default;
}

/* Simple icons for card headers — mapped by industry keyword */
function CardIcon({ industry }: { industry?: string }) {
  const i = (industry ?? "").toLowerCase();
  if (i.includes("lead") || i.includes("sales") || i.includes("crm"))
    return (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    );
  if (i.includes("finance") || i.includes("invoice") || i.includes("accounting"))
    return (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2v20l2-1l2 1l2-1l2 1l2-1l2 1l2-1l2 1V2l-2 1l-2-1l-2 1l-2-1l-2 1l-2-1l-2 1Z" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8m4 1.5v-11" />
      </svg>
    );
  if (i.includes("support") || i.includes("ticket"))
    return (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
      </svg>
    );
  /* default: workflow/cog */
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </svg>
  );
}

interface Props {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: Props) {
  const [hovered, setHovered] = useState(false);

  const thumb = caseStudy.thumbnail?.asset
    ? urlFor(caseStudy.thumbnail).width(1200).height(600).fit("crop").url()
    : null;

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-xl border p-6 transition-all duration-300"
      style={{
        background: "rgba(23,23,23,0.6)",
        backdropFilter: "blur(8px)",
        borderColor: hovered ? "rgba(255,255,255,0.2)" : "rgba(38,38,38,1)",
        boxShadow: hovered ? "0 0 40px -10px rgba(255,255,255,0.05)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Arrow on hover */}
      <div
        className="absolute right-6 top-6 transition-opacity duration-200"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45 text-neutral-600">
          <path d="M5 12h14m-7-7l7 7l-7 7" />
        </svg>
      </div>

      {/* Thumbnail */}
      {thumb && (
        <div className="relative mb-6 aspect-[2/1] w-full overflow-hidden rounded-lg bg-neutral-900">
          <Image
            src={thumb}
            alt={caseStudy.thumbnail?.alt ?? caseStudy.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Icon */}
      {!thumb && (
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-white">
          <CardIcon industry={caseStudy.industry} />
        </div>
      )}

      {/* Result first */}
      <h3 className="mb-2 text-xl font-medium tracking-tight text-white">
        {caseStudy.result}
      </h3>

      {/* Problem / What was built */}
      <p className="mb-6 flex-grow text-base leading-relaxed text-neutral-400">
        {caseStudy.whatWasBuilt || caseStudy.problem || caseStudy.name}
      </p>

      {/* Tool tags */}
      {caseStudy.toolsUsed && caseStudy.toolsUsed.length > 0 && (
        <div className="mt-auto border-t border-neutral-800 pt-5">
          <div className="flex flex-wrap gap-2">
            {caseStudy.toolsUsed.map((tool) => (
              <span
                key={tool}
                className={`rounded-md border px-2.5 py-1 text-xs font-medium ${getTagColor(tool)}`}
              >
                {tool}
              </span>
            ))}
            {caseStudy.status && caseStudy.status !== "live" && (
              <span className="rounded-md border bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300 border-neutral-700">
                {caseStudy.status}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
