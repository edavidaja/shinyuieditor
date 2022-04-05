import textIcon from "assets/icons/shinyText.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutTitlePanel from "./GridlayoutTitlePanel";
import { GridlayoutTitlePanelSettings } from "./SettingsPanel";

export type GridlayoutTitlePanelProps = {
  title: string;
  area?: string;
};

export const gridlayoutTitlePanelInfo: UiComponentInfo<GridlayoutTitlePanelProps> =
  {
    title: "Title Panel",
    UiComponent: GridlayoutTitlePanel,
    SettingsComponent: GridlayoutTitlePanelSettings,
    settingsSchema: {
      title: {
        type: "string",
        default: "default title from schema",
      },
      area: {
        type: "string",
        title: "Grid Area",
        default: "unset grid area",
      },
    },
    acceptsChildren: false,
    defaultSettings: { title: "Title from Chooser" },
    iconSrc: textIcon,
  };

export default GridlayoutTitlePanel;
