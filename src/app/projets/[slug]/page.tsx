import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { IMAGE_PAR_DEFAUT } from "@/lib/adapters";
import { slugify } from "@/lib/slug";
import { estProjetVisible } from "@/lib/visibilite";
import { ProjetDetail, ProjetDetailData } from "@/components/projets/projet-detail";

export async function generateStaticParams() {
  try {
    const projets = await api.getProjets();
    return projets.filter(estProjetVisible).map((p) => ({ slug: slugify(p.titre) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const projets = await api.getProjets();
    const projet = projets.find((p) => slugify(p.titre) === slug);
    if (!projet) return {};
    return {
      title: projet.titre,
      description: projet.description,
      openGraph: {
        title: `${projet.titre} — Rivo Andriharisoa`,
        description: projet.description,
        images: [projet.image ?? IMAGE_PAR_DEFAUT],
      },
    };
  } catch {
    return {};
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let projet: ProjetDetailData | undefined;
  try {
    const projets = await api.getProjets();
    const apiProjet = projets.find((p) => slugify(p.titre) === slug);
    if (apiProjet) {
      projet = {
        slug,
        title: apiProjet.titre,
        brand: "Projet",
        description: apiProjet.description,
        tags: apiProjet.technologies,
        imageUrl: apiProjet.image ?? IMAGE_PAR_DEFAUT,
        lienGithub: apiProjet.lien_github,
        lienDemo: apiProjet.lien_demo,
      };
    }
  } catch {
    projet = undefined;
  }

  if (!projet) notFound();

  return <ProjetDetail projet={projet} />;
}
