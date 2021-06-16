import baseActions from "utils/actionsBase";

const scriptsActions = {};

scriptsActions.getScripts = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/registry/scripts";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

scriptsActions.createScriptV2 = async (getAccessToken, cancelTokenSource, parameterModel) => {
  const postBody = {
    ...parameterModel.getPersistData()
  };
  const apiUrl = "/registry/script/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

scriptsActions.updateScriptV2 = async (getAccessToken, cancelTokenSource, parameterModel) => {
  const id = parameterModel.getData("_id");
  const apiUrl = `/registry/script/${id}/update`;
  const postBody = {
    ...parameterModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

scriptsActions.deleteScriptV2 = async (getAccessToken, cancelTokenSource, parameterModel) => {
  const apiUrl = `/registry/script/${parameterModel.getData("_id")}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default scriptsActions;