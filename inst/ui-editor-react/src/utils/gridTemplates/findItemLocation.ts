import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import { matrixDimensions } from "utils/matrix-helpers";

import { emptyCell } from "./itemLocations";
import type { GridCellLocation } from "./types";

type GridAreas = TemplatedGridProps["areas"];
function findItemLocations(
  areas: GridAreas,
  itemName: string
): GridCellLocation[] {
  const { numRows, numCols } = matrixDimensions(areas);

  const locations: GridCellLocation[] = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cellName = areas[row][col];
      if (cellName === itemName) {
        locations.push({ row: row + 1, col: col + 1 });
      }
    }
  }

  return locations;
}

function findEmptyCells(areas: GridAreas) {
  return findItemLocations(areas, emptyCell);
}

export { findItemLocations, findEmptyCells };
