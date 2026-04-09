import { HubPage } from "@/components/ui/hub-page";
import { listProjects } from "@/lib/content";

export const metadata = {
  title: "Web Tools · Signal",
};

export default function WebToolsPage() {
  const items = listProjects("web-tools");
  return (
    <HubPage
      category="web-tools"
      categoryLabel="Web Tools"
      tagline="Purpose-built web apps that turn expert processes into repeatable, scalable systems."
      items={items}
    />
  );
}
