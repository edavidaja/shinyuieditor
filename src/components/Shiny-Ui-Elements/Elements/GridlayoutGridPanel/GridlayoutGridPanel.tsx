import { UiContainerNodeComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import UiNode from "components/Shiny-Ui-Elements/UiNode";

import {
  GridPanelSettings,
  HorizontalAlignments,
  VerticalAlignments,
} from "./index";

import classes from "./styles.module.css";

const GridlayoutGridPanel: UiContainerNodeComponent<GridPanelSettings> = ({
  uiChildren,
  uiArguments,
  path,
  children,
  ...passthroughProps
}) => {
  const { area, verticalAlign, horizontalAlign } = uiArguments;
  return (
    <div
      className={classes.container}
      style={{
        gridArea: area,
        justifyContent: dirToFlexProp[horizontalAlign ?? "spread"],
        alignContent: dirToFlexProp[verticalAlign ?? "spread"],
      }}
      {...passthroughProps}
    >
      {uiChildren?.map((childNode, i) => (
        <UiNode key={path.join(".") + i} path={[...path, i]} {...childNode} />
      ))}
      {children}
    </div>
  );
};

export default GridlayoutGridPanel;

const dirToFlexProp: Record<HorizontalAlignments | VerticalAlignments, string> =
  {
    center: "center",
    left: "start",
    top: "start",
    right: "end",
    bottom: "end",
    spread: "space-evenly",
  };
