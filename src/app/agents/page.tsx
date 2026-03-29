"use client";

import { Bot, ArrowLeft } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const agentsData: TimelineItem[] = [
  {
    id: 1,
    title: "HR Agent",
    date: "Mar 2026",
    content:
      "Ask HR anything about policies, benefits, PTO, payroll, onboarding, and more. Pulls directly from official Brand33 documents to give you fast, accurate answers.",
    category: "Agent",
    icon: Bot,
    relatedIds: [],
    status: "completed",
    energy: 100,
    launchUrl:
      "https://teams.microsoft.com/l/chat/19:d0aacc4e-193f-4968-90f3-7f5063291b6b_0f49fb86-706a-46f9-90ae-ad2b9e4818c9@unq.gbl.spaces/conversations?context=%7B%22contextType%22%3A%22chat%22%7D",
    changelogUrl: "/agents/hr-agent",
  },
];

export default function AgentsPage() {
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
        Agents
      </h1>
      <RadialOrbitalTimeline timelineData={agentsData} />
    </div>
  );
}
