"use client";

import React, { useState, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SourceItem {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  type?: "default" | "skeleton" | "custom";
  badge?: string;
  href?: string;
  color?: string;
}

export interface KnowledgeConvergenceProps {
  /** Root container extra CSS classes */
  className?: string;
  /** Main focal point title on the right */
  title?: string;
  /** Badge text displayed next to main title */
  badgeText?: string;
  /** Toggle badge display */
  showBadge?: boolean;
  /** Custom list of source nodes on the left */
  sources?: SourceItem[];
  /** Primary connection glowing dot & beam accent color */
  dotColor?: string;
  /** Color theme override ('light' | 'dark' | 'system') */
  theme?: "light" | "dark" | "system";
  /** Background ambient spotlight glow intensity */
  glowIntensity?: "low" | "medium" | "high";
  /** Optional click handler for title or target node */
  onTargetClick?: () => void;
}

/* Built-in Brand Icons */
/* Built-in Skill Icons */
const NextJsIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-black text-white shrink-0 shadow-xs">
    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.526.363.04 1.935.04 2.298 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.192-1.955-2.62l-1.919-2.593-2.404-3.559a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.578-.023 3.51-.007 3.38-.01 3.516-.052 3.596a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.44.44 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092c.037-.05.114-.114.171-.143.098-.049.135-.055.517-.055.454 0 .53.017.65.147.034.037 1.279 1.91 2.767 4.166a10760.433 10760.433 0 0 0 4.966 7.516l1.32 2c.067-.043.132-.088.196-.135a12.06 12.06 0 0 0 2.163-2.132 11.847 11.847 0 0 0 2.53-6.601c.09-.649.1-.847.1-1.678 0-.898-.012-1.086-.108-1.746-.652-4.494-3.847-8.281-8.196-9.696a12.5 12.5 0 0 0-2.483-.523A34.245 34.245 0 0 0 11.572 0z" />
    </svg>
  </div>
);

const ReactIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-sky-500/10 text-sky-500 shrink-0 border border-sky-500/20 shadow-xs">
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 13.867c-1.032 0-1.867-.835-1.867-1.867S10.968 10.133 12 10.133s1.867.835 1.867 1.867S13.032 13.867 12 13.867zM12 5.2c-6.6 0-11.2 2.4-11.2 6.8s4.6 6.8 11.2 6.8 11.2-2.4 11.2-6.8S18.6 5.2 12 5.2zm0 1.6c1.1 0 2.15.09 3.13.25a20.9 20.9 0 0 1 1.79 3.05 20.9 20.9 0 0 1 1.79-3.05c3.65.6 5.99 1.95 5.99 3.9s-2.34 3.3-5.99 3.9a20.9 20.9 0 0 1-1.79-3.05 20.9 20.9 0 0 1-1.79 3.05C13.95 15.71 12.9 15.8 11.8 15.8c-1.1 0-2.15-.09-3.13-.25a20.9 20.9 0 0 1-1.79-3.05 20.9 20.9 0 0 1-1.79 3.05c-3.65-.6-5.99-1.95-5.99-3.9s2.34-3.3 5.99-3.9c.55.98 1.15 2.02 1.79 3.05.64-1.03 1.24-2.07 1.79-3.05.98-.16 2.03-.25 3.13-.25z" />
    </svg>
  </div>
);

const TypeScriptIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-blue-600 text-white shrink-0 shadow-xs font-bold text-[9px]">
    TS
  </div>
);

const JavaScriptIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-yellow-400 text-black shrink-0 shadow-xs font-bold text-[9px]">
    JS
  </div>
);

const TailwindIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-cyan-500/10 text-cyan-500 shrink-0 border border-cyan-500/20 shadow-xs">
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 6c-2.667 0-4.333 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5.761.192 1.305.75 1.906 1.365C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.761-.192-1.305-.75-1.906-1.365C15.613 7.145 14.478 6 12 6zM7 12c-2.667 0-4.333 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5.761.192 1.305.75 1.906 1.365C8.387 16.855 9.522 18 12 18c2.667 0 4.333-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.761-.192-1.305-.75-1.906-1.365C10.613 13.145 9.478 12 7 12z" />
    </svg>
  </div>
);

const NodeIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-green-600/10 text-green-600 shrink-0 border border-green-600/20 shadow-xs">
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 21.985c-.275 0-.532-.074-.772-.202l-2.439-1.448c-.365-.203-.182-.276-.072-.312.496-.165.588-.201 1.101-.493.056-.037.129-.02.185.017l1.87 1.12c.074.036.166.036.221 0l7.319-4.237c.074-.036.11-.11.11-.202V7.815c0-.092-.036-.166-.11-.202l-7.319-4.219c-.074-.036-.166-.036-.221 0L4.552 7.613c-.073.036-.11.129-.11.202v8.415c0 .073.037.166.11.202l2 1.157c1.082.548 1.762-.095 1.762-.735V8.593c0-.11.091-.221.22-.221h.936c.108 0 .22.091.22.221v8.417c0 1.449-.788 2.294-2.164 2.294-.422 0-.752 0-1.688-.46l-1.925-1.099a1.55 1.55 0 0 1-.771-1.34V7.813c0-.55.293-1.064.771-1.339l7.316-4.237a1.611 1.611 0 0 1 1.544 0l7.317 4.237c.478.276.771.789.771 1.339v8.418c0 .549-.293 1.063-.771 1.34l-7.317 4.236c-.24.129-.516.202-.79.202z" />
    </svg>
  </div>
);

const NestJsIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-red-600/10 text-red-600 shrink-0 border border-red-600/20 shadow-xs font-bold text-[9px]">
    N
  </div>
);

const PhpIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-indigo-500/10 text-indigo-500 shrink-0 border border-indigo-500/20 shadow-xs font-bold text-[8px]">
    PHP
  </div>
);

const GsapIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-lime-500/10 text-lime-600 shrink-0 border border-lime-500/20 shadow-xs font-bold text-[9px]">
    GS
  </div>
);

const PostgreSQLIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-blue-800/10 text-blue-800 shrink-0 border border-blue-800/20 shadow-xs font-bold text-[8px]">
    PG
  </div>
);

const AiIntegrationIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shrink-0 shadow-xs">
    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2zM19 15l.8 2.9L22.7 18.7l-2.9.8L19 22.4l-.8-2.9-2.9-.8 2.9-.8L19 15z" />
    </svg>
  </div>
);

const FastApiIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-teal-500/10 text-teal-600 shrink-0 border border-teal-500/20 shadow-xs font-bold text-[8px]">
    FA
  </div>
);

/* Exact Header Lightswind Logo */
const HeaderLogo = () => (
  <div className="relative flex items-center justify-center shrink-0">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0nYz0FztrQM5fbiFE7qZDmA5R3RHTDkYk02CoGrvpQQ&s=10"
      alt="Lightswind UI"
      className="h-8 w-auto rounded-full shadow-sm"
    />
  </div>
);

const defaultSourcesList: SourceItem[] = [
  { id: "skel-top", type: "skeleton" },
  { id: "react", label: "React.js", icon: <ReactIcon /> },
  { id: "nextjs", label: "Next.js", icon: <NextJsIcon /> },
  { id: "typescript", label: "TypeScript", icon: <TypeScriptIcon /> },
  // { id: "javascript", label: "JavaScript", icon: <JavaScriptIcon /> },
  { id: "tailwind", label: "Tailwind CSS", icon: <TailwindIcon /> },
  { id: "node", label: "Node.js", icon: <NodeIcon /> },
  { id: "fastapi", label: "FastAPI (Python)", icon: <FastApiIcon /> },
  // { id: "nestjs", label: "NestJS", icon: <NestJsIcon /> },
  { id: "php", label: "PHP", icon: <PhpIcon /> },
  // { id: "gsap", label: "GSAP", icon: <GsapIcon /> },
  { id: "postgresql", label: "PostgreSQL", icon: <PostgreSQLIcon /> },
  // { id: "ai", label: "AI Integration", icon: <AiIntegrationIcon /> },
  { id: "skel-bottom", type: "skeleton" },
];

