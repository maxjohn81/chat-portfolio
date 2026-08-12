"use client";

import { useEffect, useRef, useState } from "react";
import ThreeDSlider from "../lightswind/3d-slider";

const sliderItems = [
    { title: "Travail en équipe", num: "01", imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTClDXayT5PYGi3HdmIsPS719CAdp8q-6VMCTS5R1tkkvIGsHhY", data: { id: 1 } },
    { title: "Créativité", num: "02", imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRMtzZtb7ou5r_DGlyJVGMNx4x1yxWkNJyxTzHKrzo2UP4r83ug", data: { id: 2 } },
    { title: "Communication", num: "03", imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcScf7fR9BpogekawN4tcjzttz7SOqdOZCFH62M8ChpIcKrN5sX1", data: { id: 3 } },
    { title: "Résolution de problèmes", num: "04", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3GlhuglB8hnVWswvwgRj8kx-caNS3V4TC1E27OAxW0Q-ovCG0", data: { id: 4 } },
    { title: "Gestion du temps", num: "05", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUV2FT4z5gC81EMdu4AMoHZeAqR8Kjf83zpiDaErLiWtCubtMs", data: { id: 5 } },
    { title: "Leadership", num: "06", imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQh2ee-1MSrPVC_k9yrmbDsdVoGJXU-WcgDUN4XZ8MKSMb8hWjw", data: { id: 6 } },
    { title: "Éthique professionnelle", num: "07", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtlBHoZvVdBGJIV41mhJVm5SEG8ncai36veBFBocdxlHLIxp6", data: { id: 7 } },
    { title: "Attitude positive", num: "08", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOsYQmEOJxQahflas6zZK9HRQjslka86IOwWrCf_DMZrp54wcG", data: { id: 8 } },
    { title: "Adaptabilité", num: "09", imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT2hk3_D7F0tNojlnLurvDdjnurU4dIpJlK2v3WnuvKqAqvLm6k", data: { id: 9 } },
    { title: "Empathie", num: "10", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5fFKp2bdnBYg4SRoHenoXtHQ9ukZN6M1JmC0gA99eVk-hzCR", data: { id: 10 } },
];

export default function Soft_skills() {
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
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-24 sm:py-32"
        >
            {/* Ambient background: soft radial glow, theme-aware */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(60% 50% at 15% 20%, hsl(var(--primary) / 0.08), transparent 70%)",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />

            <div className="mx-auto max-w-6xl px-6 ">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
                    {/* Intro column — sticky on large screens */}
                    <div
                        className={`lg:col-span-4 lg:sticky lg:top-28 lg:self-start transition-all duration-700 ease-out ${
                            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" aria-hidden />
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                                Mes soft skills
                            </p>
                        </div>

                        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                            Moi, en quelques mots.
                        </h2>

                        <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
                            Dix qualités qui façonnent ma façon de travailler — au-delà du code, de la
                            manière dont je collabore, décide, et m'adapte.
                        </p>

                        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">10</span>
                            <span>traits à découvrir</span>
                            <span className="mx-1 hidden sm:inline">·</span>
                            <span className="hidden items-center gap-1.5 sm:flex">
                                <svg
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                faites défiler
                            </span>
                        </div>
                    </div>

                    {/* Slider column */}
                    <div
                        className={`lg:col-span-8 transition-all duration-700 ease-out delay-150 ${
                            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                    >
                        <ThreeDSlider
                            items={sliderItems}
                            speedWheel={0.03}
                            speedDrag={-0.15}
                            containerStyle={{ height: "80vh", borderRadius: "1rem" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}