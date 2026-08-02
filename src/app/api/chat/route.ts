import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { api } from "@/lib/api";
import { PortfolioData } from "@/lib/types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function buildContext(data: PortfolioData): string {
  const projets = data.projets
    .map((p) => `${p.titre} (${p.technologies.join(", ")}) : ${p.description}`)
    .join(" | ");

  const competences = data.competences.map((c) => c.nom).join(", ");

  const experiences = data.experiences
    .map((e) => `${e.poste} chez ${e.entreprise}`)
    .join(" | ");

  const educations = data.educations
    .map((e) => `${e.diplome} — ${e.etablissement}`)
    .join(" | ");

  return `Projets : ${projets || "aucun"}
Compétences : ${competences || "aucune"}
Expériences : ${experiences || "aucune"}
Formations : ${educations || "aucune"}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const message = body?.message;

  if (!message || typeof message !== "string" || message.length > 500) {
    return NextResponse.json({ error: "Message invalide" }, { status: 400 });
  }

  const [projets, competences, experiences, educations] = await Promise.allSettled([
    api.getProjets(),
    api.getCompetences(),
    api.getExperiences(),
    api.getEducations(),
  ]);

  const context = buildContext({
    projets: projets.status === "fulfilled" ? projets.value : [],
    competences: competences.status === "fulfilled" ? competences.value : [],
    experiences: experiences.status === "fulfilled" ? experiences.value : [],
    educations: educations.status === "fulfilled" ? educations.value : [],
  });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: `Tu es l'assistant du portfolio de Rivo Andriharisoa, développeur full-stack web et mobile basé à Madagascar. Réponds en français, de façon concise (2-3 phrases maximum), avec un ton professionnel et chaleureux. Base-toi UNIQUEMENT sur les informations ci-dessous. Si la question sort de ce cadre ou que l'info n'y figure pas, dis-le honnêtement plutôt que d'inventer.

${context}`,
        },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0]?.message?.content ?? "Je n'ai pas pu générer de réponse.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Erreur Groq API:", err);
    return NextResponse.json({ error: "Erreur du service IA" }, { status: 500 });
  }
}