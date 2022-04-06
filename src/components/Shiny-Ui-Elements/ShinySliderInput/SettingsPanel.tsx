import * as React from "react";

import NumericInput from "components/Inputs/NumericInput";
import OptionalInput from "components/Inputs/OptionalInput/OptionalInput";
import { TextInput } from "components/Inputs/TextInput";
import { WrappedSection } from "components/Inputs/WrappedSection";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinySliderInputProps } from ".";

export const ShinySliderInputSettings: SettingsUpdaterComponent<
  ShinySliderInputProps
> = ({ settings: currentSettings, onChange }) => {
  const settings = { ...currentSettings };

  const validateAndUpdate = (newValues: Partial<ShinySliderInputProps>) => {
    onChange({ ...settings, ...newValues });
  };

  const updateSettings = ({
    name,
    value,
  }: {
    name: string;
    value?: number | string;
  }) => {
    onChange({ ...settings, [name]: value });
  };

  return (
    <>
      <TextInput
        label="inputId"
        name="inputId"
        value={settings.inputId ?? "Default name"}
        onChange={(inputId) => validateAndUpdate({ inputId })}
      />
      <TextInput
        label="label"
        name="label"
        value={settings.label ?? "Default label"}
        onChange={(label) => validateAndUpdate({ label })}
      />

      <WrappedSection name="Values">
        <NumericInput
          label="Min"
          value={settings.min}
          onChange={(min) => validateAndUpdate({ min })}
        />
        <NumericInput
          label="Max"
          value={settings.max}
          onChange={(max) => validateAndUpdate({ max })}
        />
        <NumericInput
          label="Start"
          value={settings.value}
          onChange={(val) => validateAndUpdate({ value: val })}
        />
      </WrappedSection>

      <OptionalInput
        type="number"
        name="step"
        value={settings.step}
        defaultValue={1}
        onChange={updateSettings}
      />
    </>
  );
};
