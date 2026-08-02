import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, ExternalLink } from "lucide-react";
import { Projet } from "@/lib/types";

export function ProjectCard({ projet }: { projet: Projet }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden border-0 bg-muted shadow-sm">
      {projet.image && (
        <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${projet.image})` }} />
      )}
      <div className="p-4">
        <p className="text-sm font-medium">{projet.titre}</p>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{projet.description}</p>

        {projet.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {projet.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[10px] font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {(projet.lien_demo || projet.lien_github) && (
          <div className="mt-3 flex gap-2">
            {projet.lien_demo && (
              <Button  size="sm" variant="outline" className="h-7 gap-1.5 rounded-full text-xs">
                <a href={projet.lien_demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" /> Démo
                </a>
              </Button>
            )}
            {projet.lien_github && (
              <Button size="sm" variant="outline" className="h-7 gap-1.5 rounded-full text-xs">
                <a href={projet.lien_github} target="_blank" rel="noopener noreferrer">
                  <Code2 className="h-3 w-3" /> Code
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}