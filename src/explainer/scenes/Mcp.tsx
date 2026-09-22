import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Arrow, Badge, Card, Chip, Code, FadeUp, Scene } from "../components";
import { colors, fonts } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Node: React.FC<{
  x: number;
  y: number;
  label: string;
  color: string;
  w?: number;
}> = ({ x, y, label, color, w = 230 }) => (
  <g>
    <rect
      x={x - w / 2}
      y={y - 36}
      width={w}
      height={72}
      rx={16}
      fill={colors.panel}
      stroke={color}
      strokeWidth={3}
    />
    <text
      x={x}
      y={y + 10}
      textAnchor="middle"
      fill={colors.text}
      fontSize={28}
      fontFamily={fonts.sans}
      fontWeight={600}
    >
      {label}
    </text>
  </g>
);

const models = ["LLM A", "LLM B", "LLM C"];
const sources = ["Archivos", "Base de datos", "API"];

// 1. Qué es MCP: de integraciones N×M a un protocolo común.
export const McpWhat: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const before = interpolate(frame, [25, 70], [0, 1], clamp);
  const after = interpolate(frame, [90, 130], [0, 1], clamp);
  const ys = [90, 230, 370];
  return (
    <Scene
      duration={duration}
      section="01 · Model Context Protocol"
      title="El “USB-C” para modelos de lenguaje"
    >
      <FadeUp delay={10}>
        <div style={{ fontSize: 34, color: colors.muted, maxWidth: 1600 }}>
          Estándar abierto de Anthropic: expones tus datos una vez, con un
          protocolo universal, y cualquier LLM compatible puede consumirlos.
        </div>
      </FadeUp>
      <div style={{ display: "flex", gap: 60, marginTop: 40 }}>
        {[
          { title: "Antes: una integración por pareja", p: before, hub: false },
          { title: "Con MCP: un solo protocolo", p: after, hub: true },
        ].map((panel) => (
          <div key={panel.title} style={{ flex: 1, opacity: panel.p > 0 ? 1 : 0.25 }}>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: panel.hub ? colors.mcp : colors.danger,
                marginBottom: 10,
              }}
            >
              {panel.title}
            </div>
            <svg width={800} height={460}>
              {panel.hub
                ? ys.flatMap((y, i) => [
                    <Arrow key={`m${i}`} x1={235} y1={y} x2={345} y2={230} progress={panel.p} color={colors.mcp} />,
                    <Arrow key={`s${i}`} x1={455} y1={230} x2={565} y2={y} progress={panel.p} color={colors.mcp} />,
                  ])
                : ys.flatMap((y1, i) =>
                    ys.map((y2, j) => (
                      <Arrow
                        key={`${i}-${j}`}
                        x1={235}
                        y1={y1}
                        x2={565}
                        y2={y2}
                        progress={interpolate(panel.p, [(i * 3 + j) / 12, (i * 3 + j + 3) / 12], [0, 1], clamp)}
                        color={colors.danger}
                        width={3}
                      />
                    )),
                  )}
              {models.map((m, i) => (
                <Node key={m} x={120} y={ys[i]} label={m} color={colors.muted} />
              ))}
              {sources.map((s, i) => (
                <Node key={s} x={680} y={ys[i]} label={s} color={colors.muted} />
              ))}
              {panel.hub ? <Node x={400} y={230} label="MCP" color={colors.mcp} w={110} /> : null}
            </svg>
          </div>
        ))}
      </div>
    </Scene>
  );
};

