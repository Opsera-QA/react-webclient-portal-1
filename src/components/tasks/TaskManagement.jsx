import React, {useEffect} from 'react';
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import TaskViews from "components/tasks/TaskViews";
import TasksHelpDocumentation from "../common/help/documentation/tasks/TasksHelpDocumentation";
import useGetTasks from "hooks/workflow/tasks/useGetTasks";

const tableFields = ["name", "description", "type", "tags", "createdAt", "updatedAt", "active", "status", "run_count", "completion"];

function TaskManagement() {
  const {
    tasks,
    isLoading,
    taskFilterModel,
    setTaskFilterModel,
    loadData,
  } = useGetTasks(
    tableFields,
    true,
  );

  useEffect(() => {}, []);

  return (
    <ScreenContainer
      breadcrumbDestination={"taskManagement"}
      helpComponent={<TasksHelpDocumentation />}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"tasks"}/>}
    >
      <TaskViews
        taskData={tasks}
        loadData={loadData}
        isLoading={isLoading}
        taskFilterModel={taskFilterModel}
        setTaskFilterModel={setTaskFilterModel}
      />
    </ScreenContainer>
  );
}

export default TaskManagement;

