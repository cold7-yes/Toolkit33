"use client";

import { Globe, ArrowLeft } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const webToolsData: TimelineItem[] = [
  {
    id: 1,
    title: "Brand Scorecard",
    date: "Mar 2026",
    content:
      "AI-powered brand scoring engine built for the insurance industry. Evaluates any insurance brand against Brand33's 33-point creative framework using live data including website content, visuals, campaigns, and partnerships.",
    category: "Web App",
    icon: Globe,
    relatedIds: [],
    status: "in-progress",
    energy: 50,
    launchUrl: "https://brandscore-ebon.vercel.app",
    changelogUrl: "/web-tools/brand-scorecard",
  },
];

export default function WebToolsPage() {
  return (
    <div className="relative">
      <a
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </a>
      <h1 className="absolute top-6 left-1/2 -translate-x-1/2 z-50 text-sm font-semibold tracking-widest uppercase text-white/40">
        Web Tools
      </h1>
      <RadialOrbitalTimeline timelineData={webToolsData} />
    </div>
  );
}
