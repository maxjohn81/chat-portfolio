import { PortfolioApp } from "@/components/portfolio-app";
import { api } from "@/lib/api";

export default async function Home() {
  const [projets, competences, experiences, educations] = await Promise.allSettled([
    api.getProjets(),
    api.getCompetences(),
    api.getExperiences(),
    api.getEducations(),
  ]);

  const data = {
    projets: projets.status === "fulfilled" ? projets.value : [],
    competences: competences.status === "fulfilled" ? competences.value : [],
    experiences: experiences.status === "fulfilled" ? experiences.value : [],
    educations: educations.status === "fulfilled" ? educations.value : [],
  };

  return <PortfolioApp initialData={data} />;
}