import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../tasks/task.types";

function GitCustodianTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={getTaskTypeLabel(TASK_TYPES.GITSCRAPER)} closeHelpPanel={closeHelpPanel}>
      <div className={"mb-1"}>The <b>{getTaskTypeLabel(TASK_TYPES.GITSCRAPER)} Task</b> allows you to choose from custodian libraries then run a scan against the configured SCM repos. Define a maximum threshold and choose any secrets to ignore in the scan.  For more detailed information on the Git Custodian Functionality, view the <a href="https://opsera.atlassian.net/l/c/JDCeqKtA" target="_blank" rel="noreferrer"><b>Git Custodian Task Documentation</b>.</a></div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>{getTaskTypeLabel(TASK_TYPES.GITSCRAPER)}</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
          <ul style={{listStyleType: "none"}}>
            <li><b>Source Code Management Tool Type</b> - Select a source control management tool (SCM) identifier. Choose from Gitlab, Github or Bitbucket.</li>
            <li><b>Source Code Management Tool</b> - Select the respective Source Code Management Tool containing the repository to run a scan against.</li>
            <li><b>Bitbucket Workspace</b> (Bitbucket) - Select the respective Bitbucket workspace where repositories are located.</li>
            <li><b>Maximum Allows Secrets Threshold </b> - Select the maximum allowed secrets the scan can contain without receiving a failure status.</li>
            <li><b>Exclude Certain Secrets from Scan</b>:
              <ul>
                <li><b>Secrets To Ignore</b> - Select any Parameters to be ignored during the scan from the drop-down. These will not be counted toward the threshold. To add them to the table, click the ‘Add’ button. Parameters are fetched from Tool Registry Parameters.</li>
              </ul></li>
            <li><b>Repositories Available to Scan</b> - Select the repositories to run a scan against.</li>
            <li><b>Selected Repositories</b> - Repositories selected from those available will appear in this table.</li>
          </ul></li>
        <li>Select <b>Create</b> to save. </li>
        <li>After the task is created, select <b>Run Task</b> to run the scan.</li>
      </ol>
    </HelpDocumentationContainer>
  );
}

GitCustodianTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(GitCustodianTaskHelpDocumentation);