"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { ChatWindow } from "@/components/chat/chat-window";
import { LandingPage } from "@/components/landing/landing-page";
import { PortfolioData } from "@/lib/types";

export function PortfolioApp({ initialData, visitorCount }: { initialData: PortfolioData; visitorCount?: number }) {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <LandingPage data={initialData} visitorCount={visitorCount} onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="flex h-screen flex-col animate-in fade-in duration-300">
      <SiteHeader />
      <div className="flex-1"></div>
      <ChatWindow initialData={initialData} />
    </div>
  );
}