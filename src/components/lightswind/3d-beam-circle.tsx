"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type BeamOrbitConfig = {
  /** Unique id per orbit */
  id: number;
  /** Orbit radius as fraction of viewBox width (0–0.5). Default auto-spaced. */
  radiusFactor?: number;
  /** Speed of travel along the arc (seconds per sweep). Default 10 */
  speed?: number;
  /** Custom stroke color of the orbit arc line */
  orbitColor?: string;
  /** Stroke thickness of the orbit arc in px. Default 1.2 */
  orbitThickness?: number;
  /** Badge background color */
  boxColor?: string;
  /** Badge border/glow color */
  glowColor?: string;
  /** Badge size (diameter) in px. Default 32 */
  size?: number;
  /** Initial position offset along the arc (0–1 fraction). Default 0 */
  delay?: number;
  /** Optional element/flag rendered inside the round badge */
  children?: React.ReactNode;
};

export type ThreeDBeamCircleProps = {
  /** Width override or CSS width. Default "100%" */
  width?: string | number;
  /** Height override or CSS height. Default "100%" */
  height?: string | number;
  /** SVG viewBox width. Default 800 */
  viewBoxWidth?: number;
  /** SVG viewBox height. Default 440 */
  viewBoxHeight?: number;
  /** Custom orbits configuration array. */
  orbits?: BeamOrbitConfig[];
  /** Content rendered at the bottom center origin point. */
  centerContent?: React.ReactNode;
  /** Render mode: "semi-circle" (half dome anchored at bottom, default) or "full-circle". */
  mode?: "semi-circle" | "full-circle";
  /** Extra class name for the root wrapper element. */
  className?: string;
  /** Show subtle ambient glow at origin. Default true */
  centerGlow?: boolean;
};

/* ------------------------------------------------------------------ */
/*  Default Orbits Configuration                                      */
/* ------------------------------------------------------------------ */

const DEFAULT_SEMI_ORBITS: BeamOrbitConfig[] = [
  {
    id: 0,
    radiusFactor: 0.15,
    speed: 8,
    size: 28,
    delay: 0.1,
  },
  {
    id: 1,
    radiusFactor: 0.26,
    speed: 12,
    size: 32,
    delay: 0.4,
  },
  {
    id: 2,
    radiusFactor: 0.37,
    speed: 16,
    size: 34,
    delay: 0.7,
  },
  {
    id: 3,
    radiusFactor: 0.46,
    speed: 22,
    size: 36,
    delay: 0.88,
  },
];

