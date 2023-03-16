import useApiService from "hooks/api/service/useApiService";

export default function usePlatformSettingsActions() {
  const apiService = useApiService();
  const platformSettingsActions = {};

  platformSettingsActions.createPlatformSetting = async (
    platformSettingsModel,
  ) => {
    const apiUrl = "/configuration/platform/settings";
    const postBody = {
      ...platformSettingsModel?.getPersistData(),
    };

    return await apiService.handleApiPostRequest(
      apiUrl,
      postBody,
    );
  };

  platformSettingsActions.updatePlatformSetting = async (
    platformSettingsModel,
  ) => {
    const apiUrl = `/configuration/platform/settings/${platformSettingsModel?.getMongoDbId()}/`;
    const postBody = {
      ...platformSettingsModel.getPersistData(),
    };

    return await apiService.handleApiPutRequest(
      apiUrl,
      postBody,
    );
  };

  platformSettingsActions.deletePlatformSettingById = async (
    platformSettingsId,
  ) => {
    const apiUrl = `/configuration/platform/settings/${platformSettingsId}/`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  platformSettingsActions.getPlatformSettings = async () => {
    const apiUrl = "/configuration/platform/settings";
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  platformSettingsActions.getActivePlatformSettings = async () => {
    const apiUrl = "/configuration/platform/settings/active";
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  platformSettingsActions.getPlatformSettingRecordById = async (
    systemParameterId,
  ) => {
    const apiUrl = `/configuration/platform/settings/${systemParameterId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  platformSettingsActions.getPlatformSettingFeatureFlagByName = async (
    featureFlagName,
  ) => {
    const apiUrl = `/configuration/platform/settings/features/${featureFlagName}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  return platformSettingsActions;
}
