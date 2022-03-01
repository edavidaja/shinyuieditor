import React from "react";

import { sendTreeUpdateMessage } from "../Elements/treeUpdateEvents";
import { NodePath, ShinyUiNode } from "../Elements/uiNodeTypes";
import classes from "./DragAndDrop.module.css";

export type DragAndDropTargetEvents =
  | "onDrop"
  | "onDragEnter"
  | "onDragOver"
  | "onDragLeave";

export const dragAndDropTargetEvents: DragAndDropTargetEvents[] = [
  "onDrop",
  "onDragEnter",
  "onDragOver",
  "onDragLeave",
];

export type DragAndDropHandlers = Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  DragAndDropTargetEvents
>;

type DraggedNodeInfo = { node: ShinyUiNode; currentPath?: NodePath };
/**
 * Attach info about a ui node to the drag event so it can be properly acted upon at the destination
 * @param e Drag event object
 * @param node Ui node with uiName and uiArguments on it to be attached to drag
 */
export function assignElementDragData(
  e: React.DragEvent<HTMLElement>,
  info: DraggedNodeInfo
) {
  e.dataTransfer.setData("uiNode", JSON.stringify(info.node));
  // If a path to the node was provided, attach this as well. Helps the dropped
  // item to know if this is a move of an existing node or the creation of a new
  // node
  if (info.currentPath) {
    e.dataTransfer.setData("nodePath", info.currentPath.join("."));
  }
}

function readDroppedNodeInfo(e: React.DragEvent<HTMLElement>): DraggedNodeInfo {
  // Get the type of dropped element and act on it
  try {
    const droppedUiNode: DraggedNodeInfo = {
      node: JSON.parse(e.dataTransfer.getData("uiNode")) as ShinyUiNode,
    };

    const droppedNodePath = e.dataTransfer.getData("nodePath");
    if (droppedNodePath !== "") {
      droppedUiNode.currentPath = droppedNodePath
        .split(".")
        .map((i) => Number(i));
    }

    return droppedUiNode;
  } catch (error) {
    console.error("Error on dropped node info extraction", error);
    throw new Error("Could not find get node info from drop");
  }
}

export function buildDragAndDropHandlers(
  onDrop: (droppedNode: DraggedNodeInfo) => void
) {
  return {
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // Update styles to indicate the user can drop item here
      highlightDropability(e);
    },
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      removeHighlight(e);
    },
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // Make sure our dropability is properly highlighted. This fires very fast
      // so if this function gets any more complicated the callback should most
      // likely be throttled
      highlightDropability(e);
    },
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {
      // Make sure only the deepest container gets the drop event
      e.stopPropagation();

      removeHighlight(e);

      // Get the type of dropped element and act on it
      const droppedNodeinfo = readDroppedNodeInfo(e);

      onDrop(droppedNodeinfo);
    },
  };
}

export function useDragAndDropElements(
  path: NodePath,
  acceptsChildren: boolean
) {
  const callbacks = React.useMemo(
    () =>
      acceptsChildren
        ? buildDragAndDropHandlers(({ node }) => {
            // Let the state know we have a new child node
            sendTreeUpdateMessage({
              type: "ADD_NODE",
              parentPath: path,
              newNode: node,
            });
          })
        : {},
    [acceptsChildren, path]
  );

  return callbacks;
}
function highlightDropability(e: React.DragEvent<HTMLDivElement>) {
  if (e.currentTarget === e.target) {
    e.currentTarget.classList.add(classes.canDrop);
  }
}
function removeHighlight(e: React.DragEvent<HTMLDivElement>) {
  e.currentTarget.classList.remove(classes.canDrop);
}
