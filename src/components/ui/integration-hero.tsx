"use client";

import { useEffect, useRef } from "react";

const TOOLS = [
  { name: "OpenAI", icon: "openai" },
  { name: "Notion", icon: "notion" },
  { name: "Slack", icon: "slack" },
  { name: "Google Cloud", icon: "googlecloud" },
  { name: "Airtable", icon: "airtable" },
  { name: "HubSpot", icon: "hubspot" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Zapier", icon: "zapier" },
  { name: "Google Sheets", icon: "googlesheets" },
  { name: "Anthropic", icon: "anthropic" },
  { name: "Asana", icon: "asana" },
  { name: "Shopify", icon: "shopify" },
  { name: "QuickBooks", icon: "intuit" },
  { name: "Xero", icon: "xero" },
  { name: "Gmail", icon: "gmail" },
  { name: "n8n", icon: "n8n" },
  { name: "Salesforce", icon: "salesforce" },
  { name: "Make", icon: "make" },
  { name: "Google Drive", icon: "googledrive" },
  { name: "Google Gemini", icon: "googlegemini" },
  { name: "Amazon Web Services", icon: "amazonwebservices" },
];

const ICON_URL = (slug: string) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${slug}.svg`;

export default function IntegrationHero() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let frame: number;
    let pos = 0;
    const speed = 0.4;
    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const allTools = [...TOOLS, ...TOOLS];

  return (
    <section
      id="stack"
      className="overflow-hidden border-y border-white/5 py-16"
      style={{ background: "rgba(5,5,5,0.5)", backdropFilter: "blur(4px)" }}
    >
      <div className="mx-auto mb-10 max-w-6xl px-6">
        <p className="text-center text-xs font-medium uppercase tracking-[0.1em] text-neutral-500">
          Integrating with all your tools
        </p>
      </div>
      <div
        ref={carouselRef}
        className="flex w-full cursor-default gap-12 overflow-x-hidden transition-all duration-500"
        style={{ opacity: 0.5, filter: "grayscale(1)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.filter = "grayscale(0)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.5";
          e.currentTarget.style.filter = "grayscale(1)";
        }}
      >
        {allTools.map((tool, i) => (
          <div
            key={`${tool.icon}-${i}`}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center"
            title={tool.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ICON_URL(tool.icon)}
              alt={tool.name}
              width={32}
              height={32}
              style={{ filter: "invert(1)" }}
              className="opacity-80"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
