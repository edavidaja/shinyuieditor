import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridlayoutTitlePanel from "components/shiny-ui/GridlayoutTitlePanel";
import React from "react";
import { uniqueMatrixElements } from "utils/array-helpers";
import { AreaLabeledGridHolder } from "../../GridHolder";

const layoutAreas = [
  ["a", "a", "b", "other"],
  ["c", "d", "d", "other"],
];
const uniqueAreas = uniqueMatrixElements(layoutAreas);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/GridlayoutTitlePanel/main",
  component: GridlayoutTitlePanel,
  argTypes: {
    area: {
      control: { type: "select", options: uniqueAreas },
    },
  },
} as ComponentMeta<typeof GridlayoutTitlePanel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GridlayoutTitlePanel> = (args) => (
  <AreaLabeledGridHolder
    areas={layoutAreas}
    rowSizes={"200px"}
    colSizes={"200px"}
    gapSize={"1rem"}
  >
    <div style={{ gridArea: args.area }}>
      <GridlayoutTitlePanel {...args} />
    </div>
  </AreaLabeledGridHolder>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "My App Title",
  area: uniqueAreas[0],
};

export const Seconday = Template.bind({});
Seconday.args = { area: uniqueAreas[0] };
