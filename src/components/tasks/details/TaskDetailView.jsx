import React, {useState, useEffect, useContext, useRef} from "react";
import { useLocation, useParams } from "react-router-dom";
import TaskDetailPanel from "components/tasks/details/TaskDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import taskActions from "components/tasks/task.actions";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import TaskModel from "components/tasks/task.model";
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
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import ActionBarDeleteTaskButton from "components/tasks/buttons/ActionBarDeleteTaskButton";
import useComponentStateReference from "hooks/useComponentStateReference";

function TaskDetailView() {
  const location = useLocation();
  const { id } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [taskData, setTaskData] = useState(undefined);
  const [taskMetadata, setTaskMetadata] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    accessRoleData,
    userData,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTaskData();
    }
    catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTaskData = async () => {
    const response = await taskActions.getTaskByIdV2(getAccessToken, cancelTokenSource, id);
    const task = response?.data?.data;
    const taskMetadata = response?.data?.metadata;

    if (isMounted.current === true && task != null) {
      setTaskMetadata(taskMetadata);
      setTaskData(new TaskModel(task, taskMetadata, false, getAccessToken, cancelTokenSource, loadData, false, false, setTaskData));
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/task"} />
        </div>
        <div>
          <ActionBarDeleteTaskButton
            taskModel={taskData}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const getHelpComponent = () => {
    switch (taskData?.getData("type")) {
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
      metadata={taskMetadata}
      model={taskData}
      isLoading={isLoading}
      accessRoleData={accessRoleData}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"taskViewer"} />}
      objectRoles={taskData?.getData("roles")}
      actionBar={getActionBar()}
      helpComponent={getHelpComponent()}
      detailPanel={
        <TaskDetailPanel
          gitTasksData={taskData}
          isLoading={isLoading}
          setGitTasksData={setTaskData}
          accessRoleData={accessRoleData}
          loadData={loadData}
          runTask={location?.state?.runTask}
        />
      }
    />
  );
}

export default TaskDetailView;