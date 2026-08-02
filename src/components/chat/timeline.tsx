import { Card } from "@/components/ui/card";
import { TimelineItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <Card className="w-full max-w-sm space-y-4 border-0 bg-muted p-4 shadow-sm">
      {items.map((item, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <span className={cn("h-2 w-2 rounded-full", item.current ? "bg-emerald-500" : "bg-muted-foreground/40")} />
            {i < items.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
          </div>
          <div className="pb-1">
            <p className="text-sm font-medium leading-tight">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground/70">{item.period}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}