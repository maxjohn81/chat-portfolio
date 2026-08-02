"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ChatInput({ onSend, disabled }: { onSend: (value: string) => void; disabled: boolean }) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t bg-background px-6 py-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Pose une question ou tape une commande…"
        disabled={disabled}
      />
      <Button type="submit" size="icon" disabled={disabled} aria-label="Envoyer">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}