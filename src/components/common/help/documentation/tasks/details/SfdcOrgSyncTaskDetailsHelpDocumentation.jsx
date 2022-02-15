import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function SfdcOrgSyncTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        The {getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_REPO)} Task allows you to sync components from the Org to Git branch. This workflow requires task creation, followed by a task run. Once the task has been created, you must select the <b>Run Task</b> button and follow the steps to complete the pipeline wizard. The prerequisite to {getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_REPO)} setup is having successfully configured Jenkins, Salesforce Configurator, and SCM tools set up in the Tool Registry to select from the dropdowns. The configured SCM tool (Bitbucket, GitHub or GitLab) must be added to Accounts within the Jenkins and Salesforce Configurator tools. For more detailed information on the Salesforce Organization Sync workflow including Run Merge instructions, view the <a href="https://opsera.atlassian.net/l/c/5T1dgmnA" target="_blank" rel="noreferrer"><b>Salesforce Organization Sync Task Help Documentation</b>.</a>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Salesforce Org Sync Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(SfdcOrgSyncTaskDetailsHelpDocumentation);