export const KnowledgeConvergence: React.FC<KnowledgeConvergenceProps> = ({
  className,
  title = "Lightswind UI",
  badgeText = "v3.1",
  showBadge = true,
  sources = defaultSourcesList,
  dotColor = "#0284c7", // Skyblue Theme Accent
  glowIntensity = "high",
  onTargetClick,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const filterId = useId();

  // Normalized 1000 x 600 viewBox layout coordinate system
  const viewBoxWidth = 1000;
  const viewBoxHeight = 600;

  // Left card connection point coordinates directly centered on pill dots
  const leftX = 232;
  const targetX = 635;
  const targetY = 300;

  // Vertical distribution centered around 300
  const sourceCount = sources.length;
  const totalHeight = 440;
  const startY = 80;
  const stepY = sourceCount > 1 ? totalHeight / (sourceCount - 1) : 0;

  const getSourceY = (index: number) => startY + index * stepY;

  return (
    <div
      className={cn(
        "relative w-full min-h-[480px] lg:min-h-[560px] rounded-3xl overflow-hidden select-none flex items-center justify-center p-4 sm:p-8 bg-transparent text-slate-800 dark:text-slate-100",
        className
      )}
    >
      {/* Responsive Hub Canvas */}
      <div className="relative w-full max-w-5xl h-full flex flex-col md:flex-row items-center justify-between gap-6 z-10">
        
        {/* SVG Skyblue Bezier Beams & Animated Energy Trails */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Skyblue Neon Beam Stream Gradient */}
            <linearGradient id={`${filterId}-stream-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="80%" stopColor="#0284c7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
            </linearGradient>

            {/* Soft Glow Filter for Electric Beams */}
            <filter id={`${filterId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glowing Particle Filter */}
            <filter id={`${filterId}-dot-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render Bezier Stream Lines */}
          <g>
            {sources.map((src, i) => {
              const srcY = getSourceY(i);
              const isHovered = hoveredId === src.id;
              const isAnyHovered = hoveredId !== null;

              // Bezier curve calculations connecting pill node dots to hub node
              const pathD = `M ${leftX} ${srcY} C ${leftX + 180} ${srcY}, ${targetX - 180} ${targetY}, ${targetX} ${targetY}`;

              return (
                <g key={src.id}>
                  {/* Skyblue Vector Stream */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={`url(#${filterId}-stream-grad)`}
                    strokeWidth={isHovered ? 3.8 : 2}
                    strokeOpacity={isHovered ? 1 : isAnyHovered ? 0.25 : 0.6}
                    filter={`url(#${filterId}-glow)`}
                    className="transition-all duration-300"
                  />

                  {/* Pulsing Light Dotted Stream */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={dotColor}
                    strokeWidth={isHovered ? 2.5 : 1.3}
                    strokeDasharray="8 16"
                    strokeOpacity={isHovered ? 1 : 0.4}
                    className="transition-all duration-300"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="48"
                      to="0"
                      dur={isHovered ? "0.9s" : "2.2s"}
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Skyblue Primary Energy Flow Dot */}
                  <circle r={isHovered ? 4.5 : 3.5} fill="#0284c7" filter={`url(#${filterId}-dot-glow)`}>
                    <animateMotion
                      path={pathD}
                      dur={isHovered ? "1.3s" : `${2.0 + (i % 3) * 0.4}s`}
                      repeatCount="indefinite"
                      begin={`${(i * 0.3) % 2}s`}
                    />
                  </circle>

                  {/* Secondary Cyan Energy Particle */}
                  <circle r="2.2" fill="#38bdf8" opacity="0.9">
                    <animateMotion
                      path={pathD}
                      dur={isHovered ? "1.3s" : `${2.0 + (i % 3) * 0.4}s`}
                      repeatCount="indefinite"
                      begin={`${((i * 0.3) % 2) + 1.0}s`}
                    />
                  </circle>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Left Side: Source Nodes Stack with Light & Dark Theme Adaptivity */}
        <div className="relative z-20 flex flex-col justify-between h-[440px] w-full md:w-auto min-w-[235px]">
          {sources.map((src) => {
            const isHovered = hoveredId === src.id;

            if (src.type === "skeleton") {
              return (
                <div
                  key={src.id}
                  onMouseEnter={() => setHoveredId(src.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/40 border border-slate-300/60 dark:border-slate-700/50 backdrop-blur-xs w-44 opacity-60 transition-all duration-300 hover:opacity-100"
                >
                  <div className="h-2.5 w-24 rounded-full bg-slate-400/40 dark:bg-slate-600/40 animate-pulse" />
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_10px_#0284c7]"
                    style={{ backgroundColor: dotColor }}
                  />
                </div>
              );
            }

            return (
              <motion.div
                key={src.id}
                onMouseEnter={() => setHoveredId(src.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ scale: 1.03, x: 5 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className={cn(
                  "relative flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer select-none",
                  // Light Mode: clean light card with dark text | Dark Mode: slate dark card with white text
                  "bg-slate-100/90 dark:bg-[#0e1629]/90 border-slate-300/80 dark:border-slate-800/80 shadow-xs backdrop-blur-md",
                  "hover:bg-white dark:hover:bg-[#14203a] hover:border-sky-500/50 hover:shadow-md dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]",
                  isHovered && "border-sky-500 bg-white dark:bg-[#162442] dark:border-sky-400"
                )}
              >
                {/* Source Icon & Title */}
                <div className="flex items-center gap-3">
                  {src.icon}
                  <span className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-100">
                    {src.label}
                  </span>
                </div>

                {/* Glowing Connection Dot */}
                <div className="relative flex items-center justify-center shrink-0">
                  <div
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-transform duration-300",
                      isHovered && "scale-130"
                    )}
                    style={{
                      backgroundColor: dotColor,
                      boxShadow: `0 0 10px ${dotColor}, 0 0 18px ${dotColor}`,
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none"
                    style={{ backgroundColor: dotColor }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Side: Lightswind UI Target Node & Header Logo */}
        <div className="relative z-20 flex items-center gap-5 my-auto md:pl-8">
          {/* Central Hub Node Pulsing Dot */}
          <div className="relative flex items-center justify-center shrink-0">
            {/* Glowing Halo */}
            <div
              className="absolute w-14 h-14 rounded-full opacity-70 animate-pulse pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${dotColor} 0%, transparent 70%)`,
                filter: "blur(6px)",
              }}
            />
            {/* Central Skyblue Node Core */}
            <div
              className="w-4 h-4 rounded-full relative z-10 transition-transform duration-300 hover:scale-125 cursor-pointer"
              style={{
                backgroundColor: dotColor,
                boxShadow: `0 0 14px ${dotColor}, 0 0 28px ${dotColor}`,
              }}
              onClick={onTargetClick}
            />
            <div
              className="absolute w-9 h-9 rounded-full border border-sky-500/50 animate-ping pointer-events-none"
            />
          </div>

          {/* Header Lightswind Logo & Clean Title (No Underline) */}
          <div className="flex items-center gap-3">
            {/* Exact Logo from Header */}
            <HeaderLogo />

            {/* Title Text (Adaptive Light/Dark Theme) */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h2>

            {/* Status Pill Badge */}
            {showBadge && (
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-500/20 dark:border-sky-400/30 backdrop-blur-md shadow-xs">
                {badgeText}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default KnowledgeConvergence;
