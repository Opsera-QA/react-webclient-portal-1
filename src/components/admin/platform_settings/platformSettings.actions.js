import baseActions from "utils/actionsBase";

export const platformSettingsActions = {};

platformSettingsActions.createPlatformSystemParameter = async (
  getAccessToken,
  cancelTokenSource,
  platformSystemParameterModel,
) => {
  const apiUrl = "/platform/system-parameters/";
  const postBody = {
    ...platformSystemParameterModel?.getPersistData(),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

platformSettingsActions.updatePlatformSystemParameter = async (
  getAccessToken,
  cancelTokenSource,
  platformSystemParameterModel,
) => {
  const apiUrl = `/platform/system-parameters/${platformSystemParameterModel?.getMongoDbId()}/`;
  const postBody = {
    ...platformSystemParameterModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

platformSettingsActions.deletePlatformSystemParameter = async (
  getAccessToken,
  cancelTokenSource,
  platformSystemParameterModel,
) => {
  const apiUrl = `/platform/system-parameters/${platformSystemParameterModel?.getMongoDbId()}/`;
  return await baseActions.apiDeleteCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

platformSettingsActions.getPlatformSettingRecords = async (
  getAccessToken,
  cancelTokenSource,
) => {
  const apiUrl = "/configuration/platform";
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
  const apiUrl = `/configuration/platform/${systemParameterId}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
