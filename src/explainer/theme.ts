import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fuentes locales (public/fonts) para que el render no dependa de la red.
loadFont({
  family: "Inter",
  url: staticFile("fonts/inter-latin-wght-normal.woff2"),
  weight: "100 900",
});
loadFont({
  family: "JetBrains Mono",
  url: staticFile("fonts/jetbrains-mono-latin-wght-normal.woff2"),
  weight: "100 800",
});

export const fonts = {
  sans: "Inter, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const colors = {
  bg: "#0b1020",
  bgSoft: "#121a30",
  panel: "#18223d",
  border: "#2a3659",
  text: "#eef2ff",
  muted: "#9aa6c7",
  mcp: "#e07a5f",
  quarkus: "#4695eb",
  notebook: "#3ecf8e",
  warn: "#f2c14e",
  danger: "#ef6b6b",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
