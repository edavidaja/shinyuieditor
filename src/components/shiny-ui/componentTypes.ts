import type { GridlayoutTitlePanelProps } from "./GridlayoutTitlePanel";
import type { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import type { ShinySliderInputProps } from "./ShinySliderInput";

/**
 * All possible props for the defined UI components
 */
export type ShinyUiPropsByName = {
  plotOutput: ShinyPlotOutputProps;
  sliderInput: ShinySliderInputProps;
  titlePanel: GridlayoutTitlePanelProps;
};

/**
 * Names of all the available Ui elements
 */
export type ShinyUiNames = keyof ShinyUiPropsByName;

/**
 * Property (arguments) of all the available Ui elements
 */
export type ShinyUiProps = ShinyUiPropsByName[ShinyUiNames];

/**
 * Union of Ui element name and associated props for easy narrowing
 */
export type ShinyUiNameAndProps = {
  [Name in ShinyUiNames]: {
    componentName: Name;
    componentProps: ShinyUiPropsByName[Name];
  };
}[ShinyUiNames];

/**
 * Format of a component designating a Shiny-Ui element
 */
export type ShinyUiComponent<Props extends ShinyUiProps> = (
  p: Props
) => JSX.Element;

/**
 * Format of the corresponding settings panel for a component a Shiny-Ui element
 */
export type ShinyUiSettingsComponent<Props extends ShinyUiProps> = (p: {
  startingSettings: Props;
  onUpdate: (newSettings: Props) => void;
}) => JSX.Element;

/**
 * Payload describing the two main components needed for working with a UI element
 */
export type ShinyUiComponentAndSettings = {
  [Name in keyof ShinyUiPropsByName]: {
    UiComponent: ShinyUiComponent<ShinyUiPropsByName[Name]>;
    SettingsComponent: ShinyUiSettingsComponent<ShinyUiPropsByName[Name]>;
  };
};
