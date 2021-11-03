import { FormControl } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/react";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { GridlayoutTitlePanelProps } from ".";
import { TextInput } from "../SettingsInputs/TextInput";
import {
  SettingsPanelHolder,
  UiPanelSettingsProps,
} from "../UiPanelSettingsProps";

export default function GridlayoutTitlePanelSettings({
  startingSettings,
  onUpdate,
}: UiPanelSettingsProps<GridlayoutTitlePanelProps>) {
  const [titleSettings, setTitleSettings] = React.useState(startingSettings);

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onUpdate(titleSettings);
    },
    [onUpdate, titleSettings]
  );
  return (
    <SettingsPanelHolder>
      <form onSubmit={onSubmit}>
        <FormControl id="sliderInput-settings">
          <TextInput
            label="App title"
            value={titleSettings.title ?? "UndefinedAppTitle"}
            onChange={(title) => setTitleSettings((s) => ({ ...s, title }))}
          />
        </FormControl>
        <Button
          variant="main"
          leftIcon={<BiCheck />}
          marginTop="0.75rem"
          type="submit"
        >
          Update Plot
        </Button>
      </form>
    </SettingsPanelHolder>
  );
}
