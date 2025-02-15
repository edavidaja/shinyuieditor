import * as React from "react";

import CategoryDivider from "components/CategoryDivider";
import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { WrappedSection } from "components/Inputs/InputSections";
import NumericInput from "components/Inputs/NumericInput/NumericInput";
import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinySliderInputProps } from ".";

export const ShinySliderInputSettings: SettingsUpdaterComponent<
  ShinySliderInputProps
> = ({ settings: currentSettings }) => {
  const settings = { ...currentSettings };

  return (
    <>
      <TextInput name="inputId" label="Input ID" value={settings.inputId} />
      <TextInput name="label" value={settings.label} />

      <WrappedSection name="Values">
        <NumericInput name="min" value={settings.min} />
        <NumericInput name="max" value={settings.max} />
        <NumericInput name="value" label="start" value={settings.value} />
        <NumericInput
          name="step"
          value={settings.step}
          optional={true}
          defaultValue={1}
        />
      </WrappedSection>

      <CategoryDivider />

      <LabeledCSSUnitInput
        name="width"
        value={settings.width}
        optional={true}
        units={["px", "%", "auto"]}
        defaultValue="100%"
      />
    </>
  );
};
