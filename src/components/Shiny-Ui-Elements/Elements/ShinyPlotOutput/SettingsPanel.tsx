import * as React from "react";

import ArgumentsToForm from "components/Inputs/ArgumentsToForm";
import { CSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyPlotOutputProps } from ".";

const CustomCheckbox = function (props: any) {
  return (
    <button
      id="custom"
      className={props.value ? "checked" : "unchecked"}
      onClick={() => props.onChange(!props.value)}
    >
      {String(props.value)}
    </button>
  );
};

const CustomWidth = function (props: any) {
  const value = "100px";

  return (
    <CSSUnitInput
      value={value}
      onChange={props.onChange}
      units={["px", "auto"]}
    />
  );
};

export const ShinyPlotOutputSettings: SettingsUpdaterComponent<
  ShinyPlotOutputProps
> = ({ settings, onChange }) => {
  const { outputId } = settings;

  return (
    <>
      <TextInput
        label="outputId"
        name="outputId"
        value={outputId ?? "defaultPlotOutput"}
        onChange={(newName) => onChange({ ...settings, outputId: newName })}
      />
    </>
  );
};
