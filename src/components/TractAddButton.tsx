/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { FaPlus } from "react-icons/fa";
import { TractPosition } from "../state-logic/gridLayout/atoms";
import { useAddTract } from "../state-logic/gridLayout/hooks";
import { TractGutter } from "./GridTractControls";

const adderButtonStyles = css`
  --size: var(--gap);
  --offset: calc(-1 * var(--size));
  width: var(--size);
  height: var(--size);
  font-size: 15px;
  display: grid;
  place-content: center;

  & > button {
    background-color: rgba(255, 255, 255, 0);
    color: var(--dark-gray, gray);
    transition: color 0.2s, background-color 0.2s;
    padding: 5px;
    border-radius: 50%;
  }

  &:hover > button {
    background-color: var(--dark-gray, gray);
    color: white;
  }

  &.colsAdder {
    justify-self: end;
    margin-right: var(--offset);
    margin-top: var(--offset);
  }

  &.colsAdder.first {
    justify-self: start;
    margin-left: var(--offset);
  }
  &.rowsAdder {
    align-self: end;
    margin-left: var(--offset);
    margin-bottom: var(--offset);
  }
  &.rowsAdder.first {
    align-self: start;
    margin-top: var(--offset);
  }
`;

export function TractAddButton({ dir, index }: TractPosition) {
  // We place the adder button for index 0 and 1 in the same tract
  // and then just alter where they sit in the tract using the .first class
  const placementIndex = Math.max(index - 1, 0);
  const isFirstTract = index === 0;

  const addTract = useAddTract(dir);

  const description = `Add ${
    dir === "rows" ? "row" : "column"
  } at index ${index}`;
  return (
    <TractGutter dir={dir} index={placementIndex}>
      <div
        className={`${dir}Adder${isFirstTract ? " first" : ""}`}
        css={adderButtonStyles}
      >
        <button
          aria-label={description}
          title={description}
          onClick={(e) => {
            addTract("1fr", index);
          }}
        >
          <FaPlus />
        </button>
      </div>
    </TractGutter>
  );
}
