# MCP · Quarkus · NotebookLM — video explicativo

Video animado (1920×1080, 30 fps, ~85 s) hecho con Remotion que explica:

1. **MCP (Model Context Protocol)**: la analogía del “USB-C”, los tres actores
   (Host, Client, Server), el flujo JSON-RPC paso a paso (A–F) y los tipos
   de traspaso (Resources, Tools, Prompts).
2. **Quarkus**: build-time vs runtime, compilación nativa con GraalVM, usos y
   características principales.
3. **NotebookLM**: grounding, fuentes multiformato, Audio Overviews, guías y
   citación transparente.
4. **Resumen**: cómo encajan las tres piezas.

Las escenas están en `src/explainer/scenes/`. La composición se llama
`McpQuarkusNotebookLM`:

```console
npx remotion render McpQuarkusNotebookLM out/mcp-quarkus-notebooklm.mp4
```

Las fuentes (Inter y JetBrains Mono, licencia OFL) están en `public/fonts/`,
así que el render no necesita conexión a internet.

---

# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
