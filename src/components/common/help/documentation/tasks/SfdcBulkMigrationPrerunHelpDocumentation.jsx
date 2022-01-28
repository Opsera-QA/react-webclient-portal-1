import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../tasks/task.types";

function SfdcBulkMigrationPrerunHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer closeHelpPanel={closeHelpPanel} helpTopic={"Opsera Task Confirmation"}>
      <div className={"mb-1"}> To execute the <b>{getTaskTypeLabel(TASK_TYPES.SALESFORCE_BULK_MIGRATION)} Task</b> make the following selections: </div>
        <ul style={{listStyleType: "none"}}>
          <li><b>Branch</b> - Select an existing branch from the drop down list fetched from the repository configured within Task setup. The selected files are pulled and added to this branch upon execution.</li>
          <li><b>Create a New Branch</b> - To create a new branch, toggle the switch on. You will then be prompted to enter the following fields:
            <ul>
              <li><b>Branch</b> - Create a unique name for the new branch.</li>
              <li><b>Upstream Branch</b> - Select a branch from the drop down, fetched from the repository in setup. Existing and modified files will be pushed onto this parent branch.</li>
            </ul></li>
        </ul>
      <div>Select <b>Run Task</b>. Proceed to follow the steps in the Salesforce Task Configuration Wizard, selecting the components to be included in the run.</div>
    </HelpDocumentationContainer>
  );
}

SfdcBulkMigrationPrerunHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(SfdcBulkMigrationPrerunHelpDocumentation);