"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { QuickReplies } from "./quick-replies";
import { ChatInput } from "./chat-input";
import { buildConversation } from "@/lib/conversation";
import { ChatMessage, PortfolioData, Reply } from "@/lib/types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ChatWindow({ initialData }: { initialData: PortfolioData }) {
  const CONVERSATION = buildConversation(initialData);

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    CONVERSATION.start.bot.map((m) => ({ id: crypto.randomUUID(), role: "bot" as const, ...m })),
  );
  const [currentNode, setCurrentNode] = useState("start");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const node = CONVERSATION[currentNode];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function playNode(nodeKey: string) {
    setBusy(true);
    const target = CONVERSATION[nodeKey];

    for (const item of target.bot) {
      await sleep(500 + Math.random() * 300);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", ...item }]);
    }

    setCurrentNode(nodeKey);
    setBusy(false);
  }

  function handleSelect(reply: Reply, label: string) {
    if (busy) return;
    // ✅ nouveau format
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", type: "text", text: label }]);
    playNode(reply.next);
  }

  async function handleFreeText(value: string) {
    const match = node.replies.find((r) => r.keywords.includes(value.toLowerCase()));
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", type: "text", text: value }]);

    if (match) {
      playNode(match.next);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", type: "text", text: data.reply ?? "Je n'ai pas pu répondre, réessaie." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", type: "text", text: "Une erreur est survenue, réessaie plus tard." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-4.5rem)] flex-col">
      <ScrollArea className="flex-1">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {busy && <TypingIndicator />}
          {!busy && node?.replies.length > 0 && (
            <QuickReplies replies={node.replies} onSelect={handleSelect} />
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur">
        <div className="mx-auto w-full max-w-2xl">
          <ChatInput onSend={handleFreeText} disabled={busy} />
        </div>
      </div>
    </div>
  );
}