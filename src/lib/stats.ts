import { Experience } from "./types";

export function computeYearsOfExperience(experiences: Experience[]): number {
  if (experiences.length === 0) return 0;
  const dates = experiences.map((e) => new Date(e.date_debut).getTime());
  const earliest = Math.min(...dates);
  const years = (Date.now() - earliest) / (1000 * 60 * 60 * 24 * 365);
  return Math.max(1, Math.round(years));
}