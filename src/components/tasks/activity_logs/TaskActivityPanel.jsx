import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import taskActivityLogHelpers
  from "components/tasks/activity_logs/taskActivityLog.helpers";
import TaskActivityLogTreeTable from "components/tasks/details/TaskActivityLogTreeTable";
import useGetPollingTaskActivityLogCountForRun from "hooks/workflow/tasks/logs/useGetPollingTaskActivityLogCountForRun";
import useGetTaskActivityLogs from "hooks/workflow/tasks/logs/useGetTaskActivityLogs";

export default function TaskActivityPanel(
  {
    taskModel,
    taskRunCount,
    taskId,
    showFilterContainerIcon,
  }) {
  const taskLogsTree = useRef([]);
  const [currentRunNumber, setCurrentRunNumber] = useState(taskRunCount);
  const {
    taskActivityLogs,
    setTaskActivityLogs,
    taskActivityFilterModel,
    setTaskActivityFilterModel,
    error,
    loadData,
    isLoading,
  } = useGetTaskActivityLogs(
    taskId,
    currentRunNumber,
  );
  // const pollingTaskActivityLogCountForRunHook = useGetPollingTaskActivityLogCountForRun(
  //   taskId,
  //   currentRunNumber === taskRunCount ? currentRunNumber : undefined
  // );

  // useEffect(() => {
  //   loadData();
  // }, [pollingTaskActivityLogCountForRunHook.logCount]);

  useEffect(() => {
    const taskTree = taskActivityLogHelpers.constructRunCountTreeWithRunCountAndTaskId(taskRunCount, taskId);

    if (Array.isArray(taskTree)) {
      taskLogsTree.current = taskTree;
    }
  }, [taskRunCount, taskId]);

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
      taskActivityTreeData={taskLogsTree?.current}
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
