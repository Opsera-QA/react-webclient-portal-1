import baseActions from "utils/actionsBase";

const toolManagementActions = {};

toolManagementActions.createToolTypeV2 = async (getAccessToken, cancelTokenSource, toolTypeDataDto) => {
  let postBody = {
    ...toolTypeDataDto.getPersistData()
  };
  const apiUrl = "/registry/type/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

toolManagementActions.updateToolTypeV2 = async (getAccessToken, cancelTokenSource, toolTypeDataDto) => {
  const postBody = {
    ...toolTypeDataDto.getPersistData()
  };
  const apiUrl = `/registry/type/${toolTypeDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

toolManagementActions.deleteToolTypeV2 = async (getAccessToken, cancelTokenSource, toolTypeDataDto) => {
  const apiUrl = `/registry/type/${toolTypeDataDto.getData("_id")}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolManagementActions.getToolTypeByIdV2 = async (getAccessToken, cancelTokenSource, toolTypeId) => {
  const apiUrl = `/registry/type/${toolTypeId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolManagementActions.getToolIdentifierByIdV2 = async (getAccessToken, cancelTokenSource, toolIdentifierId) => {
  const apiUrl = `/registry/tool/${toolIdentifierId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolManagementActions.getToolIdentifiers = async (getAccessToken, enabledInToolRegistry) => {
  const apiUrl = `/registry/tools?hidden=true&registry=${enabledInToolRegistry}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolManagementActions.getToolIdentifiersV2 = async (getAccessToken, cancelTokenSource, status, enabledInToolRegistry) => {
  const urlParams = {
    params: {
      status: status,
      registry: enabledInToolRegistry,
    },
  };
  const apiUrl = `/registry/tools`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolManagementActions.getPipelineUsageToolIdentifiersV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/registry/tools`;
  const params = {
    status: "active",
    usage: "pipeline",
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, params);
};

toolManagementActions.createToolIdentifier = async (toolIdentifierDataDto, getAccessToken) => {
  let postData = {
    ...toolIdentifierDataDto.getPersistData()
  };
  const apiUrl = "/registry/tool/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

toolManagementActions.createToolIdentifierV2 = async (getAccessToken, cancelTokenSource, toolIdentifierDataDto) => {
  let postData = {
    ...toolIdentifierDataDto.getPersistData()
  };
  const apiUrl = "/registry/tool/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

toolManagementActions.updateToolIdentifier = async (toolIdentifierDataDto, getAccessToken) => {
  const postBody = {
    ...toolIdentifierDataDto.getPersistData()
  };
  const apiUrl = `/registry/tool/${toolIdentifierDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

toolManagementActions.updateToolIdentifierV2 = async (getAccessToken, cancelTokenSource, toolIdentifierDataDto) => {
  const postBody = {
    ...toolIdentifierDataDto.getPersistData()
  };
  const apiUrl = `/registry/tool/${toolIdentifierDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

toolManagementActions.deleteToolIdentifierV2 = async (getAccessToken, cancelTokenSource, toolIdentifierDataDto) => {
  const apiUrl = `/registry/tool/${toolIdentifierDataDto.getData("_id")}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default toolManagementActions;