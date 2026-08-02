import { BotMessage, ConversationNode, PortfolioData, TimelineItem } from "./types";
import { formatPeriode } from "./format";

export function buildConversation(data: PortfolioData): Record<string, ConversationNode> {
  const safeData: PortfolioData = {
    projets: data?.projets ?? [],
    competences: data?.competences ?? [],
    experiences: data?.experiences ?? [],
    educations: data?.educations ?? [],
  };

  const projetsVisibles = safeData.projets
    .filter((p) => p.statut === "brouillon")
    .sort((a, b) => (a.ordre_affichage ?? 99) - (b.ordre_affichage ?? 99));

  const competencesTriees = [...safeData.competences].sort(
    (a, b) => (a.ordre_affichage ?? 99) - (b.ordre_affichage ?? 99),
  );

  const experiencesTimeline: TimelineItem[] = [...safeData.experiences]
    .sort((a, b) => (a.ordre_affichage ?? 99) - (b.ordre_affichage ?? 99))
    .map((e) => ({
      title: e.poste,
      subtitle: e.entreprise,
      period: formatPeriode(e.date_debut, e.date_fin, e.en_cours),
      current: e.en_cours,
    }));

  const text = (t: string): BotMessage => ({ type: "text", text: t });

  return {
    start: {
      bot: [
        text("Bonjour, et bienvenue sur mon portfolio 👋"),
        text("Je suis Rivo Andriharisoa, développeur full-stack web et mobile — ravi de vous accueillir ici."),
        text("Plutôt qu'une page statique, j'ai voulu vous laisser découvrir mon profil en conversation. Tapez une lettre ou cliquez sur un bouton pour commencer."),
      ],
      replies: [{ label: "Commencer", keywords: ["r", "continuer"], next: "menu", icon: "arrow", color: "blue" }],
    },
    menu: {
      bot: [text("Qu'est-ce qui t'intéresse ?")],
      replies: [
        { label: "À propos", keywords: ["a", "apropos"], next: "about", icon: "user", color: "blue" },
        { label: "Compétences", keywords: ["c", "competences"], next: "skills", icon: "wrench", color: "violet" },
        { label: "Expériences", keywords: ["e", "experiences"], next: "experiences", icon: "wrench", color: "rose" },
        { label: "Projets", keywords: ["p", "projets"], next: "projects", icon: "folder", color: "emerald" },
        { label: "Contact", keywords: ["m", "contact"], next: "contact", icon: "mail", color: "amber" },
      ],
    },
    about: {
      bot: [text("Développeur full-stack web et mobile, basé à Madagascar. Je conçois des applications complètes, du back-end à l'interface finale.")],
      replies: [{ label: "Retour au menu", keywords: ["m", "menu"], next: "menu", icon: "home", color: "slate" }],
    },
    skills: {
      bot:
        competencesTriees.length > 0
          ? [text("Voici mes compétences :"), { type: "skills", skills: competencesTriees }]
          : [text("Compétences en cours de mise à jour.")],
      replies: [
        { label: "Voir les projets", keywords: ["p", "projets"], next: "projects", icon: "folder", color: "emerald" },
        { label: "Retour au menu", keywords: ["m", "menu"], next: "menu", icon: "home", color: "slate" },
      ],
    },
    experiences: {
      bot:
        experiencesTimeline.length > 0
          ? [text("Mon parcours professionnel :"), { type: "timeline", timelineItems: experiencesTimeline }]
          : [text("Expériences en cours de mise à jour.")],
      replies: [{ label: "Retour au menu", keywords: ["m", "menu"], next: "menu", icon: "home", color: "slate" }],
    },
    projects: {
      bot:
        projetsVisibles.length > 0
          ? [
            text(`${projetsVisibles.length} projet${projetsVisibles.length > 1 ? "s" : ""} :`),
            text(
              projetsVisibles
                .map((p) => `• ${p.titre} — ${p.technologies.join(", ")}\n${p.description}`)
                .join("\n\n"),
            ),
          ]
          : [text("Section projets en cours de mise à jour.")],
      replies: [{ label: "Retour au menu", keywords: ["m", "menu"], next: "menu", icon: "home", color: "slate" }],
    },
    contact: {
      bot: [text("Disponible par email pour discuter d'un projet : rivo.andriharisoa@example.com")],
      replies: [{ label: "Retour au menu", keywords: ["m", "menu"], next: "menu", icon: "home", color: "slate" }],
    },
  };
}