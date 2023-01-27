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
