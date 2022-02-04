import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import { useEventUpdatedTree } from "components/Shiny-Ui-Elements/Elements/treeUpdateEvents";
import ElementsPalette from "components/Shiny-Ui-Elements/ElementsPalette";
import UiNode from "components/Shiny-Ui-Elements/UiNode";
import {
  NodePath,
  UiNodeProps,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import classes from "./EditorContainer.module.css";
import { SettingsPanel } from "./SettingsPanel";

export const NodeSelectionContext = React.createContext<
  (path: NodePath | null) => void
>((path: NodePath | null) => console.log(`Selected node placeholder`, path));

export function EditorContainer() {
  // const { isLoading, error, data } = useQuery("initial-state", getInitialState);

  // if (isLoading) {
  //   return <h3>Loading initial state from server</h3>;
  // }

  // if (error || !data) {
  //   return <h3 style={{ color: "orangered" }}>Error with server request</h3>;
  // }

  const [selectedPath, setSelectedPath] = React.useState<NodePath | null>(null);

  const tree = useEventUpdatedTree(initialState);

  return (
    <NodeSelectionContext.Provider value={setSelectedPath}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.leftSide}>
            <h1 className={classes.title}>Shiny Visual Editor</h1>
            <img src={rstudioLogo} alt="RStudio Logo" />
            <img
              src={shinyLogo}
              style={{ backgroundColor: "var(--rstudio-blue, pink)" }}
              alt="Shiny Logo"
            />
          </div>
        </div>
        <div className={`${classes.elementsPanel} ${classes.titledPanel}`}>
          <h3>Elements</h3>
          <ElementsPalette />
        </div>
        <div className={`${classes.propertiesPanel} ${classes.titledPanel}`}>
          <h3>Properties</h3>
          <SettingsPanel tree={tree} selectedPath={selectedPath} />
        </div>
        <div className={classes.editorHolder}>
          <UiNode {...tree} selectedPath={selectedPath} />
        </div>
      </div>
    </NodeSelectionContext.Provider>
  );
}

const initialState: UiNodeProps = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [
      ["header", "header"],
      ["sidebar", "plot"],
      ["sidebar", "plot"],
    ],
    rowSizes: ["100px", "1fr", "1fr"],
    colSizes: ["250px", "1fr"],
    gapSize: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        area: "header",
        title: "My App",
      },
    },
    {
      uiName: "gridlayout::grid_panel",
      uiArguments: {
        area: "sidebar",
        horizontalAlign: "spread",
        verticalAlign: "spread",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider1",
            label: "Slider 1",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider2",
            label: "Slider 2",
            min: 1,
            max: 10,
            value: 3,
          },
        },
      ],
    },
    {
      uiName: "gridlayout::grid_panel",
      uiArguments: {
        area: "plot",
        horizontalAlign: "spread",
        verticalAlign: "center",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "myPlot",
          },
        },
      ],
    },
  ],
};
