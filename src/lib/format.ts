export function formatPeriode(dateDebut: string, dateFin: string | null, enCours: boolean): string {
  const debut = new Date(dateDebut).getFullYear();
  if (enCours || !dateFin) return `${debut} — présent`;
  const fin = new Date(dateFin).getFullYear();
  return `${debut} — ${fin}`;
}