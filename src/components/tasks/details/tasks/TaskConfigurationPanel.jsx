import React from "react";
import PropTypes from "prop-types";
import SFDXCertGenTaskTypeConfigurationPanel from "./sfdx-cert-gen/SFDXCertGenTaskTypeConfigurationPanel";
import GitToGitSyncTaskConfigurationEditorPanel from "components/tasks/details/tasks/branch-to-branch/GitToGitSyncTaskConfigurationEditorPanel";
import ECSCreationTaskConfigurationPanel from "./ecs-cluster-creation/ECSCreationTaskConfigurationPanel";
import ECSServiceCreationTaskConfigurationPanel from "./ecs-service-creation/ECSServiceCreationTaskConfigurationPanel";
import AwsLambdaConfigurationPanel from "./aws-lambda-creation/AwsLambdaConfigurationPanel";
import AzureClusterConfigurationPanel from "./azure-cluster-creation/AzureClusterConfigurationPanel";
import {TASK_TYPES} from "components/tasks/task.types";
import SFDCBranchStructuringTaskTypeConfigurationPanel
  from "components/tasks/details/tasks/sfdc-branch-structure/SFDCBranchStructuringTaskTypeConfigurationPanel";
import SalesforceOrganizationSyncTaskConfigurationEditorPanel
  from "components/tasks/details/tasks/sfdc-org-sync/SalesforceOrganizationSyncTaskConfigurationEditorPanel";
import SalesforceBulkMigrationTaskConfigurationEditorPanel
  from "components/tasks/details/tasks/sfdc-bulk-migration/SalesforceBulkMigrationTaskConfigurationEditorPanel";
import GitToGitMergeConflictResolutionTaskConfigurationEditorPanel
  from "components/tasks/details/tasks/merge-conflict-resolution/git-to-git/GitToGitMergeConflictResolutionTaskConfigurationEditorPanel";

function TaskConfigurationPanel({ taskModel, setTaskModel, taskConfigurationModel, setTaskConfigurationModel, taskType }) {
  const getConfigurationPanel = () => {
    switch (taskType) {
      case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
        return (
          <SalesforceBulkMigrationTaskConfigurationEditorPanel
            taskConfigurationModel={taskConfigurationModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskModel={taskModel}
          />
        );
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        return (
          <SalesforceOrganizationSyncTaskConfigurationEditorPanel
            taskModel={taskModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskConfigurationModel={taskConfigurationModel}
          />
        );
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
        return (
          <SFDXCertGenTaskTypeConfigurationPanel
            gitTasksDataDto={taskModel}
            setGitTasksConfigurationData={setTaskConfigurationModel}
            gitTasksConfigurationData={taskConfigurationModel}
          />
        );
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
        return (
          <SFDCBranchStructuringTaskTypeConfigurationPanel
            gitTasksDataDto={taskModel}
            setGitTasksConfigurationData={setTaskConfigurationModel}
            gitTasksConfigurationData={taskConfigurationModel}
          />
        ); 
      case TASK_TYPES.SYNC_GIT_BRANCHES:
        return (
          <GitToGitSyncTaskConfigurationEditorPanel
            taskModel={taskModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskConfigurationModel={taskConfigurationModel}
          />
        );
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        return (
          <ECSCreationTaskConfigurationPanel
            gitTasksDataDto={taskModel}
            setGitTasksConfigurationData={setTaskConfigurationModel}
            gitTasksConfigurationData={taskConfigurationModel}
          />
        );
        case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
        return (
          <ECSServiceCreationTaskConfigurationPanel
            gitTasksDataDto={taskModel}
            setGitTasksConfigurationData={setTaskConfigurationModel}
            gitTasksConfigurationData={taskConfigurationModel}
          />
        );
      case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
        return (
          <AwsLambdaConfigurationPanel
            gitTasksDataDto={taskModel}
            setGitTasksConfigurationData={setTaskConfigurationModel}
            gitTasksConfigurationData={taskConfigurationModel}
          />
        );
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
        return (
          <AzureClusterConfigurationPanel
            gitTasksConfigurationData={taskConfigurationModel}
            setGitTasksConfigurationData={setTaskConfigurationModel}
            gitTasksDataDto={taskModel}
            />
        );
      case TASK_TYPES.GIT_TO_GIT_MERGE_CONFLICT_RESOLUTION:
        return (
          <GitToGitMergeConflictResolutionTaskConfigurationEditorPanel
            taskConfigurationModel={taskConfigurationModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskModel={taskModel}
          />
        );
      default:
        return <div className="text-center text-muted p-5">You must select a task type before configuring task details.</div>;
    }
  };

  return (
    <div>
      {getConfigurationPanel()}
    </div>
  );
}

TaskConfigurationPanel.propTypes = {
  taskType: PropTypes.string,
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
  setTaskModel: PropTypes.func
};

export default TaskConfigurationPanel;
