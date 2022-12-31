import React, {useEffect, useState} from "react";
import { useLocation, useParams } from "react-router-dom";
import TaskDetailPanel from "components/tasks/details/TaskDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import VanitySetDetailScreenContainer
  from "components/common/panels/detail_view_container/VanitySetDetailScreenContainer";
import {TASK_TYPES} from "components/tasks/task.types";
import AwsEcsClusterCreationTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/AwsEcsClusterCreationTaskDetailsHelpDocumentation";
import AwsEcsServiceCreationTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/AwsEcsServiceCreationTaskDetailsHelpDocumentation";
import AwsLambdaFunctionCreationTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/AwsLambdaFunctionCreationTaskDetailsHelpDocumentation";
import AzureAKSClusterCreationTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/AzureAKSClusterCreationTaskDetailsHelpDocumentation";
import GitToGitSyncTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/GitToGitSyncTaskDetailsHelpDocumentation";
import SalesforceBulkMigrationTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/SalesforceBulkMigrationTaskDetailsHelpDocumentation";
import SfdcOrgSyncTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/SfdcOrgSyncTaskDetailsHelpDocumentation";
import GitToGitMergeSyncTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/GitToGitMergeSyncTaskDetailsHelpDocumentation";
import SalesforceToGitMergeSyncTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/SalesforceToGitMergeSyncTaskDetailsHelpDocumentation";
import SfdxQuickDeployTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/SfdxQuickDeployTaskDetailsHelpDocumentation";
import GitCustodianTaskDetailsHelpDocumentation
  from "../../common/help/documentation/tasks/details/GitCustodianTaskDetailsHelpDocumentation";
import ActionBarDeleteTaskButton from "components/tasks/buttons/ActionBarDeleteTaskButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetTaskModelById from "components/tasks/hooks/useGetTaskModelById";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import useGetPollingTaskOrchestrationStatusById
  from "hooks/workflow/tasks/orchestration/useGetPollingTaskOrchestrationStatusById";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import ViewTaskAuditLogsActionBarButton from "components/tasks/buttons/ViewTaskAuditLogsActionBarButton";

const pausedMessage = "This Task has been paused. Please check the activity logs for details.";
const stoppedMessage = "This Task has completed running. Please check the activity logs for details.";
const failedMessage = "This Task has completed running with a failed status. Please check the activity logs for details.";
const successMessage = "This Task has completed running with a successful status. Please check the activity logs for details.";
const runningMessage = "This Task is currently running. Please check the activity logs for details.";

function TaskDetailView() {
  const location = useLocation();
  const { id } = useParams();
  const [isTaskRunning, setIsTaskRunning] = useState(false);
  const {
    accessRoleData,
    toastContext
  } = useComponentStateReference();
  const {
    taskModel,
    setTaskModel,
    loadData,
    isLoading,
  } = useGetTaskModelById(id);
  const {
    status,
    runCount,
    updatedAt,
  } = useGetPollingTaskOrchestrationStatusById(id, 15000);

  useEffect(() => {
    if (hasStringValue(status) === true && numberHelpers.hasNumberValue(runCount) === true &&
      (taskModel?.getData("status") !== status || taskModel?.getData("run_count") !== runCount || taskModel?.getData("updatedAt") !== updatedAt)
    ) {
      console.log(`got polling update for Task [${id}] status [${status}] run count [${runCount}], Last Updated At [${updatedAt}]`);

      loadData();
    }
  }, [status, runCount, updatedAt]);

  // useEffect(() => {
  //   if (status === "paused") {
  //     toastContext.showSystemWarningToast(pausedMessage, 20);
  //     setIsTaskRunning(false);
  //   } else if (isTaskRunning === true && status === "stopped") {
  //     toastContext.showSystemInformationToast(stoppedMessage, 20);
  //     setIsTaskRunning(false);
  //   } else if (isTaskRunning === true && status === "failed") {
  //     toastContext.showSystemErrorToast(failedMessage, undefined, 20);
  //     setIsTaskRunning(false);
  //   } else if (isTaskRunning === true && status === "success") {
  //     toastContext.showSystemSuccessToast(successMessage, 20);
  //     setIsTaskRunning(false);
  //   } else if (isTaskRunning !== true && status === "running") {
  //     toastContext.showSystemInformationToast(runningMessage, 20);
  //     setIsTaskRunning(true);
  //   }
  // }, [status]);

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/task"} />
        </div>
        <div className={"d-flex"}>
          {/*<ViewTaskAuditLogsActionBarButton*/}
          {/*  className={"ml-3"}*/}
          {/*  taskModel={taskModel}*/}
          {/*/>*/}
          <ActionBarDeleteTaskButton
            taskModel={taskModel}
            className={"ml-3"}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const getHelpComponent = () => {
    switch (taskModel?.getData("type")) {
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        return <AwsEcsClusterCreationTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
        return <AwsEcsServiceCreationTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
        return <AwsLambdaFunctionCreationTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
        return <AzureAKSClusterCreationTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.GITSCRAPER:
        return <GitCustodianTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.SYNC_GIT_BRANCHES:
        return <GitToGitSyncTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC:
        return <GitToGitMergeSyncTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
        return <SalesforceBulkMigrationTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        return <SfdcOrgSyncTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
        return <SalesforceToGitMergeSyncTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
        return <SfdxQuickDeployTaskDetailsHelpDocumentation/>;
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
      default:
        return null;
    }
  };

  return (
    <VanitySetDetailScreenContainer
      breadcrumbDestination={"taskManagementDetailView"}
      metadata={tasksMetadata}
      isLoading={isLoading && taskModel == null}
      model={taskModel}
      accessRoleData={accessRoleData}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"taskViewer"} />}
      objectRoles={taskModel?.getData("roles")}
      actionBar={getActionBar()}
      helpComponent={getHelpComponent()}
      detailPanel={
        <TaskDetailPanel
          gitTasksData={taskModel}
          isLoading={isLoading}
          setGitTasksData={setTaskModel}
          accessRoleData={accessRoleData}
          loadData={loadData}
          runTask={location?.state?.runTask}
          status={status}
          runCount={runCount}
        />
      }
    />
  );
}

export default TaskDetailView;