"use client";

import { useEffect, useRef, useState } from "react";
import KnowledgeConvergence from "../lightswind/knowledge-convergence";

export default function Competence() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32">
            {/* Ambient background, mirrored from the soft-skills section but on the right this time */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(60% 50% at 85% 15%, hsl(var(--primary) / 0.08), transparent 70%)",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />

            <div className="mx-auto max-w-6xl px-6 ">
                {/* Header block */}
                <div
                    className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
                        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    <div className="flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-primary" aria-hidden />
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                            Stack technique
                        </p>
                        <span className="h-px w-8 bg-primary" aria-hidden />
                    </div>

                    <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                        Mes compétences
                    </h1>

                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        Les langages, frameworks et outils que j'assemble au quotidien pour
                        transformer une idée en produit fini — du frontend à l'API, en passant
                        par l'intégration d'IA.
                    </p>
                </div>

                {/* Convergence graph */}
                <div
                    className={`mt-16 transition-all duration-700 ease-out delay-150 ${
                        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                >
                    <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur-sm sm:p-10">
                        <KnowledgeConvergence
                            title="Mes Stacks"
                            badgeText="12"
                            glowIntensity="high"
                            dotColor="hsl(var(--primary))"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}