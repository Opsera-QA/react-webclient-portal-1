import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import salesforceOrganizationSyncTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import SFDCBranchStructuringTaskTypeSummaryCard from "./tasks/sfdc-branch-structure/SFDCBranchStructuringTaskTypeSummaryCard";
import sfdcGitBranchTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import branchToBranchGitTaskConfigurationMetadata from "components/tasks/details/tasks/branch-to-branch/branch-to-branch-git-task-configuration";
import GitToGitSyncTaskTypeSummaryCard from "components/tasks/details/tasks/branch-to-branch/GitToGitSyncTaskTypeSummaryCard";
import sfdxCertGenTaskConfigurationMetadata from "components/tasks/details/tasks/sfdx-cert-gen/sfdx-cert-gen-task-configuration-metadata";
import SFDXCertGenTaskTypeSummaryCard from "./tasks/sfdx-cert-gen/SFDXCertGenTaskTypeSummaryCard";
import ECSCreationTaskTypeSummaryCard from "./tasks/ecs-cluster-creation/ECSCreationTaskTypeSummaryCard";
import ec2ClusterCreationTaskConfigurationMetadata
  from "./tasks/ecs-cluster-creation/ecs-creation-git-task-configuration";
import ECSServiceCreationTaskTypeSummaryCard
  from "./tasks/ecs-service-creation/ECSServiceCreationTaskTypeSummaryCard";
import ec2ServiceCreationTaskConfigurationMetadata
  from "./tasks/ecs-service-creation/ecs-service-creation-git-task-configuration";
import AwsLambdaTaskTypeSummaryCard from "./tasks/aws-lambda-creation/AwsLambdaSummaryPanel";
import awsLambdaFunctionTaskConfigurationMetadata
  from "./tasks/aws-lambda-creation/aws-lambda-metadata";
import AzureClusterSummaryPanel from "./tasks/azure-cluster-creation/AzureClusterSummaryPanel";
import azureAksClusterTaskConfigurationMetadata
  from "./tasks/azure-cluster-creation/azure-cluster-metadata";
import {TASK_TYPES} from "components/tasks/task.types";
import modelHelpers from "components/common/model/modelHelpers";
import SalesforceOrganizationSyncTaskTypeSummaryCard
  from "components/tasks/details/tasks/sfdc-org-sync/SalesforceOrganizationSyncTaskTypeSummaryCard";
import SalesforceBulkMigrationTaskTypeSummaryCard
  from "components/tasks/details/tasks/sfdc-bulk-migration/SalesforceBulkMigrationTaskTypeSummaryCard";
import {salesforceBulkMigrationTaskConfigurationMetadata} from "components/tasks/details/tasks/sfdc-bulk-migration/salesforceBulkMigrationTaskConfigurationMetadata";

function TaskConfigurationSummaryPanel({ taskModel }) {
  const getTaskTypeSummaryPanel = () => {
    switch (taskModel?.getData("type")) {
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        return (
          <SalesforceOrganizationSyncTaskTypeSummaryCard
            gitTaskConfigurationData={
              modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), salesforceOrganizationSyncTaskConfigurationMetadata)
            }
            gitTasksData={taskModel}
          />
        );
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
        return (
          <SFDCBranchStructuringTaskTypeSummaryCard
            gitTaskConfigurationData={
              modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), sfdcGitBranchTaskConfigurationMetadata)
            }
            gitTasksData={taskModel}
          />
        );
      case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
        return (
          <SalesforceBulkMigrationTaskTypeSummaryCard
            taskConfigurationModel={
              modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), salesforceBulkMigrationTaskConfigurationMetadata)
            }
            taskModel={taskModel}
          />
        );
      case TASK_TYPES.SYNC_GIT_BRANCHES:
        return (
          <GitToGitSyncTaskTypeSummaryCard
            gitTaskConfigurationData={
              modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), branchToBranchGitTaskConfigurationMetadata)
            }
            gitTasksData={taskModel}
          />
        );
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
        return (
          <SFDXCertGenTaskTypeSummaryCard
            gitTaskConfigurationData={
              modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), sfdxCertGenTaskConfigurationMetadata)
            }
            gitTasksData={taskModel}
          />
        );
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        return (
          <ECSCreationTaskTypeSummaryCard
            gitTaskConfigurationData={
              modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), ec2ClusterCreationTaskConfigurationMetadata)
            }
            gitTasksData={taskModel}
          />
        );
      case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
        return (
          <ECSServiceCreationTaskTypeSummaryCard
            gitTaskConfigurationData={
              modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), ec2ServiceCreationTaskConfigurationMetadata)
            }
            gitTasksData={taskModel}
          />
        );
      case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
        return (
          <AwsLambdaTaskTypeSummaryCard
            gitTaskConfigurationData={
              modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), awsLambdaFunctionTaskConfigurationMetadata)
            }
            gitTasksData={taskModel}
          />
        );
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
        return (
          <AzureClusterSummaryPanel
            gitTaskConfigurationData={
              modelHelpers.parseObjectIntoModel(taskModel?.getData("configuration"), azureAksClusterTaskConfigurationMetadata)
            }
            gitTasksData={taskModel}
          />
        );
      default:
        return (<div>No type associated with this Task</div>);
    }
  };

  if (taskModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div>
      {getTaskTypeSummaryPanel()}
    </div>
  );
}

TaskConfigurationSummaryPanel.propTypes = {
  taskModel: PropTypes.object,
};

export default TaskConfigurationSummaryPanel;