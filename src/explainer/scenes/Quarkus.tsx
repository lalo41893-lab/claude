import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Card, FadeUp, Scene } from "../components";
import { colors, fonts } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Bar: React.FC<{
  label: string;
  width: number;
  progress: number;
  color: string;
}> = ({ label, width, progress, color }) => (
  <div
    style={{
      width: width * progress,
      height: 70,
      background: color,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      paddingLeft: 20,
      fontSize: 26,
      fontWeight: 600,
      color: "#0b1020",
      overflow: "hidden",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </div>
);

// 5. Build-time vs runtime.
export const QuarkusBuild: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const rowLabel = { width: 360, fontSize: 30, color: colors.muted };
  const trad = interpolate(frame, [30, 90], [0, 1], clamp);
  const qBuild = interpolate(frame, [100, 140], [0, 1], clamp);
  const qRun = interpolate(frame, [140, 150], [0, 1], clamp);
  return (
    <Scene
      duration={duration}
      section="02 · Quarkus"
      accent={colors.quarkus}
      title="“Container First”: el trabajo pesado, antes"
    >
      <FadeUp delay={10}>
        <div style={{ fontSize: 34, color: colors.muted }}>
          El escaneo de anotaciones y la configuración del framework se hacen en
          la compilación, no en cada arranque.
        </div>
      </FadeUp>
      <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 50 }}>
        <FadeUp delay={20}>
          <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
            Framework tradicional
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={rowLabel}>Build</div>
            <Bar label="compilar" width={220} progress={trad} color={colors.muted} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14 }}>
            <div style={rowLabel}>Runtime (cada reinicio)</div>
            <Bar
              label="escanear clases · leer config · generar proxies"
              width={1000}
              progress={trad}
              color={colors.danger}
            />
          </div>
        </FadeUp>
        <FadeUp delay={95}>
          <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, color: colors.quarkus }}>
            Quarkus
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={rowLabel}>Build</div>
            <Bar
              label="compilar · escanear · configurar · eliminar código muerto"
              width={1000}
              progress={qBuild}
              color={colors.quarkus}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14 }}>
            <div style={rowLabel}>Runtime (cada reinicio)</div>
            <Bar label="listo" width={120} progress={qRun} color={colors.notebook} />
          </div>
        </FadeUp>
      </div>
    </Scene>
  );
};

const Stat: React.FC<{ value: string; label: string; delay: number }> = ({
  value,
  label,
  delay,
}) => (
  <FadeUp delay={delay} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <Card accent={colors.quarkus} style={{ textAlign: "center", height: "100%", boxSizing: "border-box" }}>
      <div style={{ fontSize: 96, fontWeight: 800, color: colors.quarkus }}>{value}</div>
      <div style={{ fontSize: 32, color: colors.muted }}>{label}</div>
    </Card>
  </FadeUp>
);

// 6. Compilación nativa con GraalVM.
export const QuarkusNative: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const ms = Math.round(interpolate(frame, [90, 130], [3000, 20], clamp));
  const mem = Math.round(interpolate(frame, [100, 140], [0, 90], clamp));
  const pipeline = ["Código Java", "GraalVM", "Binario nativo"];
  return (
    <Scene
      duration={duration}
      section="02 · Quarkus"
      accent={colors.quarkus}
      title="Compilación nativa con GraalVM"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        {pipeline.map((p, i) => (
          <React.Fragment key={p}>
            <FadeUp delay={15 + i * 15}>
              <div
                style={{
                  padding: "26px 44px",
                  borderRadius: 20,
                  border: `3px solid ${i === 2 ? colors.quarkus : colors.border}`,
                  background: i === 2 ? `${colors.quarkus}26` : colors.panel,
                  fontSize: 40,
                  fontWeight: 700,
                  fontFamily: i === 2 ? fonts.mono : fonts.sans,
                }}
              >
                {p}
              </div>
            </FadeUp>
            {i < pipeline.length - 1 ? (
              <FadeUp delay={22 + i * 15} style={{ fontSize: 56, color: colors.muted }}>
                →
              </FadeUp>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", gap: 40, marginTop: 80 }}>
        <Stat delay={70} value="Sin JVM" label="no necesitas una JVM instalada" />
        <Stat delay={85} value={frame < 130 ? `${ms} ms` : "<20 ms"} label="de apagada a recibir tráfico" />
        <Stat delay={100} value={`-${mem}%`} label="hasta 90 % menos memoria en reposo" />
      </div>
    </Scene>
  );
};

// 7. Usos y características.
export const QuarkusUses: React.FC<{ duration: number }> = ({ duration }) => {
  const uses = [
    ["Microservicios", "Decenas o cientos de servicios que escalan rápido"],
    ["Serverless (FaaS)", "Arranque casi instantáneo: adiós al cold start"],
    ["Kubernetes", "Baja huella de memoria, menor factura en la nube"],
    ["Aplicaciones de IA", "Agentes y backends con LangChain4j"],
  ];
  const features = [
    ["Live Coding", "Guardas y el cambio se aplica sin reiniciar"],
    ["Imperativo + Reactivo", "Mismo motor: Netty y Vert.x"],
    ["Extensiones", "Hibernate · RESTEasy · LangChain4j · SmallRye Health"],
  ];
  return (
    <Scene
      duration={duration}
      section="02 · Quarkus"
      accent={colors.quarkus}
      title="¿Para qué se usa?"
    >
      <div style={{ display: "flex", gap: 60 }}>
        <div style={{ flex: 1.2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {uses.map(([t, d], i) => (
            <FadeUp key={t} delay={15 + i * 10}>
              <Card accent={colors.quarkus} style={{ height: 260, boxSizing: "border-box" }}>
                <div style={{ fontSize: 38, fontWeight: 800 }}>{t}</div>
                <div style={{ fontSize: 28, color: colors.muted, marginTop: 12 }}>{d}</div>
              </Card>
            </FadeUp>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <FadeUp delay={60}>
            <div style={{ fontSize: 36, fontWeight: 700, color: colors.quarkus, marginBottom: 20 }}>
              Características principales
            </div>
          </FadeUp>
          {features.map(([t, d], i) => (
            <FadeUp key={t} delay={70 + i * 12}>
              <div
                style={{
                  borderLeft: `6px solid ${colors.quarkus}`,
                  paddingLeft: 24,
                  marginBottom: 32,
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 700 }}>{t}</div>
                <div style={{ fontSize: 28, color: colors.muted }}>{d}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Scene>
  );
};
