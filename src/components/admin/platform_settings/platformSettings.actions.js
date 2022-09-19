import baseActions from "utils/actionsBase";

export const platformSettingsActions = {};

platformSettingsActions.createPlatformSetting = async (
  getAccessToken,
  cancelTokenSource,
  platformSettingsModel,
) => {
  const apiUrl = "/configuration/platform/settings";
  const postBody = {
    ...platformSettingsModel?.getPersistData(),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

platformSettingsActions.updatePlatformSetting = async (
  getAccessToken,
  cancelTokenSource,
  platformSettingsModel,
) => {
  const apiUrl = `/configuration/platform/settings/${platformSettingsModel?.getMongoDbId()}/`;
  const postBody = {
    ...platformSettingsModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

platformSettingsActions.deletePlatformSettingById = async (
  getAccessToken,
  cancelTokenSource,
  platformSettingsId,
) => {
  const apiUrl = `/configuration/platform/settings/${platformSettingsId}/`;
  return await baseActions.apiDeleteCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

platformSettingsActions.getPlatformSettings = async (
  getAccessToken,
  cancelTokenSource,
) => {
  const apiUrl = "/configuration/platform/settings";
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

platformSettingsActions.getPlatformSettingRecordById = async (
  getAccessToken,
  cancelTokenSource,
  systemParameterId,
) => {
  const apiUrl = `/configuration/platform/settings/${systemParameterId}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
