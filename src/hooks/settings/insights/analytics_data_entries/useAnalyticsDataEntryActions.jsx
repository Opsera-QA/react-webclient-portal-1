import useApiService from "hooks/api/service/useApiService";

export default function useAnalyticsDataEntryActions() {
  const apiService = useApiService();
  const analyticsDataEntryActions = {};

  analyticsDataEntryActions.getAnalyticsDataEntryById = async (
    analyticsDataEntryId,
  ) => {
    const apiUrl = `/analytics/data-entry/${analyticsDataEntryId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  analyticsDataEntryActions.createAnalyticsDataEntry = async (
    analyticsDataEntryModel,
  ) => {
    const apiUrl = `/analytics/data-entry/`;
    const postBody = {
      ...analyticsDataEntryModel.getPersistData(),
    };

    return await apiService.handleApiPostRequest(
      apiUrl,
      postBody,
    );
  };

  analyticsDataEntryActions.updateAnalyticsDataEntry = async (
    analyticsDataEntryModel,
  ) => {
    const apiUrl = `/analytics/data-entry/${analyticsDataEntryModel?.getMongoDbId()}`;
    const postBody = {
      ...analyticsDataEntryModel.getPersistData(),
    };

    return await apiService.handleApiPutRequest(
      apiUrl,
      postBody,
    );
  };

  analyticsDataEntryActions.deleteAnalyticsDataEntryById = async (
    analyticsDataEntryId,
  ) => {
    const apiUrl = `/analytics/data-entry/${analyticsDataEntryId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return analyticsDataEntryActions;
}
