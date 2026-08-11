"use client";

import { TypingText } from "@/components/lightswind/typing-text";

export function AppLoading({ onDone }: { onDone?: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <TypingText
        delay={0.5}
        duration={2}
        fontSize="text-5xl"
        fontWeight="font-extrabold"
        color="text-black dark:text-white"
        letterSpacing="tracking-wider"
        align="center"
        onDone={onDone}
      >
        Bienvenue
      </TypingText>
    </div>
  );
}
