import type { ShinyUiNames } from "components/Shiny-Ui-Elements/uiNodeTypes";

// These are nodes that don't need to be wrapped in a grid_panel if dropped

export type GridAwareNodes = Extract<
  ShinyUiNames,
  | "gridlayout::grid_card"
  | "gridlayout::grid_card_text"
  | "gridlayout::grid_card"
  | "gridlayout::grid_card_plot"
>;

export const gridAwareNodes: ShinyUiNames[] = [
  "gridlayout::grid_card",
  "gridlayout::grid_card_text",
  "gridlayout::grid_card",
  "gridlayout::grid_card_plot",
];
