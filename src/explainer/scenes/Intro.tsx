import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FadeUp, Scene } from "../components";
import { colors } from "../theme";

const pills = [
  { label: "MCP", sub: "Contexto", color: colors.mcp },
  { label: "Quarkus", sub: "Rendimiento", color: colors.quarkus },
  { label: "NotebookLM", sub: "Conocimiento", color: colors.notebook },
];

export const Intro: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [30, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Scene duration={duration}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <FadeUp delay={0}>
          <div style={{ color: colors.muted, fontSize: 34, letterSpacing: 6 }}>
            GUÍA VISUAL
          </div>
        </FadeUp>
        <FadeUp delay={8}>
          <h1 style={{ fontSize: 120, fontWeight: 800, margin: "16px 0" }}>
            Agentes de IA con contexto
          </h1>
        </FadeUp>
        <div
          style={{
            height: 6,
            width: 900 * line,
            background: `linear-gradient(90deg, ${colors.mcp}, ${colors.quarkus}, ${colors.notebook})`,
            borderRadius: 3,
          }}
        />
        <div style={{ display: "flex", gap: 40, marginTop: 60 }}>
          {pills.map((p, i) => (
            <FadeUp key={p.label} delay={40 + i * 10}>
              <div
                style={{
                  border: `3px solid ${p.color}`,
                  background: `${p.color}1f`,
                  borderRadius: 24,
                  padding: "24px 40px",
                }}
              >
                <div style={{ fontSize: 52, fontWeight: 800, color: p.color }}>
                  {p.label}
                </div>
                <div style={{ fontSize: 30, color: colors.muted }}>{p.sub}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Scene>
  );
};

export const Outro: React.FC<{ duration: number }> = ({ duration }) => {
  const steps = [
    {
      color: colors.notebook,
      title: "NotebookLM",
      text: "Diseña la arquitectura anclado a la documentación de Quarkus y la especificación MCP",
    },
    {
      color: colors.quarkus,
      title: "Servidor Quarkus",
      text: "Expone tus datos como tools, resources y prompts, con arranque en milisegundos",
    },
    {
      color: colors.mcp,
      title: "Host + LLM",
      text: "Llama a las herramientas por JSON-RPC y responde con tu contexto real",
    },
  ];
  return (
    <Scene
      duration={duration}
      section="En resumen"
      accent={colors.notebook}
      title="Cómo encajan las tres piezas"
    >
      <div style={{ display: "flex", alignItems: "stretch", gap: 30 }}>
        {steps.map((s, i) => (
          <React.Fragment key={s.title}>
            <FadeUp delay={15 + i * 18} style={{ flex: 1 }}>
              <div
                style={{
                  height: "100%",
                  background: colors.panel,
                  border: `3px solid ${s.color}`,
                  borderRadius: 24,
                  padding: 36,
                  boxSizing: "border-box",
                }}
              >
                <div style={{ color: s.color, fontSize: 44, fontWeight: 800 }}>
                  {s.title}
                </div>
                <div
                  style={{ fontSize: 32, color: colors.text, marginTop: 18, lineHeight: 1.35 }}
                >
                  {s.text}
                </div>
              </div>
            </FadeUp>
            {i < steps.length - 1 ? (
              <FadeUp
                delay={24 + i * 18}
                style={{ display: "flex", alignItems: "center", fontSize: 60, color: colors.muted }}
              >
                →
              </FadeUp>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <FadeUp delay={80}>
        <div
          style={{
            marginTop: 70,
            fontSize: 44,
            fontWeight: 600,
            textAlign: "center",
            color: colors.muted,
          }}
        >
          Un protocolo universal, un runtime ligero y un cerebro anclado a tus fuentes.
        </div>
      </FadeUp>
    </Scene>
  );
};
