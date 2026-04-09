import { HubPage } from "@/components/ui/hub-page";
import { listProjects } from "@/lib/content";

export const metadata = {
  title: "Automations · Signal",
};

export default function AutomationsPage() {
  const items = listProjects("automations");
  return (
    <HubPage
      category="automations"
      categoryLabel="Automations"
      tagline="End-to-end workflows that eliminate the mechanical parts of running an agency. Built primarily on n8n with deep integrations into the tools the team already lives in."
      items={items}
    />
  );
}
