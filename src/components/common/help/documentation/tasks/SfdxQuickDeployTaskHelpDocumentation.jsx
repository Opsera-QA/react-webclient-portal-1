import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../tasks/task.types";

function SfdxQuickDeployTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={getTaskTypeLabel(TASK_TYPES.SALESFORCE_QUICK_DEPLOY)} closeHelpPanel={closeHelpPanel}>
      <div className={"mb-1"}>This workflow requires first running a SFDX/ANT pipeline with a unit test in order to retrieve the unique <b>Deploy ID</b> used in task configuration. For more detailed information on this workflow including troubleshooting, view the <a href="https://opsera.atlassian.net/l/c/SN87X68R" target="_blank" rel="noreferrer"><b>Salesforce Quick Deployment Documentation</b>.</a> </div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>{getTaskTypeLabel(TASK_TYPES.SALESFORCE_QUICK_DEPLOY)}</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
          <ul style={{listStyleType: "none"}}>
            <li><b>Salesforce Account</b> - Select the Salesforce tool used in the SFDX/ANT pipeline that provided the Deploy Key.</li>
            <li><b>Salesforce Deploy Key</b> - Provide the Deploy Key found in the SFDX/ANT Pipeline Logs Report.</li>
          </ul></li>
        <li>Select <b>Create</b> to save. </li>
      </ol>
      <div className={"mt-2"}>To run the task, click <b>Run Task</b> then provide the <b>Salesforce Deploy Key</b> in the <b>Opsera Task Confirmation</b> form.</div>
    </HelpDocumentationContainer>
  );
}

SfdxQuickDeployTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(SfdxQuickDeployTaskHelpDocumentation);