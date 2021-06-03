import baseActions from "utils/actionsBase";

const parametersActions = {};

parametersActions.getParameters = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/registry/parameters";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

parametersActions.createParameterV2 = async (getAccessToken, cancelTokenSource, parameterModel) => {
  const postBody = {
    ...parameterModel.getPersistData()
  };
  const apiUrl = "/registry/parameter/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

parametersActions.updateParameterV2 = async (getAccessToken, cancelTokenSource, parameterModel) => {
  const id = parameterModel.getData("_id");
  const apiUrl = `/registry/parameter/${id}/update`;
  const postBody = {
    ...parameterModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

parametersActions.deleteParameterV2 = async (getAccessToken, cancelTokenSource, parameterModel) => {
  const apiUrl = `/registry/parameter/${parameterModel.getData("_id")}`;
  return baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

parametersActions.getParameterValueFromVaultV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/registry/parameter/${id}/value`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default parametersActions;