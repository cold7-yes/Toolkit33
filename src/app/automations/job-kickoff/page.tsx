"use client";

import { Changelog, type Release } from "@/components/ui/interactive-changelog-with-dialog";

const releases: Release[] = [
  {
    title: "v0.9.0: Job Kickoff Workflow Beta",
    date: "Mar 2026",
    image: "https://placehold.co/1200x700/141414/ffffff/png?text=Job+Kickoff+Workflow",
    excerpt:
      "Upload a job brief PDF and select dropdown fields to automatically create a Function Point estimate, SharePoint folders, Ziflow proof, and Asana project.",
    contributors: [],
    content: (
      <div className="prose prose-invert">
        <h3>How it works</h3>
        <p>
          The Job Kickoff Workflow automates the entire resource creation process for new jobs.
        </p>
        <ul>
          <li>Upload a job brief PDF via the n8n form</li>
          <li>Select job parameters from dropdown fields</li>
          <li>Automatically generates a Function Point estimate and job</li>
          <li>Creates SharePoint folder structure</li>
          <li>Sets up a Ziflow proof</li>
          <li>Creates an Asana project with tasks</li>
        </ul>
        <h4>Integrations</h4>
        <ul>
          <li>n8n (automation engine)</li>
          <li>SharePoint (file management)</li>
          <li>Asana (project management)</li>
          <li>Ziflow (proofing)</li>
          <li>Function Point (estimating)</li>
        </ul>
      </div>
    ),
  },
];

export default function JobKickoffDetailPage() {
  return (
    <Changelog
      title="Job Kickoff Workflow"
      subtitle="Changelog & Details"
      releases={releases}
      backHref="/automations"
    />
  );
}
