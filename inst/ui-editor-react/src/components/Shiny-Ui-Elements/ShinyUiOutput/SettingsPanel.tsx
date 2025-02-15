import * as React from "react";

import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyUiOutputProps } from ".";

export const ShinyuiOutputSettings: SettingsUpdaterComponent<
  ShinyUiOutputProps
> = ({ settings }) => {
  return (
    <TextInput
      label="Output ID"
      name="outputId"
      value={settings.outputId ?? "defaultUiOutput"}
    />
  );
};
