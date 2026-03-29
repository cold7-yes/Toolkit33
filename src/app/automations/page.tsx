"use client";

import { Cog, ArrowLeft } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const automationsData: TimelineItem[] = [
  {
    id: 1,
    title: "Job Kickoff Workflow",
    date: "Mar 2026",
    content:
      "Upload a job brief PDF and select dropdown fields to automatically create a Function Point estimate and job, SharePoint folders, Ziflow proof, and Asana project.",
    category: "Automation",
    icon: Cog,
    relatedIds: [],
    status: "in-progress",
    energy: 75,
    sopUrl:
      "https://scribehow.com/page-embed/New_Job_Resource_Creation_Workflow__ccn_DR5oRvy5ynn7u_gwuA",
    launchUrl:
      "https://cd333.app.n8n.cloud/form/26f02a42-0b9b-437d-ba94-906bbc5adedc",
    changelogUrl: "/automations/job-kickoff",
  },
];

export default function AutomationsPage() {
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
        Automations
      </h1>
      <RadialOrbitalTimeline timelineData={automationsData} />
    </div>
  );
}
