import { client } from "../../sanity/lib/client";
import {
  caseStudiesQuery,
  type CaseStudy,
} from "../../sanity/lib/queries";
import { AuraBackground } from "../components/AuraBackground";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { CaseStudies } from "../components/CaseStudies";
import IntegrationHero from "../components/ui/integration-hero";
import { Process } from "../components/Process";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    return await client.fetch<CaseStudy[]>(
      caseStudiesQuery,
      {},
      { next: { tags: ["caseStudies"], revalidate: 3600 } },
    );
  } catch (err) {
    console.warn("Sanity case studies fetch failed — rendering empty list", err);
    return [];
  }
}

export default async function Home() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="min-h-screen">
      <AuraBackground />
      <Header />
      <main>
        <Hero />
        <CaseStudies caseStudies={caseStudies} />
        <IntegrationHero />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
