"use client";

import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PortfolioData } from "@/lib/types";
import { computeYearsOfExperience } from "@/lib/stats";
import { PROFILE } from "@/lib/profile";
import { ProjectPreviewCard } from "./project-preview-card";
import { ProfileModal } from "@/components/profile-modal";
import NeuralLinkBackground from "../lightswind/neural-link-background";
import { Header } from "../layout/header";
import { ScrollTimeline } from "../lightswind/scroll-timeline";
import ThreeDCarousel from "../lightswind/3d-carousel";

const FloatingShape = dynamic(
  () => import("@/components/three/floating-shape").then((mod) => mod.FloatingShape),
  { ssr: false, loading: () => null },
);

interface Props {
  data: PortfolioData;
  visitorCount?: number;
  onEnter: () => void;
}

const items = [
  {
    id: 1,
    title: "Skaneo",
    brand: "Application Mobile",
    description:
      "Application Android permettant de scanner automatiquement les cartes de recharge grâce à l'OCR local, détecter l'opérateur et générer le code USSD, entièrement hors ligne.",
    tags: ["React Native", "Expo", "OCR", "AsyncStorage", "Offline"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1784626323/Screenshot_2026-07-21-12-23-48-181_com.maxjohn.skaneo_g4yjxx.jpg",
    link: "/projects/skaneo",
  },
  {
    id: 2,
    title: "ARO",
    brand: "Plateforme Santé",
    description:
      "Plateforme web de gestion et de suivi des épidémies destinée aux administrateurs et responsables de santé avec tableaux de bord et gestion des données.",
    tags: ["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1784626809/Screenshot_2026-07-21-12-39-45-902_com.android.chrome_oiurqu.jpg",
    link: "/projects/aro",
  },
  {
    id: 3,
    title: "ARO Mobile",
    brand: "Application Mobile",
    description:
      "Application mobile permettant aux citoyens de signaler des cas suspects, consulter les alertes sanitaires et suivre les maladies dans leur zone.",
    tags: ["React Native", "Node.js", "Prisma", "PostgreSQL", "Leaflet"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1784626322/Screenshot_2026-07-21-12-23-34-041_com.maxjohn.mobile_bpnf1p.jpg",
    link: "/projects/aro-mobile",
  },
  {
    id: 4,
    title: "Actus",
    brand: "Application Mobile",
    description:
      "Application d'actualités offrant une navigation fluide, des catégories personnalisées et des informations en temps réel grâce à News API.",
    tags: ["React Native", "Expo", "TanStack Query", "NativeWind", "News API"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1784626326/Screenshot_2026-07-21-12-23-59-783_com.maxjohn.actus_votc3h.jpg",
    link: "/projects/actus",
  },
  {
    id: 5,
    title: "SafeTech",
    brand: "Site Web",
    description:
      "Site vitrine consacré à la robotique présentant les technologies modernes, les projets innovants et les applications de l'intelligence artificielle.",
    tags: ["React", "Vite", "TailwindCSS", "shadcn/ui"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1774902032/Capture_d_%C3%A9cran_2026-03-30_231746_drxcys.png",
    link: "/projects/safetech",
  },
  {
    id: 6,
    title: "Zenith",
    brand: "Plateforme Emploi",
    description:
      "Application web de publication et de gestion d'offres d'emploi avec tableau de bord administrateur et espace candidat.",
    tags: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "GSAP"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1772998179/project8_rgd2n7.png",
    link: "/projects/zenith",
  },
  {
    id: 7,
    title: "Neo Akademia",
    brand: "Application Web",
    description:
      "Plateforme de gestion d'établissement scolaire permettant l'administration des étudiants, enseignants et établissements.",
    tags: ["Vue.js", "Node.js", "Prisma", "MySQL", "TailwindCSS"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1772998170/project7_wikd4a.png",
    link: "/projects/neo-akademia",
  },
  {
    id: 8,
    title: "Gestion des tâches",
    brand: "Application Web",
    description:
      "Application de gestion de tâches avec ajout, suppression et animations modernes pour améliorer la productivité.",
    tags: ["React", "TailwindCSS", "GSAP", "Node.js"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1772998171/project6_hrup9w.png",
    link: "/projects/todo",
  },
  {
    id: 9,
    title: "Application de vente de maison",
    brand: "Plateforme Immobilière",
    description:
      "Application web permettant la publication, la recherche et la gestion de biens immobiliers avec interface administrateur.",
    tags: ["React", "TailwindCSS", "Framer Motion", "Vite"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1772998163/project1_sn1goe.png",
    link: "/projects/house-sale",
  },
  {
    id: 10,
    title: "Quiz JS",
    brand: "Application Web",
    description:
      "Quiz interactif permettant de répondre à des questions, calculer automatiquement le score et afficher les résultats.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1772998164/project2_v2dtdp.png",
    link: "/projects/quiz-js",
  },
  {
    id: 11,
    title: "Blog",
    brand: "Plateforme Web",
    description:
      "Blog interactif avec authentification, espace administrateur et gestion complète des articles dans une interface moderne.",
    tags: ["React", "TailwindCSS", "GSAP", "Vite"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1772998178/project3_lnolma.png",
    link: "/projects/blog",
  },
  {
    id: 13,
    title: "Portfolio",
    brand: "Portfolio Personnel 2025",
    description:
      "Portfolio interactif présentant mon parcours, mes compétences et mes projets avec une interface moderne et un SEO optimisé.",
    tags: ["Next.js", "TailwindCSS", "Prisma", "PostgreSQL", "Framer Motion"],
    imageUrl: "https://res.cloudinary.com/duf3yfonl/image/upload/v1774732901/Capture_d_%C3%A9cran_2026-03-29_002018_wwvnvx.png",
    link: "/projects/portfolio",
  }
];
const events = [
  {
    title: "Développeur Full-Stack",
    company: "Projets personnels",
    year: "2025 - Aujourd'hui",
    description:
      "Conception et développement d'applications web et mobiles avec React, Next.js, React Native, Node.js, Prisma et PostgreSQL.",
  },
  {
    title: "Développeur Mobile",
    company: "Skaneo",
    year: "2026 - 2027",
    description:
      "Développement d'une application Android permettant de scanner des cartes de recharge grâce à l'OCR, détecter automatiquement l'opérateur et générer le code USSD, entièrement hors ligne.",
  },
  {
    title: "Développeur Full-Stack",
    company: "ARO",
    year: "2026",
    description:
      "Participation au développement d'une plateforme de gestion des épidémies avec React, React Native, Node.js, Prisma et PostgreSQL.",
  },
  {
    title: "Développeur Web",
    company: "Portfolio Personnel",
    year: "2026",
    description:
      "Création d'un portfolio moderne sous Next.js avec animations, mode sombre, SEO optimisé, données structurées et interface interactive.",
  },
  {
    title: "Stagiaire",
    company: "D'Ando Communication",
    year: "2025",
    description:
      "Stage de trois mois dans une boutique de services numériques et de télécommunication, suivi d'une embauche.",
  },
  {
    title: "Hackathon",
    company: "EMIHACK 2025",
    year: "2025",
    description:
      "Participation à un hackathon universitaire axé sur le développement d'applications innovantes en équipe.",
  },
  {
    title: "Formation",
    company: "Orange Digital Center",
    year: "2025",
    description:
      "Formation en leadership, innovation et travail collaboratif dans un environnement numérique.",
  },
];

export function LandingPage({ data, visitorCount, onEnter }: Props) {
  const years = computeYearsOfExperience(data.experiences);
  const projetsVisibles = data.projets.filter((p) => p.statut === "brouillon");

  return (
    <div className="min-h-screen">
      <div className="fixed w-full -z-10 flex h-screen items-center justify-center">
        <NeuralLinkBackground
          nodeColor="#10b981"      // emerald-500
          lineColor="#10b981"      // note : non utilisé par le composant en interne, gardé pour cohérence de l'appel
          packetColor="#34d399"    // emerald-400, packet légèrement plus clair pour se démarquer des nœuds
          nodeCount={70}
          maxDistance={120}
          interactionMode="pulse"
          interactive
          packetFrequency={2500}
        />
      </div>
      <Header />
      {/* Hero */}
      <section id="accueil" className="mx-auto max-w-6xl px-6 pb-20 relative  flex flex-col items-center justify-center gap-5 overflow-hidden px-6 py-20 text-center">


        <ProfileModal>
          <Avatar className="h-20 w-20 shadow-md">
            <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
            <AvatarFallback className="bg-blue-100 text-lg text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              RA
            </AvatarFallback>
          </Avatar>
        </ProfileModal>

        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{PROFILE.name}</h1>
          <p className="mt-1 text-muted-foreground">{PROFILE.title}</p>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{PROFILE.bio}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={onEnter} size="lg" className="gap-2 rounded-full">
            <MessageCircle className="h-4 w-4" />
            Discuter avec moi
          </Button>
          <Button variant="outline" size="lg" className="gap-2 rounded-full">
            <ArrowRight className="h-4 w-4" />
            <a href="#projets">
              Voir mes projets
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-sm">
          <div>
            <p className="text-xl font-semibold">{projetsVisibles.length}</p>
            <p className="text-muted-foreground">Projets</p>
          </div>
          <div>
            <p className="text-xl font-semibold">{years}+</p>
            <p className="text-muted-foreground">Ans d'expérience</p>
          </div>
          <div>
            <p className="text-xl font-semibold">{data.competences.length}</p>
            <p className="text-muted-foreground">Compétences</p>
          </div>
          {typeof visitorCount === "number" && (
            <div>
              <p className="text-xl font-semibold">{visitorCount}</p>
              <p className="text-muted-foreground">Visiteurs</p>
            </div>
          )}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-6 pb-20">
        <ScrollTimeline
          events={events}
          title="Mes expériences"
          subtitle="Un aperçu de mon parcours professionnel et académique"
          progressIndicator={true}
          cardAlignment="alternating"
          revealAnimation="fade"
        />
      </section>

      {/* Aperçu projets */}
      {projetsVisibles.length > 0 && (
        <section id="projets" className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Projets récents
          </h2>

          <ThreeDCarousel
            items={items}
            autoRotate={true}
            rotateInterval={4000}
            cardHeight={500}
          />
        </section>
      )}
    </div>
  );
}