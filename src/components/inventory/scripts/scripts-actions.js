import baseActions from "utils/actionsBase";

const scriptsActions = {};

scriptsActions.getScripts = async (getAccessToken, cancelTokenSource, searchKeyword, type, fields = ["name", "type", "owner", "roles"]) => {
  const apiUrl = "/registry/scripts";
  const urlParams = {
    params: {
      search: searchKeyword,
      fields: fields,
      type: type,
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

scriptsActions.getScriptById = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/registry/scripts/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

scriptsActions.createScriptV2 = async (getAccessToken, cancelTokenSource, scriptModel) => {
  const postBody = {
    ...scriptModel.getPersistData()
  };
  const apiUrl = "/registry/script/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

scriptsActions.updateScriptV2 = async (getAccessToken, cancelTokenSource, scriptModel) => {
  const id = scriptModel.getData("_id");
  const apiUrl = `/registry/script/${id}/update`;
  const postBody = {
    ...scriptModel.getChangedProperties()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

scriptsActions.deleteScriptV2 = async (getAccessToken, cancelTokenSource, scriptModel) => {
  const apiUrl = `/registry/script/${scriptModel.getData("_id")}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

scriptsActions.getScriptValue = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/registry/script/${id}/value`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default scriptsActions;