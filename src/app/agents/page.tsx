import { HubPage } from "@/components/ui/hub-page";
import { listProjects } from "@/lib/content";

export const metadata = {
  title: "Agents · Signal",
};

export default function AgentsPage() {
  const items = listProjects("agents");
  return (
    <HubPage
      category="agents"
      categoryLabel="Agents"
      tagline="Conversational agents deployed where people already work. Grounded in real company documents, not hallucinated guesses."
      items={items}
    />
  );
}
