import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function SalesforceToGitMergeSyncTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        The <b>{getTaskTypeLabel(TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC)} Task</b> is used to selectively merge changes from a salesforce component to a target branch. Once the task has been created, you must select the <b>Run Task</b> button to initialize the <b>Salesforce to Git Merge Sync Wizard</b>, verifying any file changes before triggering the merge. For more detailed information on this functionality, view the <a href="https://opsera.atlassian.net/l/c/1KJiEUnH" target="_blank" rel="noreferrer"><b>Salesforce to Git Sync Merge Task Documentation</b>.</a>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Salesforce to Git Merge Sync Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(SalesforceToGitMergeSyncTaskDetailsHelpDocumentation);