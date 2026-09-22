import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Badge, Card, FadeUp, Scene } from "../components";
import { colors } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// 8. Grounding: responde solo con tus fuentes.
export const NotebookGrounding: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [60, 80], [0, 1], clamp);
  const sources = ["PDF", "Google Docs", "URL", "Notas"];
  return (
    <Scene
      duration={duration}
      section="03 · NotebookLM"
      accent={colors.notebook}
      title="Grounding: anclado a tus propios datos"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, width: 360 }}>
          {sources.map((s, i) => (
            <FadeUp key={s} delay={15 + i * 8}>
              <Card accent={colors.notebook} style={{ padding: "18px 26px" }}>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{s}</div>
              </Card>
            </FadeUp>
          ))}
          <FadeUp delay={50}>
            <div
              style={{
                position: "relative",
                fontSize: 32,
                color: colors.muted,
                padding: "18px 26px",
                border: `2px dashed ${colors.border}`,
                borderRadius: 20,
              }}
            >
              Todo Internet
              <div
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  height: 5,
                  width: `${strike * 94}%`,
                  background: colors.danger,
                }}
              />
            </div>
          </FadeUp>
        </div>
        <FadeUp delay={70} style={{ fontSize: 70, color: colors.notebook }}>
          →
        </FadeUp>
        <FadeUp delay={80}>
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: 160,
              border: `5px solid ${colors.notebook}`,
              background: `${colors.notebook}1f`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            NotebookLM
          </div>
        </FadeUp>
        <FadeUp delay={90} style={{ fontSize: 70, color: colors.notebook }}>
          →
        </FadeUp>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <FadeUp delay={100}>
            <Card accent={colors.notebook}>
              <div style={{ fontSize: 32 }}>
                “El proyecto usa Kafka para eventos
                <sup style={{ color: colors.notebook }}> [1]</sup> y Quarkus en
                los servicios<sup style={{ color: colors.notebook }}> [2]</sup>.”
              </div>
            </Card>
          </FadeUp>
          <FadeUp delay={130}>
            <Card accent={colors.warn}>
              <div style={{ fontSize: 28, color: colors.muted }}>Si no está en tus fuentes:</div>
              <div style={{ fontSize: 34, marginTop: 8 }}>
                “No encuentro esa información en tus documentos.”
              </div>
            </Card>
          </FadeUp>
        </div>
      </div>
    </Scene>
  );
};

const Wave: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", height: 60, marginTop: 14 }}>
      {new Array(22).fill(0).map((_, i) => {
        const h = 12 + 40 * Math.abs(Math.sin(frame / 6 + i * 0.7));
        return (
          <div
            key={i}
            style={{
              width: 8,
              height: h,
              borderRadius: 4,
              background: i % 2 ? colors.notebook : colors.quarkus,
            }}
          />
        );
      })}
    </div>
  );
};

// 9. Qué se puede hacer y para qué se usa.
export const NotebookFeatures: React.FC<{ duration: number }> = ({ duration }) => {
  const features: { l: string; t: string; d: string; extra?: React.ReactNode }[] = [
    {
      l: "A",
      t: "Fuentes multiformato",
      d: "Hasta 50 fuentes: PDF, Docs, Slides, URLs o texto. Cada una de hasta 500.000 palabras.",
    },
    {
      l: "B",
      t: "Audio Overviews",
      d: "Un podcast donde dos voces discuten y resumen tus documentos.",
      extra: <Wave />,
    },
    {
      l: "C",
      t: "Guías y sumarios",
      d: "FAQs, cuestionarios, índices y cronologías generados automáticamente.",
    },
    {
      l: "D",
      t: "Citación transparente",
      d: "Cada cita te lleva al párrafo exacto del documento original.",
    },
  ];
  const uses = [
    "Investigación académica",
    "Análisis de negocios",
    "Desarrollo de software",
    "Creación de contenido",
  ];
  return (
    <Scene
      duration={duration}
      section="03 · NotebookLM"
      accent={colors.notebook}
      title="¿Qué se puede hacer?"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {features.map((f, i) => (
          <FadeUp key={f.l} delay={15 + i * 12}>
            <Card accent={colors.notebook} style={{ display: "flex", gap: 26, height: 280, boxSizing: "border-box" }}>
              <Badge color={colors.notebook}>{f.l}</Badge>
              <div>
                <div style={{ fontSize: 38, fontWeight: 800 }}>{f.t}</div>
                <div style={{ fontSize: 28, color: colors.muted, marginTop: 8 }}>{f.d}</div>
                {f.extra}
              </div>
            </Card>
          </FadeUp>
        ))}
      </div>
      <FadeUp delay={80}>
        <div style={{ display: "flex", gap: 20, marginTop: 40, alignItems: "center" }}>
          <div style={{ fontSize: 30, color: colors.muted }}>Usos comunes:</div>
          {uses.map((u) => (
            <div
              key={u}
              style={{
                fontSize: 28,
                padding: "10px 22px",
                borderRadius: 999,
                border: `2px solid ${colors.notebook}`,
                color: colors.notebook,
              }}
            >
              {u}
            </div>
          ))}
        </div>
      </FadeUp>
    </Scene>
  );
};
