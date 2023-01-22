import useApiService from "hooks/api/service/useApiService";

export default function usePipelineActions() {
  const apiService = useApiService();
  const pipelineActions = {};

  pipelineActions.deletePipelineStepById = async (
    pipelineId,
    pipelineStepId,
  ) => {
    const apiUrl = `/workflow/pipelines/${pipelineId}/steps/${pipelineStepId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  pipelineActions.updatePipelineStepDefinition = async (
    pipelineId,
    pipelineStepId,
    pipelineStepDefinition,
  ) => {
    const apiUrl = `/workflow/pipelines/${pipelineId}/steps/${pipelineStepId}`;
    return await apiService.handleApiPutRequest(
      apiUrl,
      pipelineStepDefinition,
    );
  };

  pipelineActions.getPipelineStepActivityLog = async (
    pipelineId,
    pipelineStepId,
    tool,
    activityLogId,
  ) => {
    const apiUrl = `/pipelines/${pipelineId}/activity`;
    const urlParameters = {
      tool: tool,
      step_id: pipelineStepId,
      id: activityLogId,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      urlParameters,
    );
  };

  return pipelineActions;
}
