import useApiService from "hooks/api/service/useApiService";

export default function useAnalyticsDataProjectMappingActions() {
  const apiService = useApiService();
  const analyticsProjectDataMappingActions = {};

  analyticsProjectDataMappingActions.getProjectDataMappings = async (getAccessToken, cancelTokenSource, toolFilterModel) => {
    const apiUrl = `/mappings/project/v2`;

    const queryParameters = {
      type: toolFilterModel?.getFilterValue("type"),
      tool_identifier: toolFilterModel?.getFilterValue("tool_identifier"),
      search: toolFilterModel?.getFilterValue("search"),
      sort: toolFilterModel?.getFilterValue("sortOption"),
      size: toolFilterModel?.getFilterValue("pageSize"),
      page: toolFilterModel?.getFilterValue("currentPage"),
      active: toolFilterModel?.getFilterValue("active"),
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  analyticsProjectDataMappingActions.getProjectDataMappingById = async (
    analyticsProjectDataMappingId,
  ) => {
    const apiUrl = `/mappings/project/v2/${analyticsProjectDataMappingId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  analyticsProjectDataMappingActions.createProjectDataMapping = async (
    analyticsProjectDataMappingModel,
  ) => {
    const apiUrl = "/mappings/project/v2";
    const postBody = {
      ...analyticsProjectDataMappingModel.getPersistData(),
    };

    return await apiService.handleApiPostRequest(
      apiUrl,
      postBody,
    );
  };

  analyticsProjectDataMappingActions.updateProjectDataMapping = async (
    analyticsProjectDataMappingModel,
  ) => {
    const apiUrl = `/mappings/project/v2/${analyticsProjectDataMappingModel?.getData("_id")}`;
    const postBody = {
      ...analyticsProjectDataMappingModel.getPersistData(),
    };

    return await apiService.handleApiPutRequest(
      apiUrl,
      postBody,
    );
  };

  analyticsProjectDataMappingActions.deleteProjectDataMapping = async (
    analyticsProjectDataMappingId,
  ) => {
    const apiUrl = `/mappings/project/v2/${analyticsProjectDataMappingId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return analyticsProjectDataMappingActions;
}
