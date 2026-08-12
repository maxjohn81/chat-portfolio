"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Soft_skills from "./soft-skills";
import Competence from "./competence";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
  loadingCompetences?: boolean;
}

export default function HorizontalScrollSection({
  loadingCompetences = false,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Création différée d'un tick : ScrollSmoother (créé dans LandingPage, après les
      // effets du scope enfant) doit exister avant ce pin, sinon le pin est mal intégré.
      const mm = gsap.matchMedia();
      const raf = requestAnimationFrame(() => {
        mm.add("(min-width: 1024px)", () => {
          const track = trackRef.current;
          const wrapper = wrapperRef.current;
          if (!track || !wrapper || !track.children.length) return;

          // Largeur totale du contenu horizontal, calculée dynamiquement
          const getDistance = () => {
            const width = Array.from(track.children).reduce(
              (sum, child) => sum + (child as HTMLElement).offsetWidth,
              0,
            );
            return Math.max(width - window.innerWidth, 0);
          };

          const tween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: () => "+=" + getDistance(),
              scrub: 1,
              pin: true,
              pinType: "transform",
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        });
      });
      return () => {
        cancelAnimationFrame(raf);
      };
    },
    { scope: wrapperRef },
  );

  // Recalibrage du pin une fois les données chargées (skeletons → contenu final)
  useEffect(() => {
    if (loadingCompetences) return;
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [loadingCompetences]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      {/* Empilement vertical par défaut ; bandeau horizontal uniquement sur grands écrans */}
      <div ref={trackRef} className="block lg:flex lg:w-max">
        <div className="w-full lg:min-h-screen lg:w-screen lg:shrink-0">
          <Soft_skills />
        </div>
        <div className="w-full lg:min-h-screen lg:w-screen lg:shrink-0">
          <Competence />
        </div>
      </div>
    </div>
  );
}