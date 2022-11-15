import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../tasks/task.types";

function SfdcOrgSyncTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_REPO)} closeHelpPanel={closeHelpPanel}>
      <div className={"mb-1"}>This workflow requires task creation, followed by a task run. Once the task has been created, you must select the <b>Run Task</b> button and follow the steps to complete the wizard. The prerequisite to Salesforce Organization Sync task setup is having successfully configured Jenkins, Salesforce Configurator, and SCM tools set up in the Tool Registry to select from the drop downs. The configured SCM tool must be added to Accounts within the Jenkins and Salesforce Configurator tools. For more detailed information on the Salesforce Organization Sync workflow including Run Merge instructions, view the <a href="https://docs.opsera.io/salesforce/organization-sync-task" target="_blank" rel="noreferrer"><b>Salesforce Organization Sync Task Help Documentation</b>.</a> </div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>{getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_REPO)}</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
          <ul style={{listStyleType: "none"}}>
            <li><b>Jenkins Tool</b> - Select an established Jenkins tool from the Tool Registry.</li>
            <li><b>Salesforce Account</b> - Select an established Salesforce tool from Tool Registry.</li>
            <li><b>Account</b> - Select the configured SCM account that has previously been added in the selected Jenkins tool in the Accounts tab.</li>
            <li><b>Workspace/Project</b> - Select the workspace or project in the SCM account. </li>
            <li><b>Repository</b> - Select a Repository from the SCM account. </li>
            <li><b>Branch</b> - Select a branch where the changes will be merged. To create a new branch, toggle <b>Create a new branch</b> on and create a new branch name and select an upstream branch as parent branch. Existing and modified files will be pushed onto this parent branch. </li>
          </ul></li>
        <li>Select <b>Create</b> to save. </li>
        <li>After the task is created, select <b>Run Task</b> to successfully merge the task.</li>
      </ol>
    </HelpDocumentationContainer>
  );
}

SfdcOrgSyncTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(SfdcOrgSyncTaskHelpDocumentation);