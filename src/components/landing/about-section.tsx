"use client";

import { MapPin, Smartphone, Globe, Sparkles } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const highlights = [
  { icon: <Globe className="h-4 w-4" />, label: "Applications web complètes" },
  { icon: <Smartphone className="h-4 w-4" />, label: "Applications mobiles (React Native)" },
  { icon: <MapPin className="h-4 w-4" />, label: "Basé à Madagascar" },
];

export function AboutSection() {
  return (
    <section id="a-propos" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Cible d'atterrissage de l'avatar du hero */}
        <div className="flex justify-center md:justify-end">
          <div
            id="about-avatar-anchor"
            className="relative -z-10 flex h-48 w-48 items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-emerald-500/10 to-blue-500/10 sm:h-60 sm:w-60"
          >
            <Sparkles className="h-10 w-10 text-muted-foreground/40" />
          </div>
        </div>

        <div data-speed="0.9" className="max-w-lg">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">À propos</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Un développeur curieux et polyvalent</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{PROFILE.bio}</p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
