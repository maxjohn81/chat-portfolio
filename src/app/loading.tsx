"use client";

import { useTheme } from "next-themes";
import { TypingText } from "@/components/lightswind/typing-text";

export default function Loading() {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <TypingText
        delay={0.5}
        duration={2}
        fontSize="text-5xl"
        fontWeight="font-extrabold"
        color={isDark ? "text-white" : "text-black"}
        letterSpacing="tracking-wider"
        align="center"
      >
        Bienvenue
      </TypingText>
    </div>
  );
}