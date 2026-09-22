import { Composition } from "remotion";
import { EXPLAINER_FRAMES, Explainer } from "./explainer/Explainer";
import { FPS, HEIGHT, WIDTH } from "./explainer/theme";

export const MyComposition = () => {
  return (
    <Composition
      id="McpQuarkusNotebookLM"
      component={Explainer}
      durationInFrames={EXPLAINER_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
