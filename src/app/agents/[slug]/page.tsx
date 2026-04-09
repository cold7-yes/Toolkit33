import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/ui/case-study";
import { getAllSlugs, getProject } from "@/lib/content";

export function generateStaticParams() {
  return getAllSlugs("agents");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject("agents", slug);
  if (!project) return {};
  return {
    title: `${project.title} · Signal`,
    description: project.excerpt,
  };
}

export default async function AgentCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject("agents", slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
