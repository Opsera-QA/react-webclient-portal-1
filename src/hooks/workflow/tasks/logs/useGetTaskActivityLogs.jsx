import {useEffect, useRef, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import TaskActivityLogFilterModel from "components/tasks/activity_logs/taskActivityLog.filter.model";
import useTaskActivityLogActions from "hooks/workflow/tasks/logs/useTaskActivityLogActions";
import useTaskActivityLogCollectionSubscriptionHelper from "core/websocket/hooks/collection/activity_logs/useTaskActivityLogCollectionSubscriptionHelper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetPollingTaskActivityLogCountForRun from "hooks/workflow/tasks/logs/useGetPollingTaskActivityLogCountForRun";
import taskActivityLogHelpers from "components/tasks/activity_logs/taskActivityLog.helpers";

export default function useGetTaskActivityLogs(
  taskId,
  currentRunNumber,
  taskRunCount,
  handleErrorFunction,
) {
  const taskActivityLogActions = useTaskActivityLogActions();
  const [taskActivityFilterModel, setTaskActivityFilterModel] = useState(new TaskActivityLogFilterModel());
  const [taskActivityLogs, setTaskActivityLogs] = useState([]);
  const taskLogsTree = useRef([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  useTaskActivityLogCollectionSubscriptionHelper(
    liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.TASK_ACTIVITY_LOGS,
    taskActivityLogs,
    setTaskActivityLogs,
    taskId,
    currentRunNumber,
  );
  const pollingTaskActivityLogCountForRunHook = useGetPollingTaskActivityLogCountForRun(
    taskId,
    currentRunNumber === taskRunCount ? currentRunNumber : undefined
  );

  useEffect(() => {
    setTaskActivityLogs([]);

    if (currentRunNumber && taskId && loadData) {
      loadData(getTaskActivityLogs, handleErrorFunction).catch(() => {});
    }
  }, [currentRunNumber, taskId]);

  useEffect(() => {
    if (pollingTaskActivityLogCountForRunHook.logCount > taskActivityLogs.length) {
      console.debug(`logCount: [${pollingTaskActivityLogCountForRunHook.logCount}], current log count: [${taskActivityLogs.length}]`);
      if (currentRunNumber && taskId && loadData) {
        loadData(getTaskActivityLogs, handleErrorFunction).catch(() => {});
      }
    }
  }, [pollingTaskActivityLogCountForRunHook.logCount]);

  useEffect(() => {
    const taskTree = taskActivityLogHelpers.constructRunCountTreeWithRunCountAndTaskId(taskRunCount, taskId);

    if (Array.isArray(taskTree)) {
      taskLogsTree.current = taskTree;
    }
  }, [taskRunCount, taskId]);

  const getTaskActivityLogs = async (newFilterModel = taskActivityFilterModel) => {

    if (currentRunNumber === "latest") {
      await getLatestActivityLogs(newFilterModel);
    } else if (currentRunNumber === "secondary") {
      await getSecondaryActivityLogs(newFilterModel);
    } else if (currentRunNumber) {
      await getSingleRunLogs(newFilterModel);
    }
  };

  const getSecondaryActivityLogs = async (newFilterModel = taskActivityFilterModel) => {
    const response = await taskActivityLogActions.getSecondaryTaskActivityLogs(newFilterModel, taskId);
    const taskActivityData = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setTaskActivityLogs([...taskActivityData]);
    newFilterModel?.setData("totalCount", response?.data?.count);
    newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
    setTaskActivityFilterModel({...newFilterModel});
  };

  const getLatestActivityLogs = async (newFilterModel = taskActivityFilterModel) => {
    const response = await taskActivityLogActions.getLatestTaskActivityLogs(newFilterModel, taskId);
    const taskActivityData = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setTaskActivityLogs([...taskActivityData]);
    newFilterModel?.setData("totalCount", response?.data?.count);
    newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
    setTaskActivityFilterModel({...newFilterModel});
  };

  const getSingleRunLogs = async (newFilterModel = taskActivityFilterModel) => {
    const response = await taskActivityLogActions.getTaskActivityLogsByIdAndRunCount(taskId, currentRunNumber, newFilterModel);
    const taskActivityData = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setTaskActivityLogs([...taskActivityData]);
    newFilterModel?.setData("totalCount", response?.data?.count);
    newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
    setTaskActivityFilterModel({...newFilterModel});
  };

  return ({
    taskActivityLogs: taskActivityLogs,
    setTaskActivityLogs: setTaskActivityLogs,
    taskActivityFilterModel: taskActivityFilterModel,
    setTaskActivityFilterModel: setTaskActivityFilterModel,
    loadData: () => loadData(getTaskActivityLogs, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
    taskLogsTree: taskLogsTree?.current,
  });
}
