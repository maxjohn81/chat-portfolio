import { Projet } from "./types";

// Statuts considérés comme visibles sur le site.
// L'API backend utilise actuellement "brouillon" pour tous les projets affichés ;
// "publié" est accepté pour les projets publiés dans le futur.
const STATUTS_VISIBLES = ["publié", "publie", "brouillon"];

export function estProjetVisible(projet: Projet): boolean {
  return STATUTS_VISIBLES.includes((projet.statut ?? "").toLowerCase());
}
