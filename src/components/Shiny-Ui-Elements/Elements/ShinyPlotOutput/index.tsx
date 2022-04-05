import plotIcon from "assets/icons/shinyPlot.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyPlotOutputSettings } from "./SettingsPanel";
import ShinyPlotOutput from "./ShinyPlotOutput";

export type ShinyPlotOutputProps = Partial<{
  outputId: string;
  width: string;
  height: string;
}>;

export const shinyPlotOutputInfo: UiComponentInfo<ShinyPlotOutputProps> = {
  title: "Plot Output",
  UiComponent: ShinyPlotOutput,
  SettingsComponent: ShinyPlotOutputSettings,
  settingsSchema: {
    outputId: {
      type: "string",
      title: "New OutputID",
      default: "myPlot",
    },
  },
  acceptsChildren: false,
  defaultSettings: { outputId: "plot" },
  iconSrc: plotIcon,
};

export default ShinyPlotOutput;
