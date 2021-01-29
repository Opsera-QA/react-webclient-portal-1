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

toolManagementActions.getToolTypes = async (getAccessToken, hidden = true) => {
  const apiUrl = `/registry/types?hidden=${hidden}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolManagementActions.getToolTypeById = async (toolTypeId, getAccessToken) => {
  const apiUrl = `/registry/type/${toolTypeId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolManagementActions.getToolIdentifierById = async (toolIdentifierId, getAccessToken) => {
  const apiUrl = `/registry/tool/${toolIdentifierId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolManagementActions.getToolIdentifiers = async (getAccessToken, enabledInToolRegistry) => {
  const apiUrl = `/registry/tools?hidden=true&registry=${enabledInToolRegistry}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
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