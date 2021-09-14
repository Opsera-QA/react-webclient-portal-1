import React, {useContext, useEffect, useRef, useState} from 'react';
import { AuthContext } from "contexts/AuthContext";
import taskActions from "components/tasks/task.actions";
import gitTasksFilterMetadata from "./git-tasks-filter-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import TaskViews from "components/tasks/TaskViews";

function TaskManagement() {
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [taskFilterModel, setTaskFilterModel] = useState(new Model({...gitTasksFilterMetadata.newObjectFields}, gitTasksFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(taskFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newFilterDto = taskFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(newFilterDto, cancelSource);
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

  const getRoles = async (newFilterDto = taskFilterModel, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getTasksList(newFilterDto, cancelSource);
    }
  };

  const getTasksList = async (filterDto = taskFilterModel, cancelSource = cancelTokenSource) => {
    const tableFields = ["name", "description", "type", "tags", "createdAt", "active", "status"];
    const response = await taskActions.getGitTasksListV2(getAccessToken, cancelSource, filterDto, tableFields);
    const taskList = response?.data?.data;

    if (isMounted.current === true && Array.isArray(taskList)) {
      setTasks(taskList);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setTaskFilterModel({...newFilterDto});
    }
  };

  if (!accessRoleData) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"taskManagement"}
      pageDescription={`
        Create and Manage Opsera Related Tasks.
      `}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"tasks"}/>}
    >
      <TaskViews
        taskData={tasks}
        loadData={loadData}
        isLoading={isLoading}
        isMounted={isMounted}
        taskFilterModel={taskFilterModel}
        setTaskFilterModel={setTaskFilterModel}
      />
    </ScreenContainer>
  );
}

export default TaskManagement;

