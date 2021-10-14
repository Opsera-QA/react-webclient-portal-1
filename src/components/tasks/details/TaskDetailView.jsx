import React, {useState, useEffect, useContext, useRef} from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import TaskDetailPanel from "components/tasks/details/TaskDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import {AuthContext} from "contexts/AuthContext";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import Model from "core/data_model/model";
import TaskModel from "components/tasks/task.model";
import VanitySetDetailScreenContainer
  from "components/common/panels/detail_view_container/VanitySetDetailScreenContainer";

function TaskDetailView() {
  const location = useLocation();
  const { id } = useParams();
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [taskData, setTaskData] = useState(undefined);
  const [taskMetadata, setTaskMetadata] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [canDelete, setCanDelete] = useState(false);
  const [accessRoleData, setAccessRoleData] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getTaskData(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTaskData = async (cancelSource = cancelTokenSource) => {
    const response = await taskActions.getGitTaskByIdV2(getAccessToken, cancelSource, id);
    const task = response?.data?.data;
    const taskMetadata = response?.data?.metadata;

    let action = "delete_task";
    if (isMounted.current === true && task != null) {
      setTaskMetadata(taskMetadata);

      // const canDelete = workflowAuthorizedActions.gitItems(customerAccessRules, action, task?.owner, task?.roles);
      // const canUpdate
      // setTaskData(new Model(task, taskMetadata, false, getAccessToken, cancelSource, loadData, false, false, setTaskData));
      setTaskData(new TaskModel(task, taskMetadata, false, getAccessToken, cancelSource, loadData, false, false, setTaskData));

      if (task?.type === "sfdc-cert-gen") {
        action = "delete_admin_task";
      }

      const customerAccessRules = await getAccessRoleData();
      setAccessRoleData(customerAccessRules);
      setCanDelete(workflowAuthorizedActions.gitItems(customerAccessRules, action, task?.owner, task?.roles));
    }
  };

  const deleteGitTask = async () => {
    return await taskActions.deleteGitTaskV2(getAccessToken, cancelTokenSource, taskData);
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/task"} />
        </div>
        <div>
          {canDelete && <ActionBarDeleteButton2 relocationPath={"/task/"} handleDelete={deleteGitTask} dataObject={taskData} />}
        </div>
      </ActionBarContainer>
    );
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