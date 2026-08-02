import { Button } from "@/components/ui/button";
import { Reply } from "@/lib/types";
import { ICON_MAP } from "@/lib/icon-map";
import { REPLY_COLOR_CLASSES } from "@/lib/colors";
import { cn } from "@/lib/utils";

interface Props {
  replies: Reply[];
  onSelect: (reply: Reply, label: string) => void;
}

export function QuickReplies({ replies, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300">
      {replies.map((reply) => {
        const Icon = ICON_MAP[reply.icon];
        return (
          <Button
            key={reply.next}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full gap-1.5 border transition-transform hover:scale-[1.03] active:scale-[0.98]",
              REPLY_COLOR_CLASSES[reply.color],
            )}
            onClick={() => onSelect(reply, reply.label)}
          >
            <Icon className="h-3.5 w-3.5" />
            {reply.label}
          </Button>
        );
      })}
    </div>
  );
}