import { ConversationNode } from "./types";

export const CONVERSATION: Record<string, ConversationNode> = {
  start: {
    bot: [
      "Bonjour, je suis Rivo Andriharisoa, développeur full-stack web et mobile.",
      "Ce portfolio se découvre en conversation — tape une commande ou clique sur un bouton pour continuer.",
    ],
    replies: [
      { label: "Commencer", keywords: ["r", "continuer", "start"], next: "menu", icon: "arrow", color: "blue" },
    ],
  },
  menu: {
    bot: ["Qu'est-ce qui t'intéresse ?"],
    replies: [
      { label: "À propos", keywords: ["a", "apropos"], next: "about", icon: "user", color: "blue" },
      { label: "Compétences", keywords: ["c", "competences"], next: "skills", icon: "wrench", color: "violet" },
      { label: "Projets", keywords: ["p", "projets"], next: "projects", icon: "folder", color: "emerald" },
      { label: "Contact", keywords: ["m", "contact"], next: "contact", icon: "mail", color: "amber" },
    ],
  },
  about: {
    bot: [
      "Développeur full-stack web et mobile, basé à Madagascar.",
      "Je conçois et développe des applications complètes — du back-end à l'interface finale, en passant par le déploiement.",
    ],
    replies: [
      { label: "Retour au menu", keywords: ["m", "menu"], next: "menu", icon: "home", color: "slate" },
    ],
  },
  skills: {
    bot: ["Frontend : React, Next.js. Backend : Node.js, Express. Mobile : applications natives et cross-platform. Bases de données : PostgreSQL."],
    replies: [
      { label: "Retour au menu", keywords: ["m", "menu"], next: "menu", icon: "home", color: "slate" },
    ],
  },
  projects: {
    bot: ["Skaneo — application Android 100% offline qui scanne les cartes de recharge par OCR et génère automatiquement le code USSD."],
    replies: [
      { label: "Retour au menu", keywords: ["m", "menu"], next: "menu", icon: "home", color: "slate" },
    ],
  },
  contact: {
    bot: ["Disponible par email pour discuter d'un projet : rivo.andriharisoa@example.com"],
    replies: [
      { label: "Retour au menu", keywords: ["m", "menu"], next: "menu", icon: "home", color: "slate" },
    ],
  },
};