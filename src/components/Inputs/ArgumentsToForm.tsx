import type { UiSchema } from "@rjsf/core";
import Form from "@rjsf/core";
import type { JSONSchema7, JSONSchema7Type } from "json-schema";
import omit from "just-omit";

import { CSSUnitInput } from "./CSSUnitInput";

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

function inputArgsToSchemas<NodeSettings extends nameValuePair>(
  inputsArgs: UiNodeSettingsOptions<NodeSettings>
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
    schema[argName] = omit(arg, ["widget"]) as argumentSchema<
      typeof arg["default"]
    >;
  }

  return { schema, uiSchema };
}

export default function ArgumentsToForm<NodeSettings extends nameValuePair>({
  inputArgs,
}: {
  inputArgs: UiNodeSettingsOptions<NodeSettings>;
}) {
  const formSchemas = inputArgsToSchemas(inputArgs);

  const schema: JSONSchema7 = {
    title: "Standin Name",
    type: "object",
    properties: formSchemas.schema,
  };

  return (
    <Form
      schema={schema}
      uiSchema={formSchemas.uiSchema}
      onChange={log("changed")}
      onSubmit={log("submitted")}
      onError={log("errors")}
    />
  );
}

function CustomWidth(props: any) {
  const value = "100px";

  return (
    <CSSUnitInput
      value={value}
      onChange={props.onChange}
      units={["px", "auto"]}
    />
  );
}
