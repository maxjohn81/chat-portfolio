"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { ChatWindow } from "@/components/chat/chat-window";
import { SplashScreen } from "@/components/splash-screen";

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <SplashScreen onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="flex h-screen flex-col animate-in fade-in duration-300">
      <SiteHeader />
      <ChatWindow />
    </div>
  );
}