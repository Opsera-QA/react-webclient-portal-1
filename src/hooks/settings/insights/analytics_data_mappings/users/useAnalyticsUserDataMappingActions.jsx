import useApiService from "hooks/api/service/useApiService";

export default function useAnalyticsUserDataMappingActions() {
  const apiService = useApiService();
  const analyticsUserDataMappingActions = {};

  analyticsUserDataMappingActions.getUserDataMappings = async () => {
    const apiUrl = `/mappings/user/v2`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  analyticsUserDataMappingActions.getUserDataMappingById = async (
    analyticsUserDataMappingId,
  ) => {
    const apiUrl = `/mappings/user/v2/${analyticsUserDataMappingId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  analyticsUserDataMappingActions.createUserDataMapping = async (
    analyticsUserDataMappingModel,
  ) => {
    const apiUrl = "/mappings/user/v2";
    const postBody = {
      ...analyticsUserDataMappingModel.getPersistData(),
    };

    return await apiService.handleApiPostRequest(
      apiUrl,
      postBody,
    );
  };

  analyticsUserDataMappingActions.updateUserDataMapping = async (
    analyticsUserDataMappingModel,
  ) => {
    const apiUrl = `/mappings/user/v2/${analyticsUserDataMappingModel?.getData("_id")}`;
    const postBody = {
      ...analyticsUserDataMappingModel.getPersistData(),
    };

    return await apiService.handleApiPutRequest(
      apiUrl,
      postBody,
    );
  };

  analyticsUserDataMappingActions.deleteUserDataMapping = async (
    analyticsUserDataMappingId,
  ) => {
    const apiUrl = `/mappings/user/v2/${analyticsUserDataMappingId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return analyticsUserDataMappingActions;
}
