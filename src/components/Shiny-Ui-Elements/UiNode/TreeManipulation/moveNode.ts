import {
  NodePath,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import produce from "immer";
import { sameArray } from "utils/equalityCheckers";

import {
  addNodeMutating,
  getNode,
  removeNodeMutating,
} from "./treeManipulation";

export default function moveNode({
  tree,
  fromPath,
  toPath,
}: {
  tree: ShinyUiNode;
  fromPath: NodePath;
  toPath: NodePath;
}) {
  // Sanity checks before performing move
  if (invalidMove({ fromPath, toPath })) {
    throw new Error("Invalid move request");
  }
  return produce(tree, (treeDraft) => {
    // Gather node first
    const nodeToMove = getNode(treeDraft, fromPath);

    // Add it to the new position
    addNodeMutating({
      tree: treeDraft,
      path: toPath,
      newNode: nodeToMove,
    });

    // Remove it from its previous position
    removeNodeMutating({ tree: treeDraft, path: fromPath });
  });
}

function invalidMove({
  fromPath,
  toPath,
}: {
  fromPath: NodePath;
  toPath: NodePath;
}): boolean {
  // Can't make an item its own child
  if (aChildOfB(toPath, fromPath)) return true;

  return false;
}

function aChildOfB(aPath: NodePath, bPath: NodePath): boolean {
  const aDepth = aPath.length;
  const bDepth = bPath.length;
  if (aDepth < bDepth) {
    return false;
  }

  // If the path up to the depth of b is the same, then we have a child
  return sameArray(aPath.slice(0, bDepth), bPath);
}
