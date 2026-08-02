export type MessageRole = "bot" | "user";
export type MessageContentType = "text" | "projects" | "skills" | "timeline";

export interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  current: boolean;
}

export interface BotMessage {
  type: MessageContentType;
  text?: string;
  projects?: Projet[];
  skills?: Competence[];
  timelineItems?: TimelineItem[];
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  type: MessageContentType;
  text?: string;
  projects?: Projet[];
  skills?: Competence[];
  timelineItems?: TimelineItem[];
}

export type ReplyColor = "blue" | "violet" | "emerald" | "amber" | "rose" | "slate";

export interface Reply {
  label: string;
  keywords: string[];
  next: string;
  icon: keyof typeof import("./icon-map").ICON_MAP;
  color: ReplyColor;
}

export interface ConversationNode {
  bot: BotMessage[];
  replies: Reply[];
}

export interface Projet {
  id: number;
  titre: string;
  description: string;
  image: string | null;
  lien_github: string | null;
  lien_demo: string | null;
  mis_en_avant: boolean;
  statut: string;
  ordre_affichage: number | null;
  technologies: string[];
}

export interface Competence {
  id: number;
  nom: string;
  icone: string | null;
  categorie: string;
  ordre_affichage: number | null;
}

export interface Experience {
  id: number;
  entreprise: string;
  poste: string;
  description: string;
  date_debut: string;
  date_fin: string | null;
  en_cours: boolean;
  ordre_affichage: number | null;
}

export interface Education {
  id: number;
  etablissement: string;
  diplome: string;
  domaine: string;
  date_debut: string;
  date_fin: string | null;
  description: string | null;
  en_cours: boolean;
  ordre_affichage: number | null;
}

export interface PortfolioData {
  projets: Projet[];
  competences: Competence[];
  experiences: Experience[];
  educations: Education[];
}