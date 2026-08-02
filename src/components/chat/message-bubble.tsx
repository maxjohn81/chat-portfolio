import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";
import { SkillChips } from "./skill-chips";
import { Timeline } from "./timeline";
import { ProfileModal } from "../profile-modal";

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
        <ProfileModal>
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarImage src="/icon.png" alt="Rivo Andriharisoa" />
            <AvatarFallback className="bg-blue-100 text-[10px] font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              RA
            </AvatarFallback>
          </Avatar>
        </ProfileModal>
      )}

      {message.type === "text" && (
        <Card
          className={cn(
            "max-w-[70%] rounded-2xl border-0 px-4 py-2.5 text-sm shadow-sm whitespace-pre-line",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted",
          )}
        >
          {message.text}
        </Card>
      )}

      {message.type === "projects" &&
        message.projects?.map((p) => <ProjectCard key={p.id} projet={p} />)}

      {message.type === "skills" && message.skills && <SkillChips skills={message.skills} />}

      {message.type === "timeline" && message.timelineItems && <Timeline items={message.timelineItems} />}
    </div>
  );
}