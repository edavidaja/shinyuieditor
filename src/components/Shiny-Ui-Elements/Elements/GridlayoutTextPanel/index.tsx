import textIcon from "assets/icons/shinyText.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutTextPanel from "./GridlayoutTextPanel";
import { GridlayoutTextPanelSettings } from "./SettingsPanel";

export type GridlayoutTextPanelProps = {
  content: string;
  h_align: "center" | "start" | "end";
  area?: string;
};

export const gridlayoutTextPanelInfo: UiComponentInfo<GridlayoutTextPanelProps> =
  {
    title: "Text Panel",
    UiComponent: GridlayoutTextPanel,
    SettingsComponent: GridlayoutTextPanelSettings,
    acceptsChildren: false,
    defaultSettings: { content: "Text from Chooser", h_align: "start" },
    iconSrc: textIcon,
  };

export default GridlayoutTextPanel;
