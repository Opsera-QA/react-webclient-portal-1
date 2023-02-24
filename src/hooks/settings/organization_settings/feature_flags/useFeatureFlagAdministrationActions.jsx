import useApiService from "hooks/api/service/useApiService";

export default function useFeatureFlagAdministrationActions() {
  const apiService = useApiService();
  const featureFlagAdministrationActions = {};

  featureFlagAdministrationActions.getPolicies = async () => {
    const apiUrl = `/administration/organization-settings/features`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  featureFlagAdministrationActions.getFeatureFlagById = async (
    featureFlagId,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/features/${organizationDomain}/${organizationAccountId}/${featureFlagId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  featureFlagAdministrationActions.getFeatureFlagByName = async (
    featureFlagName,
  ) => {
    const apiUrl = `/administration/organization-settings/features/flags/name/${featureFlagName}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  featureFlagAdministrationActions.activateFeatureFlag = async (
    featureFlag,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/features/${organizationDomain}/${organizationAccountId}/`;
    return await apiService.handleApiPostRequest(
      apiUrl,
      featureFlag,
    );
  };

  featureFlagAdministrationActions.updateFeatureFlag = async (
    featureFlagId,
    updatedFeatureFlag,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/features/${organizationDomain}/${organizationAccountId}/${featureFlagId}`;
    return await apiService.handleApiPutRequest(
      apiUrl,
      updatedFeatureFlag,
    );
  };

  featureFlagAdministrationActions.deleteFeatureFlag = async (
    featureFlagId,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/features/${organizationDomain}/${organizationAccountId}/${featureFlagId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return featureFlagAdministrationActions;
}
