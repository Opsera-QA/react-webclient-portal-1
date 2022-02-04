import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../tasks/task.types";

function SalesforceBulkMigrationHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={getTaskTypeLabel(TASK_TYPES.SALESFORCE_BULK_MIGRATION)} closeHelpPanel={closeHelpPanel}>
      <div className={"mb-1"}>{getTaskTypeLabel(TASK_TYPES.SALESFORCE_BULK_MIGRATION)} allows you to migrate the entire SFDC org metadata components to a GIT repository branch. Once the task has been created, run the task to choose the metadata component types and the destination branch to pull in the changes. While performing complete sync-up, Opsera will push the code to the repository branch and override the components if present in the configured branch. This workflow requires task creation, followed by a task run.  </div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>{getTaskTypeLabel(TASK_TYPES.SALESFORCE_BULK_MIGRATION)}</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
          <ul style={{listStyleType: "none"}}>
            <li><b>Jenkins Tool</b> - Select an established Jenkins tool from the Tool Registry.</li>
            <li><b>SFDC Account</b> - Select an established Salesforce tool from Tool Registry.</li>
            <li><b>Account</b> - Select the configured SCM account that has previously been added in the selected Jenkins tool in the Accounts tab.</li>
            <li><b>Repository</b> - Select a Repository from the SCM account. </li>
            <li><b>Branch</b> - Select a branch where the changes will be merged. To create a new branch, toggle <b>Create a new branch</b> on and create a new branch name and select an upstream branch as parent branch. Existing and modified files will be pushed onto this parent branch. </li>
          </ul></li>
        <li>Select <b>Create</b> to save. </li>
        <li>After the task is created, select <b>Run Task</b> to successfully merge the task.</li>
      </ol>
    </HelpDocumentationContainer>
  );
}

SalesforceBulkMigrationHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(SalesforceBulkMigrationHelpDocumentation);