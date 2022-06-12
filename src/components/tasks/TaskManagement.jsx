import React, {useContext, useEffect, useRef, useState} from 'react';
import { AuthContext } from "contexts/AuthContext";
import taskActions from "components/tasks/task.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import TaskViews from "components/tasks/TaskViews";
import TaskFilterModel from "components/tasks/task.filter.model";
import TasksHelpDocumentation from "../common/help/documentation/tasks/TasksHelpDocumentation";

function TaskManagement() {
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [taskFilterModel, setTaskFilterModel] = useState(undefined);
  const [taskMetadata, setTaskMetadata] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    const newTaskFilterModel = new TaskFilterModel(getAccessToken, source, loadData);
    loadData(newTaskFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newFilterModel = taskFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(newFilterModel, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (newFilterModel = taskFilterModel, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getTasksList(newFilterModel, cancelSource);
    }
  };

  const getTasksList = async (newFilterModel = taskFilterModel, cancelSource = cancelTokenSource) => {
    const tableFields = ["name", "description", "type", "tags", "createdAt", "updatedAt", "active", "status", "run_count"];
    const response = await taskActions.getTasksListV2(getAccessToken, cancelSource, newFilterModel, tableFields);
    const taskList = response?.data?.data;
    const taskMetadata = response?.data?.metadata;

    if (isMounted.current === true && Array.isArray(taskList)) {
      setTasks(taskList);
      setTaskMetadata(taskMetadata);
      newFilterModel.updateTotalCount(response?.data?.count);
      newFilterModel.updateActiveFilters();
      newFilterModel.updateBrowserStorage();
      setTaskFilterModel({...newFilterModel});
    }
  };

  const getHelpComponent = () => {
    return (<TasksHelpDocumentation/>);
  };

  if (!accessRoleData) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"taskManagement"}
      helpComponent={getHelpComponent()}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"tasks"}/>}
    >
      <TaskViews
        taskData={tasks}
        loadData={loadData}
        isLoading={isLoading}
        isMounted={isMounted}
        taskMetadata={taskMetadata}
        taskFilterModel={taskFilterModel}
        setTaskFilterModel={setTaskFilterModel}
      />
    </ScreenContainer>
  );
}

export default TaskManagement;

