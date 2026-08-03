import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { api } from "@/lib/api";
import { CvDocument } from "@/lib/cv-document";

export async function GET() {
  const [projets, competences, experiences, educations] = await Promise.allSettled([
    api.getProjets(),
    api.getCompetences(),
    api.getExperiences(),
    api.getEducations(),
  ]);

  const data = {
    projets: projets.status === "fulfilled" ? projets.value : [],
    competences: competences.status === "fulfilled" ? competences.value : [],
    experiences: experiences.status === "fulfilled" ? experiences.value : [],
    educations: educations.status === "fulfilled" ? educations.value : [],
  };

  const buffer = await renderToBuffer(<CvDocument data={data} />);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Rivo-Andriharisoa-CV.pdf"',
    },
  });
}