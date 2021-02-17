import baseActions from "utils/actionsBase";

const toolManagementActions = {};

toolManagementActions.createToolType = async (toolTypeDataDto, getAccessToken) => {
  let postBody = {
    ...toolTypeDataDto.getPersistData()
  }
  const apiUrl = "/registry/type/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

toolManagementActions.updateToolType = async (toolTypeDataDto, getAccessToken) => {
  const postBody = {
    ...toolTypeDataDto.getPersistData()
  }
  const apiUrl = `/registry/type/${toolTypeDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

toolManagementActions.deleteToolType = async (toolTypeDataDto, getAccessToken) => {
  const apiUrl = `/registry/tool/${toolTypeDataDto.getData("_id")}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

// TODO: Remove after updating references to use Cancel Token
toolManagementActions.getToolTypes = async (getAccessToken, hidden = true) => {
  const apiUrl = `/registry/types?hidden=${hidden}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolManagementActions.getToolTypesV2 = async (getAccessToken, cancelTokenSource, hidden = true) => {
  const apiUrl = `/registry/types?hidden=${hidden}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolManagementActions.getToolTypeByIdV2 = async (getAccessToken, cancelTokenSource, toolTypeId) => {
  const apiUrl = `/registry/type/${toolTypeId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolManagementActions.getToolIdentifierById = async (toolIdentifierId, getAccessToken) => {
  const apiUrl = `/registry/tool/${toolIdentifierId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolManagementActions.getToolIdentifiers = async (getAccessToken, enabledInToolRegistry) => {
  const apiUrl = `/registry/tools?hidden=true&registry=${enabledInToolRegistry}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolManagementActions.getToolIdentifiersV2 = async (getAccessToken, cancelTokenSource, status, enabledInToolRegistry) => {
  const urlParams = {
    params: {
      status: status,
      registry: enabledInToolRegistry
    },
  };
  const apiUrl = `/registry/tools`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolManagementActions.createToolIdentifier = async (toolIdentifierDataDto, getAccessToken) => {
  let postData = {
    ...toolIdentifierDataDto.getPersistData()
  }
  const apiUrl = "/registry/tool/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

toolManagementActions.updateToolIdentifier = async (toolIdentifierDataDto, getAccessToken) => {
  const postBody = {
    ...toolIdentifierDataDto.getPersistData()
  }
  const apiUrl = `/registry/tool/${toolIdentifierDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

toolManagementActions.deleteToolIdentifier = async (toolIdentifierDataDto, getAccessToken) => {
  const apiUrl = `/registry/type/${toolIdentifierDataDto.getData("_id")}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

export default toolManagementActions;