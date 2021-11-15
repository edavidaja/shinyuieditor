/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { GridLocString } from "GridTypes";
import React from "react";
import { useShowDiffs } from "state-logic/useShowChanges";
import { subtractElements } from "utils/array-helpers";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { GridCells } from "./GridCell";
import { TractAddButtons } from "./TractAddButtons";
import { TractRemoveButton, TractRemoveButtons } from "./TractRemoveButtons";
import { TractControls } from "./TractControls";

export type GridEditorProps = TemplatedGridProps & {
  items: Record<string, JSX.Element>;
};

export type CellLocRef = React.MutableRefObject<
  Record<GridLocString, ItemBoundingBox>
>;

type MainLayoutState = Omit<GridEditorProps, "items">;
export const SetLayoutContext = React.createContext<React.Dispatch<
  React.SetStateAction<MainLayoutState>
> | null>(null);

export default function GridEditor({
  items,
  ...initialLayoutDef
}: GridEditorProps) {
  const [layout, setLayout] = React.useState(initialLayoutDef);

  useShowDiffs({ val: layout });

  const {
    numRows,
    numCols,
    styles,
    uniqueAreas,
    sizes,
  } = parseGridTemplateAreas(layout);

  const itemAreas = Object.keys(items);
  const areasWithoutItems = subtractElements(uniqueAreas, itemAreas);

  const gridCellLocations: CellLocRef = React.useRef({});

  const areaMarkers = areasWithoutItems.map((area) => (
    <AreaMarker key={area} style={{ gridArea: area }}>
      area: {area}
    </AreaMarker>
  ));

  return (
    <SetLayoutContext.Provider value={setLayout}>
      <div
        css={{
          "--gap": layout.gapSize,
          "--row-gutter": "150px",
          "--col-gutter": "100px",
          display: "grid",
          gridTemplateColumns: "var(--row-gutter) 1fr",
          gridTemplateRows: "var(--col-gutter) 1fr",
          gridTemplateAreas: `". column-controls"\n"row-controls main"`,
        }}
      >
        <GridDisplay style={styles}>
          {Object.values(items)}
          {areaMarkers}
          <TractControls sizes={sizes} />
          <GridCells
            numCols={numCols}
            numRows={numRows}
            cellLocRef={gridCellLocations}
          />
          <TractAddButtons numCols={numCols} numRows={numRows} />
          <TractRemoveButtons
            areas={layout.areas}
            numCols={numCols}
            numRows={numRows}
          />
        </GridDisplay>
      </div>
    </SetLayoutContext.Provider>
  );
}

const GridDisplay = styled.div({
  gridArea: "main",
  gridRow: 2,
  gridColumn: 2,
  display: "grid",
});

const AreaMarker = styled.div({
  outline: "1px solid black",
  display: "grid",
  placeContent: "end",
  fontWeight: "lighter",
  fontStyle: "italic",
  padding: "2px",
  opacity: 0.2,
});
