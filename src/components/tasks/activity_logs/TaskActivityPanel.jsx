import React, {useState} from "react";
import PropTypes from "prop-types";
import TaskActivityLogTreeTable from "components/tasks/details/TaskActivityLogTreeTable";
import useGetTaskActivityLogs from "hooks/workflow/tasks/logs/useGetTaskActivityLogs";

export default function TaskActivityPanel(
  {
    taskModel,
    taskRunCount,
    taskId,
    showFilterContainerIcon,
  }) {
  const [currentRunNumber, setCurrentRunNumber] = useState(taskRunCount);
  const {
    taskActivityLogs,
    setTaskActivityLogs,
    taskActivityFilterModel,
    setTaskActivityFilterModel,
    error,
    loadData,
    isLoading,
    taskLogsTree,
  } = useGetTaskActivityLogs(
    taskId,
    currentRunNumber,
    taskRunCount,
  );

  if (taskModel == null) {
    return null;
  }

  return (
    <TaskActivityLogTreeTable
      taskLogData={taskActivityLogs}
      isLoading={isLoading}
      // isPolling={pollingTaskActivityLogCountForRunHook?.isLoading}
      loadData={loadData}
      taskActivityFilterModel={taskActivityFilterModel}
      setTaskActivityFilterModel={setTaskActivityFilterModel}
      taskActivityTreeData={taskLogsTree}
      setCurrentRunNumber={setCurrentRunNumber}
      currentRunNumber={currentRunNumber}
      taskRunCount={taskRunCount}
      showFilterContainerIcon={showFilterContainerIcon}
    />
  );
}

TaskActivityPanel.propTypes = {
  taskModel: PropTypes.object,
  showFilterContainerIcon: PropTypes.bool,
  taskRunCount: PropTypes.number,
  taskId: PropTypes.string,
};
