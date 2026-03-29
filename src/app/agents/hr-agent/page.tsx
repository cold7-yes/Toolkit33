"use client";

import { Changelog, type Release } from "@/components/ui/interactive-changelog-with-dialog";

const releases: Release[] = [
  {
    title: "v1.0.0: HR Agent Launch",
    date: "Mar 2026",
    image: "https://placehold.co/1200x700/141414/ffffff/png?text=HR+Agent+Launch",
    excerpt:
      "The HR Agent is live on Microsoft Teams. Ask anything about policies, benefits, PTO, payroll, onboarding, and more — powered by official Brand33 documents.",
    contributors: [],
    content: (
      <div className="prose prose-invert">
        <h3>What it does</h3>
        <p>
          The HR Agent pulls directly from official Brand33 HR documents to give fast, accurate answers about company policies and procedures.
        </p>
        <ul>
          <li>Policies & benefits lookup</li>
          <li>PTO balance and payroll questions</li>
          <li>Onboarding guides for new hires</li>
          <li>Available 24/7 via Microsoft Teams</li>
        </ul>
        <h4>How to access</h4>
        <p>
          Open Microsoft Teams and start a chat with the HR Agent bot. Ask any HR-related question in natural language.
        </p>
      </div>
    ),
  },
];

export default function HRAgentDetailPage() {
  return (
    <Changelog
      title="HR Agent"
      subtitle="Changelog & Details"
      releases={releases}
      backHref="/agents"
    />
  );
}
