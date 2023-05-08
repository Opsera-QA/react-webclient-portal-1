import useApiService from "hooks/api/service/useApiService";

export default function usePipelineActivityLogActions() {
  const apiService = useApiService();
  const pipelineActivityLogActions = {};

  pipelineActivityLogActions.getPipelineDurationMetrics = async (
    pipelineId,
 ) => {
    const apiUrl = `/pipelines/${pipelineId}/activity/v2/metrics`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  return pipelineActivityLogActions;
}