// 2. Los tres actores.
export const McpActors: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const link = interpolate(frame, [70, 100], [0, 1], clamp);
  const pulse = (frame % 45) / 45;
  return (
    <Scene
      duration={duration}
      section="01 · MCP"
      title="Los tres actores del flujo"
    >
      <div style={{ display: "flex", alignItems: "stretch", gap: 0, height: 470 }}>
        <FadeUp delay={10} style={{ flex: 1.3 }}>
          <div
            style={{
              height: "100%",
              border: `3px dashed ${colors.mcp}`,
              borderRadius: 28,
              padding: 30,
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 800, color: colors.mcp }}>
              MCP Host · el entorno
            </div>
            <div style={{ fontSize: 28, color: colors.muted, marginTop: 8 }}>
              Claude Desktop, una IDE o tu agente local en Quarkus. Contiene el LLM.
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 36 }}>
              <FadeUp delay={30} style={{ flex: 1 }}>
                <Card accent={colors.warn}>
                  <div style={{ fontSize: 34, fontWeight: 700 }}>LLM</div>
                  <div style={{ fontSize: 26, color: colors.muted, marginTop: 8 }}>
                    Decide qué herramienta necesita
                  </div>
                </Card>
              </FadeUp>
              <FadeUp delay={45} style={{ flex: 1 }}>
                <Card accent={colors.mcp}>
                  <div style={{ fontSize: 34, fontWeight: 700 }}>MCP Client</div>
                  <div style={{ fontSize: 26, color: colors.muted, marginTop: 8 }}>
                    El conector: mantiene la conexión abierta
                  </div>
                </Card>
              </FadeUp>
            </div>
          </div>
        </FadeUp>
        <div
          style={{
            width: 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            opacity: link,
          }}
        >
          <svg width={240} height={80}>
            <line x1={10} y1={40} x2={230} y2={40} stroke={colors.border} strokeWidth={6} />
            <circle cx={10 + 220 * pulse} cy={40} r={12} fill={colors.mcp} />
          </svg>
          <div style={{ fontFamily: fonts.mono, fontSize: 24, color: colors.text, textAlign: "center" }}>
            JSON-RPC
          </div>
          <div style={{ fontSize: 22, color: colors.muted, textAlign: "center" }}>
            stdio · HTTP/SSE
          </div>
        </div>
        <FadeUp delay={60} style={{ flex: 1 }}>
          <div
            style={{
              height: "100%",
              border: `3px solid ${colors.quarkus}`,
              borderRadius: 28,
              padding: 30,
              boxSizing: "border-box",
              background: `${colors.quarkus}14`,
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 800, color: colors.quarkus }}>
              MCP Server · la fuente
            </div>
            <div style={{ fontSize: 28, color: colors.muted, marginTop: 8 }}>
              Proceso ligero (tu app Quarkus) con acceso a los datos reales.
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 36 }}>
              {["Archivos", "Bases de datos", "APIs"].map((d, i) => (
                <FadeUp key={d} delay={85 + i * 8}>
                  <Chip color={colors.quarkus}>{d}</Chip>
                </FadeUp>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </Scene>
  );
};

type Step = {
  id: string;
  title: string;
  dir: "toHost" | "toServer" | "host" | "server";
  body: React.ReactNode;
};

const steps: Step[] = [
  {
    id: "A",
    title: "Inicialización y handshake",
    dir: "toHost",
    body: (
      <div>
        <div style={{ fontSize: 32, marginBottom: 28 }}>
          “Hola, soy el servidor de Quarkus y puedo ofrecerte estas herramientas:”
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <Chip color={colors.quarkus}>leer_db</Chip>
          <Chip color={colors.quarkus}>buscar_docs</Chip>
          <Chip color={colors.quarkus}>consultar_clima</Chip>
        </div>
      </div>
    ),
  },
  {
    id: "B",
    title: "El LLM detecta la necesidad",
    dir: "host",
    body: (
      <div>
        <div
          style={{
            background: colors.bgSoft,
            borderRadius: 20,
            padding: "20px 26px",
            fontSize: 32,
          }}
        >
          <b>Usuario:</b> ¿Qué dicen mis notas locales sobre la arquitectura de
          microservicios?
        </div>
        <div style={{ fontSize: 30, color: colors.warn, marginTop: 28 }}>
          LLM: “No está en mi entrenamiento… pero existe <code>buscar_docs</code>.”
        </div>
      </div>
    ),
  },
  {
    id: "C",
    title: "Llamada a la herramienta",
    dir: "toServer",
    body: (
      <Code
        accent={colors.mcp}
        code={`{
  "method": "tools/call",
  "params": {
    "name": "buscar_docs",
    "arguments": { "query": "microservicios" }
  }
}`}
      />
    ),
  },
  {
    id: "D",
    title: "Ejecución local en Quarkus",
    dir: "server",
    body: (
      <Code
        accent={colors.quarkus}
        fontSize={26}
        code={`// Ejemplo ilustrativo (extensión quarkus-mcp-server)
@Tool(description = "Busca en las notas locales")
String buscar_docs(@ToolArg String query) {
    // SQL o lectura de archivos en disco
    return notas.extraerTextoRelevante(query);
}`}
      />
    ),
  },
  {
    id: "E",
    title: "Respuesta del servidor",
    dir: "toHost",
    body: (
      <Code
        accent={colors.quarkus}
        fontSize={26}
        code={`{
  "result": {
    "content": [{
      "type": "text",
      "text": "La arquitectura de microservicios en este
               proyecto usa Quarkus y Kafka..."
    }]
  }
}`}
      />
    ),
  },
  {
    id: "F",
    title: "Inyección en el contexto",
    dir: "host",
    body: (
      <div>
        <div style={{ fontSize: 30, color: colors.muted, marginBottom: 24 }}>
          El Host inserta el resultado en la conversación de forma invisible.
        </div>
        <div
          style={{
            background: `${colors.mcp}22`,
            border: `2px solid ${colors.mcp}`,
            borderRadius: 20,
            padding: "20px 26px",
            fontSize: 32,
          }}
        >
          <b>LLM:</b> Según tus notas, el proyecto usa microservicios con
          Quarkus y Kafka…
        </div>
      </div>
    ),
  },
];

export const STEP_FRAMES = 90;

// 3. Secuencia del flujo de datos, paso a paso.
export const McpFlow: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const intro = 20;
  const idx = Math.min(
    steps.length - 1,
    Math.max(0, Math.floor((frame - intro) / STEP_FRAMES)),
  );
  const local = frame - intro - idx * STEP_FRAMES;
  const step = steps[idx];
  const travel = interpolate(local, [10, 45], [0, 1], clamp);
  const packetX =
    step.dir === "toServer" ? 330 + 560 * travel : step.dir === "toHost" ? 890 - 560 * travel : -100;
  const glowHost = step.dir === "host" ? 1 : 0.35;
  const glowServer = step.dir === "server" ? 1 : 0.35;
  return (
    <Scene duration={duration} section="01 · MCP" title="El flujo, paso a paso">
      <div style={{ display: "flex", gap: 60 }}>
        <div style={{ width: 560 }}>
          {steps.map((s, i) => {
            const active = i === idx;
            return (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "14px 18px",
                  borderRadius: 16,
                  marginBottom: 10,
                  background: active ? colors.panel : "transparent",
                  opacity: i <= idx ? 1 : 0.35,
                }}
              >
                <Badge color={active ? colors.mcp : colors.muted}>{s.id}</Badge>
                <div style={{ fontSize: 30, fontWeight: active ? 700 : 400 }}>
                  {s.title}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1 }}>
          <svg width={1120} height={130}>
            <rect x={120} y={20} width={210} height={90} rx={18} fill={colors.panel} stroke={colors.mcp} strokeWidth={3} opacity={glowHost} />
            <text x={225} y={76} textAnchor="middle" fill={colors.text} fontSize={34} fontWeight={700} fontFamily={fonts.sans}>Host</text>
            <rect x={890} y={20} width={210} height={90} rx={18} fill={colors.panel} stroke={colors.quarkus} strokeWidth={3} opacity={glowServer} />
            <text x={995} y={76} textAnchor="middle" fill={colors.text} fontSize={34} fontWeight={700} fontFamily={fonts.sans}>Server</text>
            <line x1={330} y1={65} x2={890} y2={65} stroke={colors.border} strokeWidth={4} strokeDasharray="10 10" />
            <circle cx={packetX} cy={65} r={16} fill={step.dir === "toServer" ? colors.mcp : colors.quarkus} />
          </svg>
          <div key={step.id} style={{ marginTop: 30 }}>
            <FadeUp delay={intro + idx * STEP_FRAMES + 5}>
              <div style={{ fontSize: 28, color: colors.muted, marginBottom: 16 }}>
                Paso {step.id}
              </div>
              {step.body}
            </FadeUp>
          </div>
        </div>
      </div>
    </Scene>
  );
};

