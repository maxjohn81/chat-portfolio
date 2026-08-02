import { Card } from "@/components/ui/card";

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <Card className="flex w-fit items-center gap-1 rounded-2xl border-0 bg-muted px-4 py-3 shadow-none">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </Card>
    </div>
  );
}