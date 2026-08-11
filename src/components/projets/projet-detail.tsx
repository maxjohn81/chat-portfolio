"use client";

import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/lib/profile";
import NeuralLinkBackground from "@/components/lightswind/neural-link-background";
import { Footer } from "@/components/layout/footer";

export interface ProjetDetailData {
  slug: string;
  title: string;
  brand: string;
  description: string;
  tags: string[];
  imageUrl: string;
  lienGithub: string | null;
  lienDemo: string | null;
}

export function ProjetDetail({ projet }: { projet: ProjetDetailData }) {
  return (
    <div className="min-h-screen">
      <div className="fixed w-full -z-10 flex h-screen items-center justify-center">
        <NeuralLinkBackground
          nodeColor="#10b981"
          packetColor="#34d399"
          nodeCount={60}
          maxDistance={120}
          interactionMode="pulse"
          interactive
          packetFrequency={2500}
        />
      </div>

      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
          <Link
            href="/#projets"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux projets
          </Link>
          <span className="text-sm font-medium">{PROFILE.name}</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="relative h-64 w-full overflow-hidden rounded-xl border bg-muted sm:h-80">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${projet.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-white/80">{projet.brand}</p>
            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{projet.title}</h1>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {projet.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Description
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{projet.description}</p>
        </div>

        {(projet.lienDemo || projet.lienGithub) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {projet.lienDemo && (
              <a
                href={projet.lienDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                <ExternalLink className="h-4 w-4" />
                Voir la démo
              </a>
            )}
            {projet.lienGithub && (
              <a
                href={projet.lienGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Code2 className="h-4 w-4" />
                Code source
              </a>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
