import Button from "components/Inputs/Button";
import { SettingsUpdateContext } from "components/Inputs/SettingsUpdateContext";
import type {
  SettingsUpdaterComponent,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { BiCheck } from "react-icons/bi";
import { FiTrash as TrashIcon } from "react-icons/fi";

import { ErrorMessageDisplay } from "./ErrorMessageDisplay";
import PathBreadcrumb from "./PathBreadcrumb";
import classes from "./SettingsPanel.module.css";
import { useUpdateSettings } from "./useUpdateSettings";

export function SettingsPanel({ tree }: { tree: ShinyUiNode }) {
  const {
    currentNode,
    errorMsg,
    deleteNode,
    handleSubmit,
    updateArgumentsByName,
    selectedPath,
    setNodeSelection,
  } = useUpdateSettings({ tree });

  if (selectedPath === null) {
    return <div>Select an element to edit properties</div>;
  }
  if (currentNode === null) {
    return (
      <div>Error finding requested node at path {selectedPath.join(".")}</div>
    );
  }

  const isRootNode = selectedPath.length === 0;

  const { uiName, uiArguments } = currentNode;

  const SettingsInputs = shinyUiNodeInfo[uiName]
    .SettingsComponent as SettingsUpdaterComponent<typeof uiArguments>;

  return (
    <div className={classes.settingsPanel}>
      <div className={classes.currentElementAbout}>
        <div>
          <strong>Path:</strong>
          <PathBreadcrumb
            tree={tree}
            path={selectedPath}
            onSelect={setNodeSelection}
          />
        </div>
      </div>
      <div className={classes.settingsForm}>
        <form onSubmit={handleSubmit}>
          <SettingsUpdateContext onChange={updateArgumentsByName}>
            <SettingsInputs settings={uiArguments} />
          </SettingsUpdateContext>
          <ErrorMessageDisplay errorMsg={errorMsg} />
          <div className={classes.submitHolder}>
            {uiName !== "unknownUiFunction" ? (
              <Button type="submit" aria-label="Submit new settings">
                <BiCheck /> Update
              </Button>
            ) : null}
          </div>
        </form>
      </div>

      {!isRootNode ? (
        <Button
          className={classes.deleteButton}
          onClick={() => deleteNode()}
          variant="delete"
          aria-label="Delete Node"
        >
          <TrashIcon /> Delete Element
        </Button>
      ) : null}
    </div>
  );
}
