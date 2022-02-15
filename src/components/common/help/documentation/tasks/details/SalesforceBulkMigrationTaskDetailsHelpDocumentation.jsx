import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function SalesforceBulkMigrationTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        The {getTaskTypeLabel(TASK_TYPES.SALESFORCE_BULK_MIGRATION)} Task allows you to migrate the entire SFDC org metadata components to a GIT repository branch. Once the task has been created, run the task to choose the metadata component types and the destination branch to pull in the changes. While performing complete sync-up, Opsera will push the code to the repository branch and override the components if present in the configured branch. This workflow requires task creation, followed by a task run. For more detailed information on the Salesforce Bulk Migration Task, view the <a href="https://opsera.atlassian.net/l/c/x4aRq14a" target="_blank" rel="noreferrer"><b>Salesforce Bulk Migration Task Help Documentation</b>.</a>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Salesforce Bulk Migration Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(SalesforceBulkMigrationTaskDetailsHelpDocumentation);