import useApiService from "hooks/api/service/useApiService";

export default function useConfigurationFeatureFlagActions() {
  const apiService = useApiService();
  const configurationFeatureFlagActions = {};

  configurationFeatureFlagActions.getConfigurationFeatureFlags = async () => {
    const apiUrl = "/feature-flags";
    return await apiService.handleApiGetRequest(apiUrl);
  };

  return configurationFeatureFlagActions;
}
