import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Competence } from "@/lib/types";

export function SkillChips({ skills }: { skills: Competence[] }) {
  const groupes = skills.reduce<Record<string, Competence[]>>((acc, s) => {
    (acc[s.categorie] ??= []).push(s);
    return acc;
  }, {});

  return (
    <Card className="w-full max-w-sm space-y-3 border-0 bg-muted p-4 shadow-sm">
      {Object.entries(groupes).map(([categorie, items]) => (
        <div key={categorie}>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {categorie}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {items.map((s) => (
              <Badge key={s.id} className="bg-blue-100 font-normal text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300">
                {s.nom}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </Card>
  );
}