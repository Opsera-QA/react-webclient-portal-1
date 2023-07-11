import React from "react";
import PropTypes from "prop-types";
import SFDCBranchStructuringTaskTypeConfigurationPanel from "./sfdc-branch-structure/SFDCBranchStructuringTaskTypeConfigurationPanel";
import GitToGitSyncTaskConfigurationEditorPanel from "components/tasks/details/tasks/branch-to-branch/GitToGitSyncTaskConfigurationEditorPanel";
import Ec2ClusterCreationTaskConfigurationPanel from "components/tasks/details/tasks/ecs-cluster-creation/Ec2ClusterCreationTaskConfigurationPanel";
import ECSServiceCreationTaskConfigurationPanel from "./ecs-service-creation/ECSServiceCreationTaskConfigurationPanel";
import AwsLambdaConfigurationPanel from "./aws-lambda-creation/AwsLambdaConfigurationPanel";
import AzureClusterConfigurationPanel from "./azure-cluster-creation/AzureClusterConfigurationPanel";
import {TASK_TYPES} from "components/tasks/task.types";
import SalesforceOrganizationSyncTaskConfigurationEditorPanel from "components/tasks/details/tasks/sfdc-org-sync/SalesforceOrganizationSyncTaskConfigurationEditorPanel";
import SalesforceBulkMigrationTaskConfigurationEditorPanel from "components/tasks/details/tasks/sfdc-bulk-migration/SalesforceBulkMigrationTaskConfigurationEditorPanel";
import GitToGitMergeSyncTaskConfigurationEditorPanel from "components/tasks/details/tasks/merge_sync_task/git_to_git/GitToGitMergeSyncTaskConfigurationEditorPanel";
import SalesforceToGitMergeSyncTaskConfigurationEditorPanel from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/SalesforceToGitMergeSyncTaskConfigurationEditorPanel";
import SalesforceQuickDeployTaskConfigurationEditorPanel from "components/tasks/details/tasks/sfdc-quick-deploy/SalesforceQuickDeployTaskConfigurationEditorPanel";
import SnaplogicTaskConfigurationEditorPanel from "./snaplogic/SnaplogicTaskConfigurationEditorPanel";
import GitScraperConfigurationPanel from "./gitscraper/GitScraperConfigurationPanel";
import SalesforceCustomSettingMigrationTaskEditorPanel from "./sfdc-custom-setting-migration/SalesforceCustomSettingMigrationTaskEditorPanel";
import SalesforceDataSeedingTaskEditorPanel from "./sfdc-data-seeding/SalesforceDataSeedingTaskEditorPanel";

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
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
        return (
          <SFDCBranchStructuringTaskTypeConfigurationPanel
            gitTasksDataDto={taskModel}
            setGitTasksConfigurationData={setTaskConfigurationModel}
            gitTasksConfigurationData={taskConfigurationModel}
          />
        );
      case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
        return (
          <SalesforceToGitMergeSyncTaskConfigurationEditorPanel
            taskConfigurationModel={taskConfigurationModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskModel={taskModel}
          />
        );
      case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
        return (
          <SalesforceQuickDeployTaskConfigurationEditorPanel
            taskModel={taskModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskConfigurationModel={taskConfigurationModel}
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
      case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC:
        return (
          <GitToGitMergeSyncTaskConfigurationEditorPanel
            taskConfigurationModel={taskConfigurationModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskModel={taskModel}
          />
        );
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        return (
          <Ec2ClusterCreationTaskConfigurationPanel
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
      case TASK_TYPES.SNAPLOGIC_TASK:
        return (
          <SnaplogicTaskConfigurationEditorPanel
            taskConfigurationModel={taskConfigurationModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskModel={taskModel}
          />
        );
      case TASK_TYPES.GITSCRAPER:
        return (
          <GitScraperConfigurationPanel
            gitTasksConfigurationData={taskConfigurationModel}
            setGitTasksConfigurationData={setTaskConfigurationModel}
            gitTasksDataDto={taskModel}
          />
        );
      case TASK_TYPES.SALESFORCE_CUSTOM_SETTING_MIGRATION:
        return (
          <SalesforceCustomSettingMigrationTaskEditorPanel
            taskModel={taskModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskConfigurationModel={taskConfigurationModel}
          />
        );
      case TASK_TYPES.SALESFORCE_DATA_SEEDING:
        return (
          <SalesforceDataSeedingTaskEditorPanel
            taskModel={taskModel}
            setTaskConfigurationModel={setTaskConfigurationModel}
            taskConfigurationModel={taskConfigurationModel}
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
