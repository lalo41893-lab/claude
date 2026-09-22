import React from "react";
import { Series } from "remotion";
import { Intro, Outro } from "./scenes/Intro";
import { MCP_FLOW_FRAMES, McpActors, McpFlow, McpTypes, McpWhat } from "./scenes/Mcp";
import { NotebookFeatures, NotebookGrounding } from "./scenes/NotebookLM";
import { QuarkusBuild, QuarkusNative, QuarkusUses } from "./scenes/Quarkus";

const scenes: { C: React.FC<{ duration: number }>; frames: number }[] = [
  { C: Intro, frames: 120 },
  { C: McpWhat, frames: 200 },
  { C: McpActors, frames: 210 },
  { C: McpFlow, frames: MCP_FLOW_FRAMES },
  { C: McpTypes, frames: 180 },
  { C: QuarkusBuild, frames: 210 },
  { C: QuarkusNative, frames: 190 },
  { C: QuarkusUses, frames: 210 },
  { C: NotebookGrounding, frames: 220 },
  { C: NotebookFeatures, frames: 220 },
  { C: Outro, frames: 200 },
];

export const EXPLAINER_FRAMES = scenes.reduce((sum, s) => sum + s.frames, 0);

export const Explainer: React.FC = () => (
  <Series>
    {scenes.map(({ C, frames }, i) => (
      <Series.Sequence key={i} durationInFrames={frames}>
        <C duration={frames} />
      </Series.Sequence>
    ))}
  </Series>
);
