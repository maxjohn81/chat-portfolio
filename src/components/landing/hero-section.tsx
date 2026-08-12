"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, Users } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PortfolioData } from "@/lib/types";
import { computeYearsOfExperience } from "@/lib/stats";
import { PROFILE } from "@/lib/profile";
import { estProjetVisible } from "@/lib/visibilite";
import { ProfileModal } from "@/components/profile-modal";
import Svg from "../3d/3dsvg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRotateRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Animations pilotées par le scroll :
  // - rotation gauche → droite de l'objet 3D pendant la traversée du hero
  // - rétrécissement du très grand visuel d'arrière-plan au moment d'arriver dans "À propos"
  useGSAP(
    () => {
      // Création différée d'un tick : ScrollSmoother (créé dans LandingPage après les
      // effets des composants enfants) doit exister avant ces ScrollTriggers.
      const raf = requestAnimationFrame(() => {
        const obj = scrollRotateRef.current;
        const section = sectionRef.current;
        if (!obj || !section) return;

        gsap.fromTo(
          obj,
          { rotationY: -20 },
          {
            rotationY: 20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
      return () => cancelAnimationFrame(raf);
    },
    { scope: sectionRef },
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 → 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 18 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative flex min-h-screen items-center px-6 pb-16 pt-32"
    >
      {/* Fond : glow + grille de points, pour donner de la profondeur derrière le 3D */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 75% 40%, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground) / 0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(60% 60% at 70% 40%, black, transparent)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12">
        {/* Avatar — énorme, en arrière-plan derrière le titre sur grands écrans ; petit au-dessus du texte sur mobile */}
        <div
          id="hero-avatar"
          className="relative z-0 mx-auto h-16 w-16 sm:h-20 sm:w-20 lg:absolute lg:inset-0 lg:m-auto lg:h-[62vh] lg:w-[62vh]"
        >
          <ProfileModal>
            <Avatar className="h-full w-full shadow-md">
              <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
              <AvatarFallback className="bg-blue-100 text-lg text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                RA
              </AvatarFallback>
            </Avatar>
          </ProfileModal>
        </div>

        {/* Colonne texte — au-dessus du visuel d'arrière-plan */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div id="hero-content" className="flex flex-col items-center gap-6 lg:items-start">
            {/* Eyebrow discret au-dessus du titre */}
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {PROFILE.title}
            </p>

            {/* Très grand titre qui domine la section, devant le visuel d'arrière-plan */}
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {PROFILE.name}
            </h1>

            {/* Paragraphe court explicatif */}
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {PROFILE.bio}
            </p>

            {/* CTA plein + preuve sociale */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button onClick={onEnter} size="lg" className="gap-2 rounded-full px-6">
                <MessageCircle className="h-4 w-4" />
                Discuter avec moi
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {PROFILE.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {social.icon === "github" ? (
                        <FaGithub className="h-4 w-4" />
                      ) : (
                        <FaLinkedin className="h-4 w-4" />
                      )}
                    </a>
                  ))}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground">
                    <Users className="h-4 w-4" />
                  </span>
                </div>
                {typeof visitorCount === "number" && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{visitorCount}</span>{" "}
                    visiteurs déjà passés
                  </p>
                )}
              </div>
            </div>

            {/* Stats — projets / expérience / compétences / visiteurs */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-8 text-sm lg:justify-start">
              <div>
                {loadingProjets ? (
                  <Skeleton className="mx-auto h-7 w-10 rounded-md lg:mx-0" />
                ) : (
                  <p className="text-xl font-semibold">{projetsVisibles.length}</p>
                )}
                <p className="text-muted-foreground">Projets</p>
              </div>
              <div>
                {loadingExperiences ? (
                  <Skeleton className="mx-auto h-7 w-10 rounded-md lg:mx-0" />
                ) : (
                  <p className="text-xl font-semibold">{years}+</p>
                )}
                <p className="text-muted-foreground">Ans d&apos;expérience</p>
              </div>
              <div>
                {loadingCompetences ? (
                  <Skeleton className="mx-auto h-7 w-10 rounded-md lg:mx-0" />
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
        </div>

        {/* Visuel 3D — à droite, juste à côté derrière le nom sur grands écrans ; en dessous du texte sur mobile */}
        <div
          className="relative mx-auto flex h-[300px] w-full max-w-md items-center justify-center [perspective:1200px] sm:h-[420px] lg:absolute lg:top-1/2 lg:right-0 lg:z-[4] lg:h-[540px] lg:w-[50%] lg:max-w-none lg:-translate-y-1/2"
        >
          {/* Blob organique derrière le visuel, purement CSS */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-[85%] w-[88%]"
            style={{
              borderRadius: "62% 38% 55% 45% / 45% 58% 42% 55%",
              background:
                "radial-gradient(circle at 32% 32%, hsl(var(--primary) / 0.16), hsl(var(--primary) / 0.05) 60%, transparent 78%)",
            }}
          />

          {/* Cercle décoratif fin qui traverse partiellement la composition */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-6 top-[12%] hidden h-36 w-36 rounded-full border border-primary/25 sm:block lg:-left-9 lg:h-44 lg:w-44"
          />

          {/* Halo derrière l'objet */}
          <div
            aria-hidden
            className="absolute h-2/3 w-2/3 rounded-full blur-3xl"
            style={{ background: "hsl(var(--primary) / 0.25)" }}
          />

          {/* Rotation + scale pilotés par le scroll (GSAP) sur ce wrapper, tilt React sur l'enfant */}
          <div
            ref={scrollRotateRef}
            className="relative h-full w-full [transform-style:preserve-3d]"
          >
            <div
              ref={stageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-full w-full transition-transform duration-200 ease-out will-change-transform"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <Svg />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}