import React from "react";

import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShinyPlotOutputSettings } from "./SettingsPanel";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/ShinyPlotOutput/settings",
} as ComponentMeta<typeof ShinyPlotOutputSettings>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ShinyPlotOutputSettings> = (args) => (
  <div
    style={{
      outline: "2px solid salmon",
      width: "min(500px, 90%)",
      padding: "1rem",
    }}
  >
    <ShinyPlotOutputSettings {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  settings: {
    outputId: "myPlot",
    width: "300px",
    height: "400px",
  },
};

export const Defaults = Template.bind({});
Defaults.args = {};
