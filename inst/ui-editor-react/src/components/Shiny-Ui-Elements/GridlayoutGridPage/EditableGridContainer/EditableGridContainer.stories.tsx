import React from "react";

import type { Story } from "@ladle/react";

import type { TemplatedGridProps } from "..";

import EditableGridContainer from ".";

export const EditableGridContainerShowcase: Story<{
  layout: TemplatedGridProps;
}> = (opts) => {
  const [layout, setLayout] = React.useState(opts.layout);

  console.log("Layout from state:", layout);
  return (
    <div style={containerStyles}>
      <EditableGridContainer {...layout} onNewLayout={setLayout}>
        <GridItem area="a" color="Tomato" />
        <GridItem area="b" color="LightSeaGreen" />
        <GridItem area="c" color="MediumOrchid" />
        {/* <GridItem area="d" color="Peru" /> */}
        <GridItem area="e" color="DarkKhaki" />
        <GridItem area="f" color="CornflowerBlue" />
        <GridItem area="g" color="FireBrick" />
      </EditableGridContainer>
    </div>
  );
};

function GridItem({ area, color }: { area: string; color: string }) {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        gridArea: area,
        backgroundColor: color,
        color: "white",
        fontSize: "2rem",
        pointerEvents: "none",
      }}
    >
      {area}
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  outline: "4px solid grey",
  width: "900px",
  height: "700px",
  padding: "0",
};

EditableGridContainerShowcase.args = {
  layout: {
    areas: [
      ["a", "b", "f"],
      ["g", "g", "f"],
      ["c", ".", "f"],
      ["e", ".", "f"],
    ],
    row_sizes: ["100px", "100px", "2fr", "1fr"],
    col_sizes: ["200px", "1fr", "100px"],
    gap_size: "15px",
  },
};
