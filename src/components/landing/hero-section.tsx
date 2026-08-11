"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PortfolioData } from "@/lib/types";
import { computeYearsOfExperience } from "@/lib/stats";
import { PROFILE } from "@/lib/profile";
import { estProjetVisible } from "@/lib/visibilite";
import { ProfileModal } from "@/components/profile-modal";

interface Props {
  data: PortfolioData;
  visitorCount?: number;
  onEnter: () => void;
  loadingProjets?: boolean;
  loadingCompetences?: boolean;
  loadingExperiences?: boolean;
}

export function HeroSection({
  data,
  visitorCount,
  onEnter,
  loadingProjets = false,
  loadingCompetences = false,
  loadingExperiences = false,
}: Props) {
  const years = computeYearsOfExperience(data.experiences);
  const projetsVisibles = data.projets.filter(estProjetVisible);

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen flex-col items-center justify-center gap-10 px-6 pb-20 pt-32 text-center"
    >
      {/* Avatar : part vers la section "À propos" au scroll */}
      <div id="hero-avatar" className="relative z-10">
        <ProfileModal>
          <Avatar className="h-24 w-24 shadow-md sm:h-28 sm:w-28">
            <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
            <AvatarFallback className="bg-blue-100 text-lg text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              RA
            </AvatarFallback>
          </Avatar>
        </ProfileModal>
      </div>

      <div id="hero-content" className="flex flex-col items-center gap-5">
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
      </div>
    </section>
  );
}
