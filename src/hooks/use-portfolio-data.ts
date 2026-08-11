"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import type { PortfolioData } from "@/lib/types";

type SectionKey = keyof PortfolioData;

export interface PortfolioLoadState {
  data: PortfolioData;
  loading: boolean;
  loadingProjets: boolean;
  loadingCompetences: boolean;
  loadingExperiences: boolean;
  loadingEducations: boolean;
}

const EMPTY: PortfolioData = { projets: [], competences: [], experiences: [], educations: [] };

const SECTIONS: { key: SectionKey; fetcher: () => Promise<unknown> }[] = [
  { key: "projets", fetcher: api.getProjets },
  { key: "competences", fetcher: api.getCompetences },
  { key: "experiences", fetcher: api.getExperiences },
  { key: "educations", fetcher: api.getEducations },
];

export function usePortfolioData(initialData?: PortfolioData): PortfolioLoadState {
  const [data, setData] = useState<PortfolioData>(initialData ?? EMPTY);
  const [settled, setSettled] = useState<Record<SectionKey, boolean>>({
    projets: false,
    competences: false,
    experiences: false,
    educations: false,
  });
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const fetchSection = (key: SectionKey, fetcher: () => Promise<unknown>) => {
      fetcher()
        .then((value) => {
          setData((prev) => ({ ...prev, [key]: value as PortfolioData[SectionKey] }));
        })
        .catch(() => {
          // En cas d'échec, on conserve les données initiales fournies par le serveur.
        })
        .finally(() => {
          setSettled((prev) => ({ ...prev, [key]: true }));
        });
    };

    for (const section of SECTIONS) {
      fetchSection(section.key, section.fetcher);
    }
  }, []);

  const anySettled = Object.values(settled).some(Boolean);

  return {
    data,
    loading: !anySettled,
    loadingProjets: !settled.projets,
    loadingCompetences: !settled.competences,
    loadingExperiences: !settled.experiences,
    loadingEducations: !settled.educations,
  };
}
