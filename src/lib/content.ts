import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProjectStatus = "live" | "beta" | "pending" | "archived";
export type ProjectCategory = "automations" | "agents" | "web-tools";

export interface ProjectFrontmatter {
  id: string;
  slug: string;
  title: string;
  version?: string;
  status: ProjectStatus;
  category: ProjectCategory;
  tags: string[];
  launchUrl?: string;
  sopUrl?: string;
  screenshot?: string;
  timeSaved?: string;
  runsToDate?: number;
  lastUpdated: string;
  excerpt: string;
}

export interface Project extends ProjectFrontmatter {
  /** Raw markdown body */
  body: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

/** List all projects in a category, sorted by id ascending. */
export function listProjects(category: ProjectCategory): Project[] {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const projects = files.map((file) => {
    const full = path.join(dir, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    return {
      ...(data as ProjectFrontmatter),
      body: content,
    } satisfies Project;
  });

  return projects.sort((a, b) => a.id.localeCompare(b.id));
}

/** Get a single project by category + slug. Returns null if not found. */
export function getProject(
  category: ProjectCategory,
  slug: string
): Project | null {
  const all = listProjects(category);
  return all.find((p) => p.slug === slug) ?? null;
}

/** All slugs across all categories (for generateStaticParams convenience). */
export function getAllSlugs(category: ProjectCategory): { slug: string }[] {
  return listProjects(category).map((p) => ({ slug: p.slug }));
}

/** Category counts for HUD badges. */
export function getCategoryCounts(): Record<ProjectCategory, number> {
  return {
    automations: listProjects("automations").length,
    agents: listProjects("agents").length,
    "web-tools": listProjects("web-tools").length,
  };
}
