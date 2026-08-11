"use client";

import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PortfolioData } from "@/lib/types";
import { computeYearsOfExperience } from "@/lib/stats";
import { PROFILE } from "@/lib/profile";
import { toCarouselItems, toTimelineEvents } from "@/lib/adapters";
import { estProjetVisible } from "@/lib/visibilite";
import { ProfileModal } from "@/components/profile-modal";
import NeuralLinkBackground from "../lightswind/neural-link-background";
import { Header } from "../layout/header";
import { ScrollTimeline } from "../lightswind/scroll-timeline";
import ThreeDCarousel from "../lightswind/3d-carousel";
import { Footer } from "../layout/footer";

const FloatingShape = dynamic(
  () => import("@/components/three/floating-shape").then((mod) => mod.FloatingShape),
  { ssr: false, loading: () => null },
);

interface Props {
  data: PortfolioData;
  visitorCount?: number;
  onEnter: () => void;
  loadingProjets?: boolean;
  loadingCompetences?: boolean;
  loadingExperiences?: boolean;
}

function ExperienceSkeleton() {
  return (
    <div className="py-16">
      <div className="mb-10 flex flex-col items-center gap-3">
        <Skeleton className="h-10 w-64 rounded-md" />
        <Skeleton className="h-5 w-80 max-w-full rounded-md" />
      </div>
      <div className="space-y-8 px-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mx-auto w-full max-w-2xl">
            <Skeleton className="h-36 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LandingPage({
  data,
  visitorCount,
  onEnter,
  loadingProjets = false,
  loadingCompetences = false,
  loadingExperiences = false,
}: Props) {
  const years = computeYearsOfExperience(data.experiences);
  const projetsVisibles = data.projets.filter(estProjetVisible);
  const events = toTimelineEvents(data.experiences);
  const carouselItems = toCarouselItems(data.projets);

  return (
    <div className="min-h-screen">
      <div className="fixed w-full -z-10 flex h-screen items-center justify-center">
        <NeuralLinkBackground
          nodeColor="#10b981"
          lineColor="#10b981"
          packetColor="#34d399"
          nodeCount={70}
          maxDistance={120}
          interactionMode="pulse"
          interactive
          packetFrequency={2500}
        />
      </div>
      <Header />
      {/* Hero */}
      <section id="accueil" className="relative mx-auto flex max-w-6xl flex-col items-center justify-center gap-5 px-6 pb-20 pt-32 text-center">

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
          <a
            href="#projets"
            className={buttonVariants({ variant: "outline", size: "lg", className: "gap-2 rounded-full" })}
          >
            <ArrowRight className="h-4 w-4" />
            Voir mes projets
          </a>
        </div>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-sm">
          <div>
            {loadingProjets ? (
              <Skeleton className="mx-auto h-7 w-10 rounded-md" />
            ) : (
              <p className="text-xl font-semibold">{projetsVisibles.length}</p>
            )}
            <p className="text-muted-foreground">Projets</p>
          </div>
          <div>
            {loadingExperiences ? (
              <Skeleton className="mx-auto h-7 w-10 rounded-md" />
            ) : (
              <p className="text-xl font-semibold">{years}+</p>
            )}
            <p className="text-muted-foreground">Ans d&apos;expérience</p>
          </div>
          <div>
            {loadingCompetences ? (
              <Skeleton className="mx-auto h-7 w-10 rounded-md" />
            ) : (
              <p className="text-xl font-semibold">{data.competences.length}</p>
            )}
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

      <section id="experience" className="relative mx-auto max-w-6xl px-6 pb-20">
        {loadingExperiences ? (
          <ExperienceSkeleton />
        ) : (
          <ScrollTimeline
            events={events}
            title="Mes expériences"
            subtitle="Un aperçu de mon parcours professionnel et académique"
            progressIndicator={true}
            cardAlignment="alternating"
            revealAnimation="fade"
          />
        )}
      </section>

      {/* Aperçu projets */}
      {(loadingProjets || projetsVisibles.length > 0) && (
        <section id="projets" className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Projets récents
          </h2>

          {loadingProjets ? (
            <div className="flex items-center justify-center gap-6 overflow-hidden py-10">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[500px] w-full max-w-md rounded-xl" />
              ))}
            </div>
          ) : (
            <ThreeDCarousel
              items={carouselItems}
              autoRotate={true}
              rotateInterval={4000}
              cardHeight={500}
            />
          )}
        </section>
      )}

      <Footer />
    </div>
  );
}
