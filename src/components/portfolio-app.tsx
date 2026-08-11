"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { ChatWindow } from "@/components/chat/chat-window";
import { LandingPage } from "@/components/landing/landing-page";
import { AppLoading } from "@/components/app-loading";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { PortfolioData } from "@/lib/types";

export function PortfolioApp({ initialData, visitorCount }: { initialData: PortfolioData; visitorCount?: number }) {
  const { data, loadingProjets, loadingCompetences, loadingExperiences } = usePortfolioData(initialData);
  const [entered, setEntered] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <AppLoading onDone={() => setSplashDone(true)} />;
  }

  if (!entered) {
    return (
      <LandingPage
        data={data}
        visitorCount={visitorCount}
        onEnter={() => setEntered(true)}
        loadingProjets={loadingProjets}
        loadingCompetences={loadingCompetences}
        loadingExperiences={loadingExperiences}
      />
    );
  }

  return (
    <div className="flex h-screen flex-col animate-in fade-in duration-300">
      <SiteHeader />
      <div className="flex-1"></div>
      <ChatWindow
        initialData={data}
        onBack={() => {
          setEntered(false);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}
