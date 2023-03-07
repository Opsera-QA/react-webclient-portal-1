import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../tasks/task.types";

function TaskCreationHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={"Create New Task"} closeHelpPanel={closeHelpPanel}>
      <div className={"mb-1"}>Use the following instructions to create an Opsera Task. For in depth documentation on Opsera Tasks Management, view the <b><a href="https://opsera.atlassian.net/l/c/cd5ujPjA" target="_blank" rel="noreferrer">Opsera Task Management Help Documentation</a></b>.</div>
      <ol>
        <li>Provide values for the following fields.
          <ul style={{listStyleType: "none"}}>
            <li><b>Name</b> - Create a unique name for your Task.</li>
            <li><b>Type</b> - Select a Task Type from the options in the drop down menu to configure Task details. Choose from the following:
              <ul>
                <li><b>{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)}</b> - Create an AWS ECS Cluster template and run the task to create a cluster.</li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_SERVICE)}</b> - Create Amazon Elastic Container Service to integrate tasks and management, then publish the containers through Opsera pipelines.</li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION)}</b> - Create an AWS Lambda Function template and run the task to create a cluster. </li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.AZURE_CLUSTER_CREATION)}</b> - Create an AKS Azure Cluster template and run the task to create a cluster. </li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.GITSCRAPER)}</b> - Choose from Custodian libraries then run a scan against the configured SCM repos. Define a maximum threshold and choose any secrets to ignore in the scan.</li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.SYNC_GIT_BRANCHES)}</b> - Use this task to sync up between 2 different Git branches and merge the changes. The resulting Merge Request can be configured to be approved by set of approvers before Merging.</li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.GIT_TO_GIT_MERGE_SYNC)}</b> - Use this task to selectively merge changes from a source branch to a target branch.</li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE)}</b> - Convert the Salesforce metadata components available in Git Branch from Ant to SFDX format or vice versa.</li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_REPO)}</b> - Create and configure the Salesforce Organization Sync task to sync the changes in Salesforce Org with the configured Git branch.</li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.SALESFORCE_BULK_MIGRATION)}</b> - Migrate the entire SFDC org metadata components to a GIT repository branch. </li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC)}</b> - Use this task to selectively merge Salesforce components to a target branch.</li>
                <li><b>{getTaskTypeLabel(TASK_TYPES.SALESFORCE_QUICK_DEPLOY)}</b> - Use this task to quickly deploy any already successfully validated and unit-tested packages (which are not older than 10 days or 240 hours) to a Salesforce Org by providing the Deploy/Job ID corresponding to the validation.</li>
            </ul></li>
        <li><b>Tags</b> - Select any tags to be associated with your Task. Applying tags at this level will associate that tag with this Task.</li>
        <li><b>Description</b> - Provide a description for the Task.</li>
        <li><b>Roles</b> - Assign access rules for the Task by selecting Group or User, an Assignee and Access Type.</li>
      </ul>
        </li>
      <li>Select <b>Create</b> to save. Following save, a Task may require run.</li>
      </ol>
    </HelpDocumentationContainer>
  );
}

TaskCreationHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(TaskCreationHelpDocumentation);