import React, {useState, useEffect, useContext, useRef} from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import GitTaskDetailPanel from "./GitTaskDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import axios from "axios";
import gitTasksActions from "components/tasks/git-task-actions";
import gitTasksMetadata from "components/tasks/git-tasks-metadata";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";

function TaskDetailView() {
  const location = useLocation();
  const { id } = useParams();
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [gitTasksData, setGitTasksData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
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
      await getGitTaskData(cancelSource);
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getGitTaskData = async (cancelSource = cancelTokenSource) => {
    const response = await gitTasksActions.getGitTaskByIdV2(getAccessToken, cancelSource, id);
    const gitTask = response?.data?.data[0];
    // TODO: Wire up new route when ready
    // const gitTask = response?.data?.data;
    let action = "delete_task";
    if (isMounted.current === true && gitTask != null) {
      setGitTasksData(new Model(gitTask, gitTasksMetadata, false));
      if (gitTask.type === "sfdc-cert-gen") {
        action = "delete_admin_task";
      }
      const customerAccessRules = await getAccessRoleData();
      setAccessRoleData(customerAccessRules);
      setCanDelete(workflowAuthorizedActions.gitItems(customerAccessRules, action, gitTask.owner, gitTask.roles));
    }
  };

  const deleteGitTask = async () => {
    return await gitTasksActions.deleteGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData);
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/task"} />
        </div>
        <div>
          {canDelete && <ActionBarDeleteButton2 relocationPath={"/task/"} handleDelete={deleteGitTask} dataObject={gitTasksData} />}
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"taskManagementDetailView"}
      metadata={gitTasksMetadata}
      dataObject={gitTasksData}
      isLoading={isLoading}
      accessRoleData={accessRoleData}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"taskViewer"} />}
      objectRoles={gitTasksData?.getData("roles")}
      actionBar={getActionBar()}
      detailPanel={
        <GitTaskDetailPanel
          gitTasksData={gitTasksData}
          isLoading={isLoading}
          setGitTasksData={setGitTasksData}
          accessRoleData={accessRoleData}
          loadData={getGitTaskData}
          runTask={location?.state?.runTask}
        />
      }
    />
  );
}

export default TaskDetailView;