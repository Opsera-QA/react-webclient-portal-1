import baseActions from "utils/actionsBase";

export const platformSettingFeatureActions = {};

platformSettingFeatureActions.getPlatformSettingFeatures = async (
  getAccessToken,
  cancelTokenSource,
  platformSettingId,
) => {
  const apiUrl = `/configuration/platform/settings/${platformSettingId}/features`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

platformSettingFeatureActions.getPlatformSettingFeatureById = async (
  getAccessToken,
  cancelTokenSource,
  platformSettingId,
  featureId,
) => {
  const apiUrl = `/configuration/platform/settings/${platformSettingId}/features/${featureId}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

platformSettingFeatureActions.createPlatformSettingFeature = async (
  getAccessToken,
  cancelTokenSource,
  platformSettingId,
  platformSettingFeatureModel,
) => {
  const apiUrl = `/configuration/platform/settings/${platformSettingId}/features`;
  const postBody = {
    ...platformSettingFeatureModel?.getPersistData(),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

platformSettingFeatureActions.updatePlatformSystemFeature = async (
  getAccessToken,
  cancelTokenSource,
  platformSettingId,
  platformSettingFeatureModel,
) => {
  const apiUrl = `/configuration/platform/settings/${platformSettingId}/features/${platformSettingFeatureModel?.getMongoDbId()}`;
  const postBody = {
    ...platformSettingFeatureModel?.getPersistData(),
  };

  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

platformSettingFeatureActions.deletePlatformSettingFeature = async (
  getAccessToken,
  cancelTokenSource,
  platformSettingId,
  platformSettingFeatureId,
) => {
  const apiUrl = `/configuration/platform/settings/${platformSettingId}/features/${platformSettingFeatureId}`;
  return await baseActions.apiDeleteCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

