import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "./theme";

const FADE = 12;

// Fondo, etiqueta de sección, título y fundido de entrada/salida de cada escena.
export const Scene: React.FC<{
  duration: number;
  section?: string;
  accent?: string;
  title?: string;
  children: React.ReactNode;
}> = ({ duration, section, accent = colors.mcp, title, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, FADE, duration - FADE, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        backgroundImage: `radial-gradient(circle at 85% 0%, ${accent}22, transparent 45%), radial-gradient(circle at 0% 100%, ${colors.bgSoft}, transparent 55%)`,
        color: colors.text,
        fontFamily: fonts.sans,
      }}
    >
      <AbsoluteFill style={{ opacity, padding: "80px 110px" }}>
        {section ? (
          <FadeUp delay={0}>
            <div
              style={{
                color: accent,
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              {section}
            </div>
          </FadeUp>
        ) : null}
        {title ? (
          <FadeUp delay={4}>
            <h1
              style={{
                fontSize: 68,
                fontWeight: 800,
                margin: "12px 0 0",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
          </FadeUp>
        ) : null}
        <div style={{ flex: 1, position: "relative", marginTop: 40 }}>
          {children}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const useEntrance = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 20,
  });
};

export const FadeUp: React.FC<{
  delay: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay, children, style }) => {
  const p = useEntrance(delay);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Card: React.FC<{
  accent?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ accent = colors.border, style, children }) => (
  <div
    style={{
      background: colors.panel,
      border: `2px solid ${colors.border}`,
      borderTop: `6px solid ${accent}`,
      borderRadius: 20,
      padding: "28px 32px",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Badge: React.FC<{ color: string; children: React.ReactNode }> = ({
  color,
  children,
}) => (
  <div
    style={{
      width: 64,
      height: 64,
      borderRadius: 32,
      background: `${color}33`,
      border: `3px solid ${color}`,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 30,
      fontWeight: 800,
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{ color: string; children: React.ReactNode }> = ({
  color,
  children,
}) => (
  <span
    style={{
      display: "inline-block",
      padding: "8px 20px",
      borderRadius: 999,
      background: `${color}26`,
      border: `2px solid ${color}`,
      color,
      fontFamily: fonts.mono,
      fontSize: 26,
      fontWeight: 700,
    }}
  >
    {children}
  </span>
);

// Bloque de código que se "teclea" progresivamente.
export const Code: React.FC<{
  code: string;
  delay?: number;
  charsPerFrame?: number;
  fontSize?: number;
  accent?: string;
}> = ({ code, delay = 0, charsPerFrame = 6, fontSize = 28, accent }) => {
  const frame = useCurrentFrame();
  const shown = Math.max(0, Math.floor((frame - delay) * charsPerFrame));
  return (
    <pre
      style={{
        margin: 0,
        background: "#070b16",
        border: `2px solid ${accent ?? colors.border}`,
        borderRadius: 16,
        padding: "24px 30px",
        fontFamily: fonts.mono,
        fontSize,
        lineHeight: 1.45,
        color: "#cfe0ff",
        whiteSpace: "pre",
      }}
    >
      {code.slice(0, shown)}
    </pre>
  );
};

export const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  color: string;
  width?: number;
}> = ({ x1, y1, x2, y2, progress, color, width = 4 }) => {
  const x = x1 + (x2 - x1) * progress;
  const y = y1 + (y2 - y1) * progress;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 16;
  return (
    <g opacity={progress > 0 ? 1 : 0}>
      <line
        x1={x1}
        y1={y1}
        x2={x}
        y2={y}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <polygon
        points={`${x},${y} ${x - head * Math.cos(angle - 0.45)},${y - head * Math.sin(angle - 0.45)} ${x - head * Math.cos(angle + 0.45)},${y - head * Math.sin(angle + 0.45)}`}
        fill={color}
      />
    </g>
  );
};
