import useApiService from "hooks/api/service/useApiService";

export default function useAnalyticsProfileActions() {
  const apiService = useApiService();
  const analyticsProfileActions = {};

  analyticsProfileActions.areAnalyticsToolsEnabled = async () => {
    const apiUrl = "/analytics/profile/enabled-tools-check";
    return await apiService.handleApiGetRequest(apiUrl);
  };

  return analyticsProfileActions;
}
