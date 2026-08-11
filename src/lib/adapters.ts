import type { TimelineEvent } from "@/components/lightswind/scroll-timeline";
import type { ThreeDCarouselItem } from "@/components/lightswind/3d-carousel";
import { formatPeriode } from "./format";
import { slugify } from "./slug";
import type { Experience, Projet } from "./types";
import { estProjetVisible } from "./visibilite";

export const IMAGE_PAR_DEFAUT = "/file.svg";

// Adapte les expériences du backend vers le format attendu par ScrollTimeline.
export function toTimelineEvents(experiences: Experience[]): TimelineEvent[] {
  return [...experiences]
    .sort((a, b) => (a.ordre_affichage ?? 99) - (b.ordre_affichage ?? 99))
    .map((e) => ({
      id: `experience-${e.id}`,
      year: formatPeriode(e.date_debut, e.date_fin, e.en_cours),
      title: e.poste,
      subtitle: e.entreprise,
      description: e.description,
    }));
}

// Adapte les projets du backend vers le format attendu par ThreeDCarousel.
export function toCarouselItems(projets: Projet[]): ThreeDCarouselItem[] {
  return projets
    .filter(estProjetVisible)
    .sort(
      (a, b) =>
        Number(b.mis_en_avant) - Number(a.mis_en_avant) ||
        (a.ordre_affichage ?? 99) - (b.ordre_affichage ?? 99),
    )
    .map((p) => ({
      slug: slugify(p.titre),
      title: p.titre,
      brand: "Projet",
      description: p.description,
      tags: p.technologies,
      imageUrl: p.image ?? IMAGE_PAR_DEFAUT,
      link: `/projets/${slugify(p.titre)}`,
    }));
}
