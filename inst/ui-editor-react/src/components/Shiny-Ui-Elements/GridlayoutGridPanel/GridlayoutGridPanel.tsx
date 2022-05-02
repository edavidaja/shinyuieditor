import type {
  ShinyUiNames,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import UiNode from "components/UiNode";
import { useDropHandlers } from "DragAndDropHelpers/useDropHandlers";

import type {
  GridPanelSettings,
  HorizontalAlignments,
  VerticalAlignments,
} from "./index";

import classes from "./styles.module.css";

const rejectedNodes: ShinyUiNames[] = [
  "gridlayout::grid_page",
  "gridlayout::grid_panel",
  "gridlayout::grid_panel_stack",
];
const GridlayoutGridPanel: UiContainerNodeComponent<GridPanelSettings> = ({
  uiChildren,
  uiArguments,
  nodeInfo,
  children,
  eventHandlers,
  compRef,
}) => {
  const { path } = nodeInfo;
  const { area, verticalAlign, horizontalAlign, title } = uiArguments;

  useDropHandlers(compRef, {
    onDrop: "add-node",
    parentPath: nodeInfo.path,
    positionInChildren: 0,
    dropFilters: { rejectedNodes },
  });

  return (
    <div
      ref={compRef}
      className={classes.grid_panel}
      style={{
        gridArea: area,
        justifyContent: dirToFlexProp[horizontalAlign ?? "spread"],
        alignContent: dirToFlexProp[verticalAlign ?? "spread"],
      }}
      onClick={(e) => {
        if (eventHandlers.onClick) {
          console.log("Clicked a grid_panel()");

          eventHandlers.onClick?.(e);
        }
      }}
    >
      {title ? <h2 className={classes.panel_title}>{title}</h2> : null}
      <div className={classes.panel_content}>
        {uiChildren?.map((childNode, i) => (
          <UiNode
            key={path.join(".") + i}
            path={[...path, i]}
            canMove={false}
            {...childNode}
          />
        ))}
      </div>
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
