import plotIcon from "assets/icons/shinyPlot.png";
import { CSSUnitInput } from "components/Inputs/CSSUnitInput";

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
    width: {
      type: "string",
      title: "Width",
      default: "100px",
      widget: CustomWidth,
    },
  },
  acceptsChildren: false,
  defaultSettings: { outputId: "plot" },
  iconSrc: plotIcon,
};

export default ShinyPlotOutput;

function CustomWidth(props: any) {
  console.log("Custom Widget Props", props);

  return (
    <CSSUnitInput
      value={props.value}
      onChange={props.onChange}
      units={["px", "auto"]}
    />
  );
}
