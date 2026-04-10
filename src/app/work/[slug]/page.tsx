import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { client } from "../../../../sanity/lib/client";
import {
  caseStudyBySlugQuery,
  caseStudiesQuery,
  type CaseStudy,
} from "../../../../sanity/lib/queries";
import { urlFor } from "../../../../sanity/lib/image";

const TAG_COLORS: Record<string, string> = {
  n8n: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  make: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  zapier: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  openai: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  anthropic: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  slack: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  airtable: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  hubspot: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  shopify: "bg-green-500/10 text-green-400 border-green-500/20",
  notion: "bg-stone-500/10 text-stone-400 border-stone-500/20",
  gmail: "bg-red-500/10 text-red-400 border-red-500/20",
  quickbooks: "bg-green-500/10 text-green-400 border-green-500/20",
  outlook: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  microsoft: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  excel: "bg-green-500/10 text-green-400 border-green-500/20",
  default: "bg-neutral-800 text-neutral-300 border-neutral-700",
};

function getTagColor(tool: string): string {
  const key = tool.toLowerCase().replace(/\s+/g, "");
  for (const [k, v] of Object.entries(TAG_COLORS)) {
    if (key.includes(k)) return v;
  }
  return TAG_COLORS.default;
}

export async function generateStaticParams() {
  const caseStudies = await client.fetch<CaseStudy[]>(
    caseStudiesQuery,
    {},
    { next: { tags: ["caseStudies"] } },
  );
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await client.fetch<CaseStudy | null>(
    caseStudyBySlugQuery,
    { slug },
    { next: { tags: ["caseStudies"] } },
  );

  if (!cs) return { title: "Case Study Not Found" };

  return {
    title: `${cs.name} | CD Systems`,
    description: cs.result,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await client.fetch<CaseStudy | null>(
    caseStudyBySlugQuery,
    { slug },
    { next: { tags: ["caseStudies"] } },
  );

  if (!cs) notFound();

  const thumb = cs.thumbnail?.asset
    ? urlFor(cs.thumbnail).width(1600).fit("max").url()
    : null;

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5m7-7l-7 7l7 7" />
            </svg>
            Back
          </Link>
          {cs.status && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                cs.status === "live"
                  ? "bg-green-500/10 text-green-400"
                  : cs.status === "in progress"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-blue-500/10 text-blue-400"
              }`}
            >
              {cs.status}
            </span>
          )}
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Header */}
        <header className="mb-16">
          {cs.industry && (
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.1em] text-neutral-500">
              {cs.industry}
            </p>
          )}
          <h1 className="mb-6 text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {cs.name}
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-neutral-400">
            {cs.result}
          </p>
        </header>

        {/* Thumbnail */}
        {thumb && (
          <div className="relative mb-16 w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
            <Image
              src={thumb}
              alt={cs.thumbnail?.alt ?? cs.name}
              width={1600}
              height={800}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {cs.problem && (
              <section className="mb-12">
                <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                  The Problem
                </h2>
                <div className="space-y-4">
                  {cs.problem.split("\n").filter(Boolean).map((para, i) => (
                    <p key={i} className="text-lg leading-relaxed text-neutral-300">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {cs.whatWasBuilt && (
              <section className="mb-12">
                <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                  What We Built
                </h2>
                <div className="space-y-4">
                  {cs.whatWasBuilt.split("\n").filter(Boolean).map((para, i) => (
                    <p key={i} className="text-lg leading-relaxed text-neutral-300">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {cs.gallery && cs.gallery.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                  Workflows
                </h2>
                <div className="flex flex-col gap-6">
                  {cs.gallery.map((img, i) => {
                    if (!img.asset) return null;
                    const src = urlFor(img).width(1400).fit("max").url();
                    return (
                      <figure key={i}>
                        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                          <Image
                            src={src}
                            alt={img.alt ?? `Workflow screenshot ${i + 1}`}
                            width={1400}
                            height={700}
                            sizes="(min-width: 1024px) 640px, 100vw"
                            className="h-auto w-full object-contain"
                          />
                        </div>
                        {img.caption && (
                          <figcaption className="mt-2 text-sm text-neutral-500">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div
              className="sticky top-28 rounded-xl border p-6"
              style={{
                background: "rgba(23,23,23,0.6)",
                backdropFilter: "blur(8px)",
                borderColor: "rgba(38,38,38,1)",
              }}
            >
              {cs.timeSaved && (
                <div className="mb-6">
                  <h3 className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                    Time Saved
                  </h3>
                  <p className="text-lg font-medium text-green-400">{cs.timeSaved}</p>
                </div>
              )}

              {cs.clientName && (
                <div className="mb-6">
                  <h3 className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                    Client
                  </h3>
                  <p className="text-base text-white">{cs.clientName}</p>
                </div>
              )}

              {cs.industry && (
                <div className="mb-6">
                  <h3 className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                    Industry
                  </h3>
                  <p className="text-base text-white">{cs.industry}</p>
                </div>
              )}

              {cs.toolsUsed && cs.toolsUsed.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                    Tools Used
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className={`rounded-md border px-2.5 py-1 text-xs font-medium ${getTagColor(tool)}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-neutral-800 pt-6">
                <a
                  href="https://calendly.com/cdean-brand33/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
                >
                  Build something like this
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7l7 7l-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
