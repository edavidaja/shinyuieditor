import React from "react";

import type { CSSMeasure } from "CSSMeasure";

import { LabeledCSSUnitInput } from ".";

export const AllCss = () => {
  const [value, setValue] = React.useState<CSSMeasure>("100px");

  return (
    <div>
      <div> Current CSS Value: {value}</div>
      <LabeledCSSUnitInput
        name="myCSSUnit"
        value={value}
        units={["%", "auto", "fr", "rem", "px"]}
        onChange={({ name, value }) => {
          console.log(`Changed ${name} to ${value}`);
          if (!value) return;
          setValue(value);
        }}
      />
    </div>
  );
};
