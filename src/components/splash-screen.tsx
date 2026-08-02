"use client";

import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FloatingShape = dynamic(
  () => import("@/components/three/floating-shape").then((mod) => mod.FloatingShape),
  { ssr: false, loading: () => null },
);

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-5 overflow-hidden px-6 text-center animate-in fade-in duration-500">
      <div className="absolute inset-0 -z-10 opacity-70">
        <FloatingShape />
      </div>

      <Avatar className="h-16 w-16">
        <AvatarImage src="/icon.png" alt="Rivo Andriharisoa" />
        <AvatarFallback className="bg-blue-100 text-lg text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          RA
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-xl font-medium">Rivo Andriharisoa</h1>
        <p className="mt-1 text-sm text-muted-foreground">Développeur full-stack web et mobile</p>
      </div>
      <Button onClick={onEnter} className="gap-2 rounded-full">
        Découvrir mon portfolio
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}