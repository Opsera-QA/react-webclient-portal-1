import React, {useEffect, useState} from 'react';
import taskActions from "components/tasks/task.actions";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import TaskViews from "components/tasks/TaskViews";
import TaskFilterModel from "components/tasks/task.filter.model";
import TasksHelpDocumentation from "../common/help/documentation/tasks/TasksHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";

function TaskManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskFilterModel, setTaskFilterModel] = useState(undefined);
  const {
    accessRoleData,
    toastContext,
    getAccessToken,
    cancelTokenSource,
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    const newTaskFilterModel = new TaskFilterModel(getAccessToken, cancelTokenSource, loadData);
    loadData(newTaskFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (newFilterModel = taskFilterModel) => {
    try {
      setIsLoading(true);
      await getTasksList(newFilterModel);
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

  const getTasksList = async (newFilterModel = taskFilterModel) => {
    const tableFields = ["name", "description", "type", "tags", "createdAt", "updatedAt", "active", "status", "run_count"];
    const response = await taskActions.getTasksListV2(getAccessToken, cancelTokenSource, newFilterModel, tableFields);
    const taskList = response?.data?.data;

    if (isMounted.current === true && Array.isArray(taskList)) {
      setTasks(taskList);
      newFilterModel.updateTotalCount(response?.data?.count);
      newFilterModel.updateActiveFilters();
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
        taskFilterModel={taskFilterModel}
        setTaskFilterModel={setTaskFilterModel}
      />
    </ScreenContainer>
  );
}

export default TaskManagement;

