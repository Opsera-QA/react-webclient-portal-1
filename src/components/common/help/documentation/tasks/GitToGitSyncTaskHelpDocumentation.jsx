import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../tasks/task.types";

function GitToGitSyncTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={getTaskTypeLabel(TASK_TYPES.SYNC_GIT_BRANCHES)} closeHelpPanel={closeHelpPanel}>
      <div className={"mb-1"}>The <b>{getTaskTypeLabel(TASK_TYPES.SYNC_GIT_BRANCHES)}</b> Task merges one source control management (SCM) branch into another. This workflow requires a configured source control management(SCM) tool in Tool Registry. Once the task has been created, you must select the <b>Run Task</b> button to complete the task. For more detailed information on the Git to Git Sync Functionality, view the <a href="https://opsera.atlassian.net/l/c/8XdZDHPD" target="_blank" rel="noreferrer"><b>Git to Git Sync Task Help Documentation</b>.</a></div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>{getTaskTypeLabel(TASK_TYPES.SYNC_GIT_BRANCHES)}</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
          <ul style={{listStyleType: "none"}}>
            <li><b>Source Code Management Type</b> - Select a source control management tool(SCM) identifier. Choose from Gitlab, Github or Bitbucket.</li>
            <li><b>Account</b> - Select a configured source control management(SCM) Tool from the Tool Registry.</li>
            <li><b>Workspace/Project</b> - Select the Bitbucket Workspace or Project where your repository exists.</li>
            <li><b>Repository</b> - Select the repository of the branch to be merged.</li>
            <li><b>Source Branch</b> - Select the branch to be merged.</li>
            <li><b>Target Branch</b> - Select the branch that the source branch will be merged into.</li>
            <li><b>Delete Source Branch</b> - Toggle on to delete the branch after merging it in.</li>
            <li><b>Auto Approve</b> - Some organizations have a policy in which no merge requests can be processed unless at least one person approves it. Toggle this option on to choose Reviewers. </li>
            <li><b>Reviewers</b> - Select reviewers who can approve merge request on this repository. To add approver details, navigate to the SCM account in Tool Registry and view the Accounts tab. Select the repository and approver account.</li>
          </ul></li>
        <li>Select <b>Create</b> to save. </li>
        <li>After the task is created, select <b>Run Task</b> to successfully merge the task.</li>
      </ol>
    </HelpDocumentationContainer>
  );
}

GitToGitSyncTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(GitToGitSyncTaskHelpDocumentation);