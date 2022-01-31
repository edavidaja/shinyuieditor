import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import UiTree from ".";
import ElementsPalette from "../ElementsPalette";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/UiTree",
  component: UiTree,
} as ComponentMeta<typeof UiTree>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UiTree> = (args) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "150px 1fr",
      height: "800px",
    }}
  >
    <div
      style={{
        // outline: "1px solid grey",
        // borderRadius: "8px",
        backgroundColor: "silver",
        padding: "8px",
      }}
    >
      <h2 style={{ color: "white", fontWeight: "bold" }}>Elements Palette</h2>
      <ElementsPalette />
    </div>

    <div
      className="App-Container"
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        paddingTop: "80px",
        paddingLeft: "160px",
      }}
    >
      <UiTree {...args} />
    </div>
  </div>
);

export const Primary = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  uiName: "gridlayout::grid_panel",
  uiArguments: { horizontalAlign: "center", verticalAlign: "center" },
  uiChildren: [
    {
      uiName: "gridlayout::grid_panel",
      uiArguments: { horizontalAlign: "center", verticalAlign: "center" },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "slider 1",
            min: 1,
            max: 10,
            value: 7,
          },
        },
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "slider 2",
            min: 1,
            max: 10,
            value: 7,
          },
        },
      ],
    },
    {
      uiName: "gridlayout::grid_panel",
      uiArguments: { horizontalAlign: "right", verticalAlign: "center" },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "myPlot",
          },
        },
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "slider",
            min: 1,
            max: 10,
            value: 7,
          },
        },
      ],
    },
  ],
};
export const Secondary = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Secondary.args = {
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
        horizontalAlign: "right",
        verticalAlign: "center",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "slider",
            min: 1,
            max: 10,
            value: 7,
          },
        },
      ],
    },
    {
      uiName: "gridlayout::grid_panel",
      uiArguments: {
        area: "plot",
        horizontalAlign: "right",
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
