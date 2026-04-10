import type { CaseStudy } from "../../sanity/lib/queries";
import { CaseStudyCard } from "./CaseStudyCard";

interface Props {
  caseStudies: CaseStudy[];
}

export function CaseStudies({ caseStudies }: Props) {
  return (
    <section id="work" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="mb-4 text-4xl font-medium tracking-tight text-white">
              Featured Workflows
            </h2>
            <p className="max-w-md text-base text-neutral-400">
              A collection of production-ready automations integrating AI agents, CRMs, and custom webhooks.
            </p>
          </div>
        </div>

        {caseStudies.length === 0 ? (
          <div
            className="rounded-xl border p-12 text-center"
            style={{
              background: "rgba(23,23,23,0.6)",
              borderColor: "rgba(38,38,38,1)",
            }}
          >
            <p className="text-sm text-neutral-500">
              No workflows published yet. Add your first one in{" "}
              <a href="/studio" className="font-medium text-white underline">
                the studio
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs._id} caseStudy={cs} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
