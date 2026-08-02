const API_BASE = process.env.RENDER_API_URL;

async function apiFetch<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        next: { revalidate: 300 },
    });

    if (!res.ok) {
        throw new Error(`Erreur API (${res.status}) sur ${endpoint}`);
    }

    return res.json();
}

export const api = {
    getProjets: () => apiFetch<import("./types").Projet[]>("/api/projets/tous_projets"),
    getCompetences: () => apiFetch<import("./types").Competence[]>("/api/skills/tous_skills"),
    getExperiences: () => apiFetch<import("./types").Experience[]>("/api/experiences/tous_experiences"),
    getEducations: () => apiFetch<import("./types").Education[]>("/api/educations/tous_educations"),
};