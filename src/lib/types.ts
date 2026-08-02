import { LucideIcon } from "lucide-react";

export type MessageRole = "bot" | "user";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

export type ReplyColor = "blue" | "violet" | "emerald" | "amber" | "rose" | "slate";

export interface Reply {
  label: string;
  keywords: string[];
  next: string;
  icon: keyof typeof import("./icon-map").ICON_MAP;
  color: ReplyColor;
}

export interface ConversationNode {
  bot: string[];
  replies: Reply[];
}