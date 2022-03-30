import baseActions from "utils/actionsBase";

export const toolIdentifierActions = {};

toolIdentifierActions.getToolIdentifierByIdV2 = async (getAccessToken, cancelTokenSource, toolIdentifierId) => {
  const apiUrl = `/registry/tool/${toolIdentifierId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolIdentifierActions.getToolIdentifiersV2 = async (getAccessToken, cancelTokenSource, status, enabledInToolRegistry) => {
  const apiUrl = `/registry/tools`;
  const urlParams = {
    params: {
      status: status,
      registry: enabledInToolRegistry,
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolIdentifierActions.getPipelineUsageToolIdentifiersV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/registry/tools`;
  const urlParams = {
    params: {
      status: "active",
      usage: "pipeline",
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolIdentifierActions.createToolIdentifierV2 = async (getAccessToken, cancelTokenSource, toolIdentifierModel) => {
  const apiUrl = "/registry/tool/create";
  const postData = {
    ...toolIdentifierModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

toolIdentifierActions.updateToolIdentifierV2 = async (getAccessToken, cancelTokenSource, toolIdentifierModel) => {
  const apiUrl = `/registry/tool/${toolIdentifierModel?.getData("_id")}/update`;
  const postBody = {
    ...toolIdentifierModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

toolIdentifierActions.deleteToolIdentifierV2 = async (getAccessToken, cancelTokenSource, toolIdentifierId) => {
  const apiUrl = `/registry/tool/${toolIdentifierId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};