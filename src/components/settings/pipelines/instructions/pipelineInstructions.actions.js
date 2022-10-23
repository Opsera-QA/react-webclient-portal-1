import baseActions from "utils/actionsBase";

const pipelineInstructionsActions = {};

pipelineInstructionsActions.getPipelineInstructions = async (
  getAccessToken,
  cancelTokenSource,
  searchKeyword,
  type,
  ) => {
  const apiUrl = "/registry/scripts";
  const urlParams = {
    params: {
      search: searchKeyword,
      type: type,
    },
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

pipelineInstructionsActions.getPipelineInstructionsById = async (
  getAccessToken,
  cancelTokenSource,
  id,
) => {
  const apiUrl = `/registry/scripts/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineInstructionsActions.createScriptV2 = async (getAccessToken, cancelTokenSource, scriptModel) => {
  const postBody = {
    ...scriptModel.getPersistData()
  };
  const apiUrl = "/registry/script/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

pipelineInstructionsActions.updateScriptV2 = async (getAccessToken, cancelTokenSource, scriptModel) => {
  const id = scriptModel.getData("_id");
  const apiUrl = `/registry/script/${id}/update`;
  const postBody = {
    ...scriptModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

pipelineInstructionsActions.deleteScriptV2 = async (getAccessToken, cancelTokenSource, scriptModel) => {
  const apiUrl = `/registry/script/${scriptModel.getData("_id")}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineInstructionsActions.getScriptValue = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/registry/script/${id}/value`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default pipelineInstructionsActions;