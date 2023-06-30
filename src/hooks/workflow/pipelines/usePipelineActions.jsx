import useApiService from "hooks/api/service/useApiService";
import baseActions from "utils/actionsBase";
import pipelineActions from "components/workflow/pipeline-actions";

export default function usePipelineActions() {
  const apiService = useApiService();
  const pipelineActions = {};

  pipelineActions.getPipelines = async (
    pipelineFilterModel,
    fields,
    active = true,
 ) => {
    const apiUrl = `/pipelines/v2`;
    const type = pipelineFilterModel?.getFilterValue("type");
    const queryParameters = {
      sort: pipelineFilterModel?.getFilterValue("sortOption"),
      size: pipelineFilterModel?.getData("pageSize"),
      page: pipelineFilterModel?.getData("currentPage"),
      type: type !== "all" ? type : undefined,
      search: pipelineFilterModel?.getFilterValue("search"),
      owner: pipelineFilterModel?.getFilterValue("owner"),
      tag: pipelineFilterModel?.getData("tag"),
      status: pipelineFilterModel?.getFilterValue("status"),
      toolIdentifier: pipelineFilterModel?.getFilterValue("tool_identifier"),
      active: active,
      fields: fields,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  pipelineActions.getPipelineById = async (pipelineId) => {
    const apiUrl = `/pipelines/v2/${pipelineId}`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

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

  pipelineActions.resetPipeline = async (pipelineId, silentReset = false) => {
    const apiUrl = `/pipelines/${pipelineId}/reset/`;
    const queryParameters = {
      silentReset: silentReset,
    };

    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  pipelineActions.updatePipelineField = async (
    pipelineId,
    fieldName,
    newValue,
  ) => {
    const apiUrl = `/workflow/pipelines/${pipelineId}`;
    const postBody = {
      fieldName: fieldName,
      value: newValue,
    };
    return await apiService.handleApiPatchRequest(
      apiUrl,
      postBody,
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

  pipelineActions.addPipelineStepAtIndex = async (
    pipelineId,
    index,
  ) => {
    const apiUrl = `/workflow/pipelines/${pipelineId}/steps/index/${index}`;
    return await apiService.handleApiPostRequest(apiUrl);
  };

  pipelineActions.duplicatePipelineStepAtIndex = async (
    pipelineId,
    pipelineStepId,
    index,
  ) => {
    const apiUrl = `/workflow/pipelines/${pipelineId}/steps/${pipelineStepId}/index/${index}`;
    return await apiService.handleApiPostRequest(
      apiUrl,
    );
  };

  pipelineActions.movePipelineStepUp = async (
    pipelineId,
    pipelineStepId,
  ) => {
    const apiUrl = `/workflow/pipelines/${pipelineId}/steps/${pipelineStepId}/up`;
    return await apiService.handleApiPatchRequest(
      apiUrl,
    );
  };

  pipelineActions.movePipelineStepDown = async (
    pipelineId,
    pipelineStepId,
  ) => {
    const apiUrl = `/workflow/pipelines/${pipelineId}/steps/${pipelineStepId}/down`;
    return await apiService.handleApiPatchRequest(
      apiUrl,
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

  pipelineActions.getUniqueToolIdentifiersByPipelineUsageForFilter = async () => {
    const apiUrl = `/workflow/pipelines/filters/tool-identifiers`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  return pipelineActions;
}
