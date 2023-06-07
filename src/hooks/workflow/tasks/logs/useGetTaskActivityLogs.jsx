import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import TaskActivityLogFilterModel from "components/tasks/activity_logs/taskActivityLog.filter.model";
import useTaskActivityLogActions from "hooks/workflow/tasks/logs/useTaskActivityLogActions";
import useDocumentActivityLogCollectionSubscriptionHelper
  from "core/websocket/hooks/collection/activity_logs/useDocumentActivityLogCollectionSubscriptionHelper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useGetTaskActivityLogs(
  taskId,
  currentRunNumber,
  handleErrorFunction,
) {
  const taskActivityLogActions = useTaskActivityLogActions();
  const [taskActivityFilterModel, setTaskActivityFilterModel] = useState(new TaskActivityLogFilterModel());
  const [taskActivityLogs, setTaskActivityLogs] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  useDocumentActivityLogCollectionSubscriptionHelper(
    liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.TASK_ACTIVITY_LOGS,
    taskActivityLogs,
    setTaskActivityLogs,
    taskId,
    currentRunNumber,
  );

  useEffect(() => {
    setTaskActivityLogs([]);

    if (currentRunNumber && taskId && loadData) {
      loadData(getTaskActivityLogs, handleErrorFunction).catch(() => {});
    }
  }, [currentRunNumber, taskId]);

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
  });
}
