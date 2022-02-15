import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function GitToGitSyncTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        The <b>{getTaskTypeLabel(TASK_TYPES.SYNC_GIT_BRANCHES)}</b> Task merges one source control management (SCM) branch into another. This workflow requires a configured source control management tool (Bitbucket, GitHub or GitLab) in Tool Registry. Once the task has been created, you must select the <b>Run Task</b> button to complete the task. For more detailed information on the Git to Git Sync Functionality, view the <a href="https://opsera.atlassian.net/l/c/8XdZDHPD" target="_blank" rel="noreferrer"><b>Git to Git Sync Task Help Documentation</b>.</a>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Git to Git Sync Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(GitToGitSyncTaskDetailsHelpDocumentation);