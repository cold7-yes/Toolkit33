import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/ui/case-study";
import { getAllSlugs, getProject } from "@/lib/content";

export function generateStaticParams() {
  return getAllSlugs("automations");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject("automations", slug);
  if (!project) return {};
  return {
    title: `${project.title} · Signal`,
    description: project.excerpt,
  };
}

export default async function AutomationCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject("automations", slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
