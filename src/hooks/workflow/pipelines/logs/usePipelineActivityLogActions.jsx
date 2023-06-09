import useApiService from "hooks/api/service/useApiService";

export default function usePipelineActivityLogActions() {
  const apiService = useApiService();
  const pipelineActivityLogActions = {};

  pipelineActivityLogActions.getPipelineActivityLogs = async (pipelineId, pipelineActivityFilterModel, currentRunNumber) => {
    const queryParameters = {
      search: pipelineActivityFilterModel?.getData("search"),
      runCount: currentRunNumber,
      fields: ["run_count", "step_name", "action", "message", "status", "createdAt", "step_index", "step_id", "user_id"],
      status: pipelineActivityFilterModel?.getFilterValue("status"),
    };

    const apiUrl = `/pipelines/${pipelineId}/activity/v2/`;
    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  pipelineActivityLogActions.getPipelineDurationMetrics = async (
    pipelineId,
  ) => {
    const apiUrl = `/pipelines/${pipelineId}/activity/v2/metrics`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  pipelineActivityLogActions.getSecondaryPipelineActivityLogs = async (pipelineId, pipelineActivityFilterModel) => {
    const apiUrl = `/pipelines/${pipelineId}/activity/v2/secondary`;
    const queryParameters = {
      search: pipelineActivityFilterModel?.getData("search"),
      fields: ["run_count", "step_name", "action", "message", "status", "createdAt", "step_id"],
      status: pipelineActivityFilterModel?.getFilterValue("status"),
    };

    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  pipelineActivityLogActions.getLatestPipelineActivityLogs = async (pipelineId, pipelineActivityFilterModel) => {
    const queryParameters = {
      search: pipelineActivityFilterModel?.getData("search"),
      fields: ["run_count", "step_name", "action", "message", "status", "createdAt", "step_id"],
      status: pipelineActivityFilterModel?.getFilterValue("status"),
    };

    const apiUrl = `/pipelines/${pipelineId}/activity/v2/latest`;
    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  return pipelineActivityLogActions;
}