export const MCP_FLOW_FRAMES = 20 + steps.length * STEP_FRAMES + 20;

// 4. Tipos de traspaso de datos.
export const McpTypes: React.FC<{ duration: number }> = ({ duration }) => {
  const types = [
    {
      l: "R",
      name: "Resources",
      text: "Datos de solo lectura que el servidor expone: un .log, un esquema de base de datos. El modelo los lee cuando quiere.",
    },
    {
      l: "T",
      name: "Tools",
      text: "Funciones ejecutables: enviar un email, calcular una métrica. Tienen efectos secundarios o requieren cómputo activo.",
    },
    {
      l: "P",
      name: "Prompts",
      text: "Plantillas predefinidas que el servidor envía al host para guiar al modelo sobre cómo usar los datos.",
    },
  ];
  return (
    <Scene
      duration={duration}
      section="01 · MCP"
      title="Tres tipos de traspaso de datos"
    >
      <div style={{ display: "flex", gap: 40 }}>
        {types.map((t, i) => (
          <FadeUp key={t.name} delay={15 + i * 15} style={{ flex: 1 }}>
            <Card accent={colors.mcp} style={{ height: 480, boxSizing: "border-box" }}>
              <Badge color={colors.mcp}>{t.l}</Badge>
              <div style={{ fontSize: 48, fontWeight: 800, marginTop: 24 }}>
                {t.name}
              </div>
              <div style={{ fontSize: 32, color: colors.muted, marginTop: 18, lineHeight: 1.4 }}>
                {t.text}
              </div>
            </Card>
          </FadeUp>
        ))}
      </div>
    </Scene>
  );
};
