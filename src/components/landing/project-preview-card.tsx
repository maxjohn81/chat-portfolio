import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Projet } from "@/lib/types";

export function ProjectPreviewCard({ projet }: { projet: Projet }) {
  return (
    <Card className="overflow-hidden border-0 bg-muted shadow-sm transition-transform hover:-translate-y-1">
      {projet.image && (
        <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${projet.image})` }} />
      )}
      <div className="p-4">
        <p className="text-sm font-medium">{projet.titre}</p>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{projet.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {projet.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-[10px] font-normal">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}