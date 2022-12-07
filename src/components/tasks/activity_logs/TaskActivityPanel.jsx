import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import taskActivityLogHelpers
  from "components/tasks/activity_logs/taskActivityLog.helpers";
import TaskActivityLogTreeTable from "components/tasks/details/TaskActivityLogTreeTable";
import {TaskActivityLogFilterModel} from "components/tasks/activity_logs/taskActivityLog.filter.model";
import {taskActivityLogActions} from "components/tasks/activity_logs/taskActivityLog.actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPollingTaskActivityLogCountForRun from "hooks/workflow/tasks/logs/useGetPollingTaskActivityLogCountForRun";

function TaskActivityPanel(
  {
    taskModel,
    taskRunCount,
    taskId,
    showFilterContainerIcon,
    status,
  }) {
  const [activityData, setActivityData] = useState([]);
  const taskLogsTree = useRef([]);
  const [currentRunNumber, setCurrentRunNumber] = useState(undefined);
  const [taskActivityFilterModel, setTaskActivityFilterModel] = useState(new TaskActivityLogFilterModel());
  const [loadingActivityLogs, setLoadingActivityLogs] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();
  const {
    logCount,
    isLoading,
  } = useGetPollingTaskActivityLogCountForRun(
    taskId,
    currentRunNumber === taskRunCount ? currentRunNumber : undefined
  );

  useEffect(() => {
    console.log("logCount: " + logCount);
    pullLogs().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [logCount]);

  useEffect(() => {
    const taskTree = taskActivityLogHelpers.constructRunCountTreeWithRunCountAndTaskId(taskRunCount, taskId);

    if (Array.isArray(taskTree)) {
      taskLogsTree.current = taskTree;
    }
  }, [taskRunCount, taskId]);

  useEffect(() => {
    setActivityData([]);

    if (currentRunNumber) {
      pullLogs().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentRunNumber]);

  const pullLogs = async (newFilterModel = taskActivityFilterModel) => {
    try {
      setLoadingActivityLogs(true);

      if (currentRunNumber === "latest") {
        await getLatestActivityLogs(newFilterModel);
      } else if (currentRunNumber === "secondary") {
        await getSecondaryActivityLogs(newFilterModel);
      } else if (currentRunNumber) {
        await getSingleRunLogs(newFilterModel);
      }

    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted.current === true) {
        setLoadingActivityLogs(false);
      }
    }
  };

  const getSecondaryActivityLogs = async (newFilterModel = taskActivityFilterModel) => {
    try {
      setLoadingActivityLogs(true);
      const response = await taskActivityLogActions.getSecondaryTaskActivityLogs(getAccessToken, cancelTokenSource, newFilterModel, taskModel?.getData("_id"));
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        newFilterModel?.setData("totalCount", response?.data?.count);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setTaskActivityFilterModel({...newFilterModel});
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoadingActivityLogs(false);
      }
    }
  };

  const getLatestActivityLogs = async (newFilterModel = taskActivityFilterModel) => {
    try {
      setLoadingActivityLogs(true);
      const response = await taskActivityLogActions.getLatestTaskActivityLogs(getAccessToken, cancelTokenSource, newFilterModel, taskModel?.getData("_id"));
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        newFilterModel?.setData("totalCount", response?.data?.count);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setTaskActivityFilterModel({...newFilterModel});
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoadingActivityLogs(false);
      }
    }
  };

  const getSingleRunLogs = async (newFilterModel = taskActivityFilterModel) => {
    try {
      setLoadingActivityLogs(true);
      const response = await taskActivityLogActions.getTaskActivityLogsByIdAndRunCount(getAccessToken, cancelTokenSource, taskModel?.getData("_id"), currentRunNumber, newFilterModel);
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        newFilterModel?.setData("totalCount", response?.data?.count);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setTaskActivityFilterModel({...newFilterModel});
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setLoadingActivityLogs(false);
      }
    }
  };

  if (taskModel == null) {
    return null;
  }

  return (
    <TaskActivityLogTreeTable
      taskLogData={activityData}
      isLoading={loadingActivityLogs}
      isPolling={isLoading}
      loadData={pullLogs}
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
  status: PropTypes.string,
};

export default TaskActivityPanel;

