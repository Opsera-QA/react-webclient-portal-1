import baseActions from "utils/actionsBase";

export const platformSystemParameterActions = {};

platformSystemParameterActions.createPlatformSystemParameter = async (
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

platformSystemParameterActions.updatePlatformSystemParameter = async (
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

platformSystemParameterActions.deletePlatformSystemParameter = async (
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

platformSystemParameterActions.getPlatformSystemParameters = async (
  getAccessToken,
  cancelTokenSource,
) => {
  const apiUrl = "/platform/system-parameters/";
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

platformSystemParameterActions.getPlatformSystemParameterById = async (
  getAccessToken,
  cancelTokenSource,
  systemParameterId,
) => {
  const apiUrl = `/platform/system-parameters/${systemParameterId}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
