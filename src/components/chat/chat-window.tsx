"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { QuickReplies } from "./quick-replies";
import { ChatInput } from "./chat-input";
import { CONVERSATION } from "@/lib/conversation";
import { ChatMessage, Reply } from "@/lib/types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode] = useState("start");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const node = CONVERSATION[currentNode];

  useEffect(() => {
    playNode("start");
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function playNode(nodeKey: string) {
    setBusy(true);
    const target = CONVERSATION[nodeKey];

    for (const line of target.bot) {
      await sleep(500 + Math.random() * 300);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", content: line }]);
    }

    setCurrentNode(nodeKey);
    setBusy(false);
  }

  function handleSelect(reply: Reply, label: string) {
    if (busy) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: label }]);
    playNode(reply.next);
  }

  function handleFreeText(value: string) {
    const match = node.replies.find((r) => r.keywords.includes(value.toLowerCase()));
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: value }]);

    if (match) {
      playNode(match.next);
    } else {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", content: "Je n'ai pas compris — utilise un des boutons ci-dessous." },
      ]);
    }
  }

  return (
    <div className="flex h-[calc(100vh-4.5rem)] flex-col">
      <ScrollArea className="flex-1">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-6 py-6">
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