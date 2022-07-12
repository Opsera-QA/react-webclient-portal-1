import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function GitCustodianTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        The <b>{getTaskTypeLabel(TASK_TYPES.GITSCRAPER)} Task</b> allows you to choose from custodian libraries then run a scan against the configured SCM repos. Define a maximum threshold and choose any secrets to ignore in the scan.  For more detailed information on the Git Custodian Functionality, view the <a href="https://opsera.atlassian.net/l/c/JDCeqKtA" target="_blank" rel="noreferrer"><b>Git Custodian Task Documentation</b>.</a>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Git Custodian Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(GitCustodianTaskDetailsHelpDocumentation);