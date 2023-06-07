import useApiService from "hooks/api/service/useApiService";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useTaskActivityLogActions() {
  const apiService = useApiService();
  const taskActivityLogActions = {};

  taskActivityLogActions.getSecondaryTaskActivityLogs = async (
    taskActivityFilterModel,
    taskId,
 ) => {
    const apiUrl = `/tasks/logs/activity/v2/secondary`;
    const queryParameters = {
      search: taskActivityFilterModel?.getData("search"),
      status: taskActivityFilterModel?.getFilterValue("status"),
      taskId: taskId,
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"],
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  taskActivityLogActions.getTaskActivityLogs = async (
    taskId,
    taskActivityFilterModel,
    runCountArray,
  ) => {
    const apiUrl = `tasks/logs/${taskId}/activity/v2/`;
    const queryParameters = {
      search: DataParsingHelper.parseString(taskActivityFilterModel?.getData("search")),
      runCountArray: runCountArray,
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"],
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  taskActivityLogActions.getLatestTaskActivityLogs = async (
    taskActivityFilterModel,
    taskId,
  ) => {
    const apiUrl = `/tasks/logs/activity/v2/latest`;
    const queryParameters = {
      search: taskActivityFilterModel?.getData("search"),
      status: taskActivityFilterModel?.getFilterValue("status"),
      taskId: taskId,
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"],
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  taskActivityLogActions.getTaskActivityLogsByIdAndRunCount = async (
    taskId,
    runCount,
    taskActivityFilterModel,
  ) => {
    const apiUrl = `/tasks/${taskId}/${runCount}/logs/activity/v2/`;
    const queryParameters = {
      search: taskActivityFilterModel?.getData("search"),
      status: taskActivityFilterModel?.getFilterValue("status"),
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"],
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  return taskActivityLogActions;
}
