import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full items-end gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarImage src="/avatar.png" alt="Rivo Andriharisoa" />
          <AvatarFallback className="bg-blue-100 text-[10px] font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            RA
          </AvatarFallback>
        </Avatar>
      )}
      <Card
        className={cn(
          "max-w-[70%] rounded-2xl border-0 px-4 py-2.5 text-sm shadow-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {message.content}
      </Card>
    </div>
  );
}