"use client";

import { FileText, ArrowLeft } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const docsData: TimelineItem[] = [
  {
    id: 1,
    title: "Coming Soon",
    date: "",
    content: "Documentation and SOPs will be added here as they are created.",
    category: "Docs",
    icon: FileText,
    relatedIds: [],
    status: "pending",
    energy: 0,
  },
];

export default function DocumentationPage() {
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
        Documentation
      </h1>
      <RadialOrbitalTimeline timelineData={docsData} />
    </div>
  );
}
