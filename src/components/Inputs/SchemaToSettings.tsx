import type { UiSchema } from "@rjsf/core";
import JSONForm from "@rjsf/core";
import type { JSONSchema7 } from "json-schema";
import omit from "just-omit";
import { BiCheck } from "react-icons/bi";

import Button from "./Button";
import classes from "./SchemaToSettings.module.css";

const log = (msg: string) => (x: any) => console.log(msg, x);

type CustomInputWidget = (props: any) => JSX.Element;
type BasicTypes = string | number | boolean;
type ArgumentTypes = BasicTypes | BasicTypes[] | BasicTypes[][];

export type nameValuePair = Record<string, ArgumentTypes>;

type argumentSchema<T extends ArgumentTypes> = {
  type: "string" | "number" | "integer" | "boolean" | "null";
  title?: string;
  default: T;
  widget?: CustomInputWidget;
};

export type UiNodeSettingsOptions<NodeSettings extends nameValuePair> = {
  [name in keyof NodeSettings]: argumentSchema<NodeSettings[name]>;
};

export default function SchemaToSettings<NodeSettings extends nameValuePair>({
  settings,
  inputArgs,
  onChange,
  onSubmit,
}: {
  settings: nameValuePair;
  inputArgs: UiNodeSettingsOptions<NodeSettings>;
  onChange: (newSettings: NodeSettings) => void;
  onSubmit: () => void;
}) {
  const formSchemas = inputArgsToSchemas(inputArgs, settings);

  const schema: JSONSchema7 = {
    type: "object",
    properties: formSchemas.schema,
  };

  return (
    <JSONForm
      className={classes.container}
      formData={settings}
      schema={schema}
      uiSchema={formSchemas.uiSchema}
      onChange={(form) => {
        onChange({ ...form.formData } as NodeSettings);
      }}
      onSubmit={() => onSubmit()}
      onError={log("errors")}
    >
      <Button type="submit">
        <BiCheck /> Update
      </Button>
    </JSONForm>
  );
}

function inputArgsToSchemas<NodeSettings extends nameValuePair>(
  inputsArgs: UiNodeSettingsOptions<NodeSettings>,
  settings: nameValuePair
): {
  schema: Record<string, JSONSchema7>;
  uiSchema: UiSchema;
} {
  const schema: Record<string, JSONSchema7> = {};
  const uiSchema: UiSchema = {};

  for (let argName in inputsArgs) {
    const arg = inputsArgs[argName];
    const { widget } = arg;
    if (widget) {
      uiSchema[argName] = { "ui:widget": widget };
    }

    const mainSchema = omit(arg, ["widget"]) as argumentSchema<
      typeof arg["default"]
    >;
    if (settings[argName]) {
      mainSchema.default = settings[argName] as typeof arg["default"];
    }
    schema[argName] = mainSchema;
  }

  return { schema, uiSchema };
}