/* ------------------------------------------------------------------ */
/*  Traveler Badge along Semi-Circle Arc                              */
/* ------------------------------------------------------------------ */
function ArcTravelerBadge({
  cx,
  cy,
  radius,
  speed = 10,
  delay = 0,
  badgeSize = 32,
  boxColor,
  glowColor,
  isFullCircle = false,
  children,
}: {
  cx: number;
  cy: number;
  radius: number;
  speed?: number;
  delay?: number;
  badgeSize?: number;
  boxColor?: string;
  glowColor?: string;
  isFullCircle?: boolean;
  children?: React.ReactNode;
}) {
  const frameRef = useRef<number>();
  const lastRef = useRef<number>(0);
  const [pos, setPos] = useState({ x: cx - radius, y: cy });

  useEffect(() => {
    let tAcc = delay * speed;

    const tick = (ts: number) => {
      const dt = lastRef.current ? (ts - lastRef.current) / 1000 : 0;
      lastRef.current = ts;
      tAcc += dt;

      let x: number, y: number;

      if (isFullCircle) {
        const angle = (tAcc / speed) * 2 * Math.PI;
        x = cx + radius * Math.cos(angle);
        y = cy + radius * Math.sin(angle);
      } else {
        // Smooth sine wave oscillation along the top semi-circle arc (π to 0 radians)
        const progress = (Math.sin((tAcc / speed) * Math.PI) + 1) / 2; // 0 to 1
        const angle = Math.PI - progress * Math.PI; // π to 0
        x = cx + radius * Math.cos(angle);
        y = cy - radius * Math.sin(angle);
      }

      setPos({ x, y });
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [cx, cy, radius, speed, delay, isFullCircle]);

  return (
    <foreignObject
      x={pos.x - badgeSize / 2}
      y={pos.y - badgeSize / 2}
      width={badgeSize}
      height={badgeSize}
      style={{ overflow: "visible" }}
    >
      <div
        className={cn(
          "w-full h-full rounded-full flex items-center justify-center border transition-all duration-200 shadow-md select-none",
          !boxColor && "bg-white text-zinc-900 border-zinc-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
        )}
        style={{
          backgroundColor: boxColor,
          borderColor: glowColor ? `${glowColor}99` : undefined,
          boxShadow: glowColor
            ? `0 0 16px ${glowColor}66, 0 2px 8px rgba(0,0,0,0.15)`
            : "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        {children}
      </div>
    </foreignObject>
  );
}

/* ------------------------------------------------------------------ */
/*  Main 3D Beam Circle (Semi-Circle Arc Dome) Component              */
/* ------------------------------------------------------------------ */
export const ThreeDBeamCircle: React.FC<ThreeDBeamCircleProps> = ({
  width = "100%",
  height = "100%",
  viewBoxWidth = 800,
  viewBoxHeight = 440,
  orbits: customOrbits,
  centerContent,
  mode = "semi-circle",
  className,
  centerGlow = true,
}) => {
  const orbits = useMemo(() => customOrbits ?? DEFAULT_SEMI_ORBITS, [customOrbits]);

  const cx = viewBoxWidth / 2;
  const cy = mode === "semi-circle" ? viewBoxHeight - 12 : viewBoxHeight / 2;

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-end select-none overflow-hidden transition-colors duration-300 text-foreground",
        className
      )}
      style={{ width, height }}
    >
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMax slice"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          {orbits.map((orbit) => {
            const rf = orbit.radiusFactor ?? 0.3;
            const r = viewBoxWidth * rf;
            const gradId = `arcGrad_${orbit.id}`;
            // Arc endpoints for a perfect semi-circle
            const x0 = cx - r;
            const x1 = cx + r;
            // gradient goes left→center→right (horizontal), fades in/out
            return (
              <linearGradient key={gradId} id={gradId} x1={x0} y1={cy} x2={x1} y2={cy} gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor={orbit.orbitColor ?? "currentColor"} stopOpacity="0" />
                <stop offset="30%"  stopColor={orbit.orbitColor ?? "currentColor"} stopOpacity="0.45" />
                <stop offset="50%"  stopColor={orbit.orbitColor ?? "currentColor"} stopOpacity="0.75" />
                <stop offset="70%"  stopColor={orbit.orbitColor ?? "currentColor"} stopOpacity="0.45" />
                <stop offset="100%" stopColor={orbit.orbitColor ?? "currentColor"} stopOpacity="0" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Orbit Arc Lines & Traveling Badges */}
        {orbits.map((orbit) => {
          const rf = orbit.radiusFactor ?? 0.3;
          const r = viewBoxWidth * rf;
          const thickness = orbit.orbitThickness ?? 1.5;
          const gradId = `arcGrad_${orbit.id}`;

          return (
            <g key={orbit.id}>
              {/* Gradient-stroked arc line — fades from transparent at edges to vivid at center */}
              {mode === "semi-circle" ? (
                <path
                  d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                  fill="none"
                  stroke={`url(#${gradId})`}
                  strokeWidth={thickness}
                  strokeLinecap="round"
                />
              ) : (
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={orbit.orbitColor ?? "currentColor"}
                  strokeWidth={thickness}
                  strokeOpacity={0.5}
                />
              )}

              {/* Traveling Flag / Icon Badge */}
              <ArcTravelerBadge
                cx={cx}
                cy={cy}
                radius={r}
                speed={orbit.speed ?? 10}
                delay={orbit.delay ?? 0}
                badgeSize={orbit.size ?? 32}
                boxColor={orbit.boxColor}
                glowColor={orbit.glowColor}
                isFullCircle={mode === "full-circle"}
              >
                {orbit.children}
              </ArcTravelerBadge>
            </g>
          );
        })}


        {/* Center Origin Node (Anchored at Bottom Edge) */}
        {centerContent && (
          <foreignObject
            x={cx - 26}
            y={cy - 26}
            width={52}
            height={52}
            style={{ overflow: "visible" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {centerContent}
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
};

export default ThreeDBeamCircle;
