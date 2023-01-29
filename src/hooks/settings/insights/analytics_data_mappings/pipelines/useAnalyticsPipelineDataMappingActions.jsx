import useApiService from "hooks/api/service/useApiService";

export default function useAnalyticsPipelineDataMappingActions() {
  const apiService = useApiService();
  const analyticsPipelineDataMappingActions = {};

  analyticsPipelineDataMappingActions.getPipelineDataMappings = async () => {
    const apiUrl = `/mappings/pipeline/v2`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  analyticsPipelineDataMappingActions.getPipelineDataMappingById = async (
    analyticsPipelineDataMappingId,
  ) => {
    const apiUrl = `/mappings/pipeline/v2/${analyticsPipelineDataMappingId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  analyticsPipelineDataMappingActions.createPipelineDataMapping = async (
    analyticsPipelineDataMappingModel,
  ) => {
    const apiUrl = "/mappings/pipeline/v2";
    const postBody = {
      ...analyticsPipelineDataMappingModel.getPersistData(),
    };

    return await apiService.handleApiPostRequest(
      apiUrl,
      postBody,
    );
  };

  analyticsPipelineDataMappingActions.updatePipelineDataMapping = async (
    analyticsPipelineDataMappingModel,
  ) => {
    const apiUrl = `/mappings/pipeline/v2/${analyticsPipelineDataMappingModel?.getData("_id")}`;
    const postBody = {
      ...analyticsPipelineDataMappingModel.getPersistData(),
    };

    return await apiService.handleApiPutRequest(
      apiUrl,
      postBody,
    );
  };

  analyticsPipelineDataMappingActions.deletePipelineDataMapping = async (
    analyticsPipelineDataMappingId,
  ) => {
    const apiUrl = `/mappings/pipeline/v2/${analyticsPipelineDataMappingId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return analyticsPipelineDataMappingActions;
}
