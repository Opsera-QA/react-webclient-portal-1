import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import salesforceOrganizationSyncTaskConfigurationMetadata
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import SFDCBranchStructuringTaskTypeSummaryCard from "./configuration_forms/sfdc-branch-structure/SFDCBranchStructuringTaskTypeSummaryCard";
import sfdcGitBranchTaskConfigurationMetadata
  from "components/tasks/git_task_details/configuration_forms/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import branchToBranchGitTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/branch-to-branch/branch-to-branch-git-task-configuration";
import BranchToBranchTaskTypeSummaryCard from "components/tasks/git_task_details/configuration_forms/branch-to-branch/BranchToBranchTaskTypeSummaryCard";
import sfdxCertGenTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/sfdx-cert-gen/sfdx-cert-gen-task-configuration-metadata";
import SFDXCertGenTaskTypeSummaryCard from "./configuration_forms/sfdx-cert-gen/SFDXCertGenTaskTypeSummaryCard";
import ECSCreationTaskTypeSummaryCard from "./configuration_forms/ecs-cluster-creation/ECSCreationTaskTypeSummaryCard";
import ec2ClusterCreationTaskConfigurationMetadata
  from "./configuration_forms/ecs-cluster-creation/ecs-creation-git-task-configuration";
import ECSServiceCreationTaskTypeSummaryCard
  from "./configuration_forms/ecs-service-creation/ECSServiceCreationTaskTypeSummaryCard";
import ec2ServiceCreationTaskConfigurationMetadata
  from "./configuration_forms/ecs-service-creation/ecs-service-creation-git-task-configuration";
import AwsLambdaTaskTypeSummaryCard from "./configuration_forms/aws-lambda-creation/AwsLambdaSummaryPanel";
import awsLambdaFunctionTaskConfigurationMetadata
  from "./configuration_forms/aws-lambda-creation/aws-lambda-metadata";
import AzureClusterSummaryPanel from "./configuration_forms/azure-cluster-creation/AzureClusterSummaryPanel";
import azureAksClusterTaskConfigurationMetadata
  from "./configuration_forms/azure-cluster-creation/azure-cluster-metadata";
import {TASK_TYPES} from "components/tasks/task.types";
import modelHelpers from "components/common/model/modelHelpers";
import SalesforceOrganizationSyncTaskTypeSummaryCard
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/SalesforceOrganizationSyncTaskTypeSummaryCard";

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
      case TASK_TYPES.SYNC_GIT_BRANCHES:
        return (
          <BranchToBranchTaskTypeSummaryCard
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