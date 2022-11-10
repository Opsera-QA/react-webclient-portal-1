import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../tasks/task.types";
import AssignedRoleAccessTable from "components/common/fields/access/table/AssignedRoleAccessTable";
import SiteRoleAccessTable from "components/common/fields/access/table/SiteRoleAccessTable";
import tasksRoles from "@opsera/know-your-role/roles/tasks/tasks.roles";

function TasksHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Create and manage the following Opsera Tasks. To view in depth documentation on Opsera Tasks Management view the <b><a href="https://opsera.atlassian.net/l/c/cd5ujPjA" target="_blank" rel="noreferrer">Opsera Task Management Help Documentation</a></b> or click a task below for a link to individual task help documentation.
          <div className={"mt-2 ml-4"}>
              <div><b><a href="https://docs.opsera.io/aws-native-support/aws-ecs#setup-aws-ecs-service-creation-task" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)}</a></b> - Create an AWS ECS Cluster template and run the task to create a cluster.</div>
              <div><b><a href="https://docs.opsera.io/aws-native-support/aws-ecs#setup-aws-ecs-service-creation-task" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_SERVICE)}</a></b> - Create Amazon Elastic Container Service to integrate tasks and management, then publish the containers through Opsera pipelines. </div>
              <div><b><a href="https://docs.opsera.io/aws-native-support/aws-lambda-functions" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION)}</a></b> - Create an AWS Lambda Function template and run the task to create a cluster. </div>
              <div><b><a href="https://docs.opsera.io/azure-native-support/azure-aks-cluster-creation-tasks-documentation" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.AZURE_CLUSTER_CREATION)}</a></b> - Create an AKS Azure Cluster template and run the task to create a cluster. </div>
              <div><b><a href="https://docs.opsera.io/quality-and-security-scan/git-custodian-task" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.GITSCRAPER)}</a></b> - Choose from Custodian libraries then run a scan against the configured SCM repos. Define a maximum threshold and choose any secrets to ignore in the scan.</div>
              <div><b><a href="https://opsera.atlassian.net/l/c/dqYyf13n" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.SYNC_GIT_BRANCHES)}</a></b> - Use this task to sync up between 2 different Git branches and merge the changes. The resulting Merge Request can be configured to be approved by set of approvers before Merging. </div>
              <div><b><a href="https://docs.opsera.io/salesforce/git-to-git-merge-sync-task" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.GIT_TO_GIT_MERGE_SYNC)}</a></b> - Use this task to selectively merge changes from a source branch to a target branch. </div>
              <div><b>{getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE)}</b> - Convert the Salesforce metadata components available in Git Branch from Ant to SFDX format or vice versa.</div>
              <div><b><a href="https://docs.opsera.io/salesforce/salesforce-bulk-migration-task-help-documentation" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.SALESFORCE_BULK_MIGRATION)}</a></b> - Migrate the entire SFDC org metadata components to a GIT repository branch.</div>
              <div><b><a href="https://docs.opsera.io/salesforce/organization-sync-task" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_REPO)}</a></b> - Create and configure the Salesforce Organization Sync task to sync the changes in Salesforce Org with the configured Git branch. </div>
            <div><b><a href="https://docs.opsera.io/salesforce/git-to-git-merge-sync-task-documentation" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC)}</a></b> - Use this task to selectively merge Salesforce components to a target branch.</div>
              <div><b><a href="https://docs.opsera.io/salesforce/salesforce-quick-deployment-documentation" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.SALESFORCE_QUICK_DEPLOY)}</a></b> - Use this task to quickly deploy any already successfully validated and unit-tested packages (which are not older than 10 days or 240 hours) to a Salesforce Org by providing the Deploy/Job ID corresponding to the validation. </div>

          </div>
        </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Opsera Tasks"}
      helpDocumentation={getHelpDocumentation()}
    >
      <div className={"my-2"}>
        <AssignedRoleAccessTable
          roleAccessDefinitions={tasksRoles}
        />
      </div>
      <div className={"my-2"}>
        <SiteRoleAccessTable
          roleAccessDefinitions={tasksRoles}
        />
      </div>
    </HelpOverlayBase>
  );
}


export default React.memo(TasksHelpDocumentation);