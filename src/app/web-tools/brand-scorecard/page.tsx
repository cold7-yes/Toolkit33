"use client";

import { Changelog, type Release } from "@/components/ui/interactive-changelog-with-dialog";

const releases: Release[] = [
  {
    title: "v0.5.0: Brand Scorecard In Development",
    date: "Mar 2026",
    image: "https://placehold.co/1200x700/141414/ffffff/png?text=Brand+Scorecard",
    excerpt:
      "AI-powered brand scoring engine built for the insurance industry. Evaluates any brand against Brand33's 33-point creative framework using live data.",
    contributors: [],
    content: (
      <div className="prose prose-invert">
        <h3>What it does</h3>
        <p>
          The Brand Scorecard evaluates insurance brands against Brand33&apos;s proprietary 33-point creative framework.
        </p>
        <ul>
          <li>Analyzes website content and visuals</li>
          <li>Reviews campaigns and partnerships</li>
          <li>Uses live data captured at the moment of audit</li>
          <li>Generates comprehensive brand scores</li>
        </ul>
        <h4>Current status</h4>
        <p>
          In active development. Core scoring engine is functional with ongoing refinements to the evaluation criteria and UI.
        </p>
      </div>
    ),
  },
];

export default function BrandScorecardDetailPage() {
  return (
    <Changelog
      title="Brand Scorecard"
      subtitle="Changelog & Details"
      releases={releases}
      backHref="/web-tools"
    />
  );
}
