import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../tasks/task.types";

function GitToGitMergeSyncTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={getTaskTypeLabel(TASK_TYPES.GIT_TO_GIT_MERGE_SYNC)} closeHelpPanel={closeHelpPanel}>
      <div className={"mb-1"}>The <b>{getTaskTypeLabel(TASK_TYPES.GIT_TO_GIT_MERGE_SYNC)} Task</b> is used to selectively merge changes from a source branch to a target branch. Once the task has been created, you must select the <b>Run Task</b> button to initialize the <b>Git to Git Merge Sync Wizard</b>, verifying any file changes before triggering the merge. For more detailed information on the Git to Git Merge Sync Functionality, view the <a href="https://docs.opsera.io/salesforce/git-to-git-merge-sync-task" target="_blank" rel="noreferrer"><b>Git to Git Merge Sync Task Documentation</b>.</a></div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>{getTaskTypeLabel(TASK_TYPES.GIT_TO_GIT_MERGE_SYNC)}</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
          <ul style={{listStyleType: "none"}}>
            <li><b>Salesforce Task</b> - Enable the option to automatically update task information into your Jira Tickets. Once enabled, choose the relevant <b>Build Type</b>, <b>Jira Tool</b>, <b>Jira Project</b> and <b>Jira Ticket</b> from the drop-downs.</li>
            <li><b>Source Code Management Type</b> - Choose whether a Bitbucket, GitHub, or GitLab repository contains the branch of the merge.</li>
            <li><b>Account</b> - Select the configured SCM tool.</li>
            <li><b>Repository</b> - Select the repository containing the git merge change.</li>
            <li><b>Source Branch</b> - Select the branch you wish to merge from.</li>
            <li><b>Target Branch</b> - Select the branch to which you wish to merge the changes.</li>
            <li><b>Create a New Target Branch</b> - To merge changes to a new branch, enable this toggle and provide an <b>Upstream Branch</b>.</li>
          </ul></li>
        <li>Select <b>Create</b> to save. </li>
        <li>After the task is created, select <b>Run Task</b> to initialize the <b>Git to Git Merge Sync Wizard</b>. Follow the prompts to select and verify changes from the files that you wish to merge then proceed to merge trigger.</li>
      </ol>
    </HelpDocumentationContainer>
  );
}

GitToGitMergeSyncTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(GitToGitMergeSyncTaskHelpDocumentation);