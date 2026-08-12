"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Skeleton } from "@/components/ui/skeleton";
import { PortfolioData } from "@/lib/types";
import { toCarouselItems, toTimelineEvents } from "@/lib/adapters";
import { estProjetVisible } from "@/lib/visibilite";
import NeuralLinkBackground from "../lightswind/neural-link-background";
import { Header } from "../layout/header";
import { ScrollTimeline } from "../lightswind/scroll-timeline";
import ThreeDCarousel from "../lightswind/3d-carousel";
import { Footer } from "../layout/footer";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import Soft_skills from "./soft-skills";
import Competence from "./competence";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, ScrollToPlugin);

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
  const rootRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const projetsVisibles = data.projets.filter(estProjetVisible);
  const events = toTimelineEvents(data.experiences);
  const carouselItems = toCarouselItems(data.projets);

  useGSAP(
    () => {
      smootherRef.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
      });

      // Ancres → scroll fluide via ScrollSmoother
      const handleAnchorClick = (event: MouseEvent) => {
        const link = (event.target as HTMLElement)?.closest?.(
          'a[href^="#"]',
        ) as HTMLAnchorElement | null;
        if (!link) return;
        const hash = link.getAttribute("href");
        if (!hash || hash === "#") return;
        if (!rootRef.current?.querySelector(hash)) return;
        event.preventDefault();
        smootherRef.current?.scrollTo(hash, true, "top 80px");
      };
      document.addEventListener("click", handleAnchorClick);

      // Vol de l'avatar du hero vers la section "À propos"
      const hero = rootRef.current?.querySelector("#accueil");
      const avatar = rootRef.current?.querySelector("#hero-avatar");
      const anchor = rootRef.current?.querySelector("#about-avatar-anchor");
      const content = rootRef.current?.querySelector("#hero-content");

      if (hero && avatar && anchor && content) {
        const getTargets = () => {
          const ar = avatar.getBoundingClientRect();
          const br = anchor.getBoundingClientRect();
          return {
            x: br.left + br.width / 2 - (ar.left + ar.width / 2),
            y: br.top + br.height / 2 - (ar.top + ar.height / 2),
            scale: (br.width * 0.62) / ar.width,
          };
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=10px",
            pin: true,
            pinType: "transform",
            scrub: 1,
          },
        });

        tl.to(content, { opacity: 0, y: -120, ease: "none" }, 0).to(
          avatar,
          {
            x: () => getTargets().x,
            y: () => getTargets().y,
            scale: () => getTargets().scale,
            ease: "none",
          },
          0,
        );
      }

      return () => {
        document.removeEventListener("click", handleAnchorClick);
        smootherRef.current?.kill();
        smootherRef.current = null;
      };
    },
    { scope: rootRef },
  );

  // Recadrage des triggers quand les données arrivent (skeletons → contenu)
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [loadingProjets, loadingExperiences]);

  return (
    <div ref={rootRef} className="min-h-screen">
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

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection
            data={data}
            visitorCount={visitorCount}
            onEnter={onEnter}
            loadingProjets={loadingProjets}
            loadingCompetences={loadingCompetences}
            loadingExperiences={loadingExperiences}
          />

          <AboutSection />

          <Soft_skills />

          <Competence />


          <section
            id="experience"
            className="relative mx-auto max-w-6xl px-6 py-20"
          >
            {/* Ligne de lumière verticale — signature "parcours", différente du glow radial des autres sections */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.25) 20%, hsl(var(--primary) / 0.25) 80%, transparent)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />

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
            <section id="projets" className="relative overflow-hidden py-20">
              {/* Ambient glow, centré — cohérent avec les sections compétences / soft skills */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(50% 40% at 50% 0%, hsl(var(--primary) / 0.06), transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
              />

              <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="mx-auto max-w-xl animate-in fade-in slide-in-from-bottom-4 text-center duration-700">
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-primary" aria-hidden />
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                      Projets récents
                    </p>
                    <span className="h-px w-8 bg-primary" aria-hidden />
                  </div>

                  <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    Ce que j'ai construit
                  </h2>

                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Une sélection de projets, du prototype à la mise en production.
                  </p>
                </div>

                {/* Carousel / loading state */}
                <div className="mt-14 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
                  {loadingProjets ? (
                    <div className="flex items-center justify-center gap-6 overflow-hidden py-10">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton
                          key={i}
                          className="h-[500px] w-full max-w-md rounded-xl"
                          style={{
                            opacity: i === 1 ? 1 : 0.5,
                            transform: i === 1 ? "scale(1)" : "scale(0.92)",
                          }}
                        />
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
                </div>
              </div>
            </section>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
}
