"use client";

import { useEffect, useRef, useState } from "react";
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

  // Mobile (< lg) : pas de scroll horizontal — les sections s'empilent normalement,
  // le pin GSAP n'est jamais créé.
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Recadrage du layout après un basculement mobile ↔ desktop
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  useGSAP(
    () => {
      if (isMobile) return;

      // Création différée d'un tick : ScrollSmoother (créé dans LandingPage, après les
      // effets du scope enfant) doit exister avant ce pin, sinon le pin est mal intégré.
      const raf = requestAnimationFrame(() => {
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

        gsap.to(track, {
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
      });
      return () => cancelAnimationFrame(raf);
    },
    { scope: wrapperRef, dependencies: [isMobile] },
  );

  // Recalibrage du pin une fois les données chargées (skeletons → contenu final)
  useEffect(() => {
    if (loadingCompetences || isMobile) return;
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [loadingCompetences, isMobile]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      {isMobile ? (
        // Mobile : sections empilées verticalement, sans pin ni pan horizontal
        <>
          <Soft_skills />
          <Competence />
        </>
      ) : (
        /* Desktop : bandeau horizontal permanent (scroll vertical → pan horizontal) */
        <div ref={trackRef} className="flex w-max">
          <div className="min-h-screen w-screen shrink-0">
            <Soft_skills />
          </div>
          <div className="min-h-screen w-screen shrink-0">
            <Competence />
          </div>
        </div>
      )}
    </div>
  );
}