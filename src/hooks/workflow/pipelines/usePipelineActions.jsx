import useApiService from "hooks/api/service/useApiService";
import baseActions from "utils/actionsBase";
import pipelineActions from "components/workflow/pipeline-actions";

export default function usePipelineActions() {
  const apiService = useApiService();
  const pipelineActions = {};

  pipelineActions.getPipelineNameById = async (
    pipelineId,
  ) => {
    const apiUrl = `/workflow/pipelines/${pipelineId}/name`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  pipelineActions.updatePipeline = async (
    pipelineId,
    pipeline,
  ) => {
    const apiUrl = `/pipelines/${pipelineId}/update/`;
    return await apiService.handleApiPostRequest(
      apiUrl,
      pipeline,
    );
  };

  pipelineActions.updatePipelineActionRoles = async (
    pipelineId,
    roles,
  ) => {
    const apiUrl = `/workflow/pipelines/${pipelineId}/roles`;
    const postBody = {
      roles: roles,
    };
    return await apiService.handleApiPatchRequest(
      apiUrl,
      postBody,
    );
  };

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

  pipelineActions.duplicatePipeline = async (
    duplicatePipelineModel,
  ) => {
    const apiUrl = `/pipelines/${duplicatePipelineModel?.getMongoDbId()}/duplicate/`;
    const postBody = duplicatePipelineModel.getPersistData();
    return await apiService.handleApiPostRequest(
      apiUrl,
      postBody,
    );
  };

  pipelineActions.getUniquePipelineOwnersForFilter = async () => {
    const apiUrl = `/workflow/pipelines/filters/owners`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  pipelineActions.getUniqueAppliedTagsForPipelineFilter = async () => {
    const apiUrl = `/workflow/pipelines/filters/tags`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  return pipelineActions;
}
