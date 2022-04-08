import * as React from "react";

import { InputSection } from "components/Inputs/InputSections";
import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyTextInputProps } from ".";

export const ShinyTextInputSettings: SettingsUpdaterComponent<
  ShinyTextInputProps
> = ({ settings }) => {
  return (
    <>
      <TextInput name="inputId" value={settings.inputId} />
      <TextInput name="label" value={settings.label} />
      <InputSection name="Values">
        <TextInput name="value" value={settings.value} />
        <TextInput
          name="placeholder"
          value={settings.placeholder}
          optional={true}
          defaultValue="placeholder text"
        />
      </InputSection>
    </>
  );
};
