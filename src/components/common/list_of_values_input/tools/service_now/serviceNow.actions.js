import baseActions from "utils/actionsBase";

export const serviceNowActions = {};

serviceNowActions.getServiceNowUsers = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/connectors/servicenow/users/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

serviceNowActions.getServiceNowGroups = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/connectors/servicenow/groups/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

serviceNowActions.getServiceNowGroupsByName = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const apiUrl = `/connectors/servicenow/groupsByName/${toolId}/serviceName/${serviceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

serviceNowActions.getServiceNowServiceOfferings = async (toolId, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/connectors/servicenow/serviceOfferings/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

serviceNowActions.getServiceNowServiceOfferingsByName = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const apiUrl = `/connectors/servicenow/serviceOfferingsByName/${toolId}/serviceName/${serviceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

serviceNowActions.getServiceNowConfigurationItems = async (toolId, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/connectors/servicenow/configurationItems/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

serviceNowActions.getServiceNowConfigurationItemsByName = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const apiUrl = `/connectors/servicenow/configurationItemsByName/${toolId}/serviceName/${serviceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

serviceNowActions.getServiceNowBusinessServices = async (toolId, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/connectors/servicenow/businessServices/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

serviceNowActions.getServiceNowBusinessServicesByName = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const apiUrl = `/connectors/servicenow/businessServicesByName/${toolId}/serviceName/${serviceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
