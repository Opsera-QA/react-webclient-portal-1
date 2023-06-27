import baseActions from "utils/actionsBase";

// TODO Move all tool-specific routes and implement new Node route to update just Pipeline Notifications
const pipelineStepNotificationActions = {};

pipelineStepNotificationActions.getJiraProjects2 = async (toolId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/projects`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraPriorities = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  const apiUrl = `/connectors/jira/${toolId}/priorities`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraPrioritiesWithId = async (jiraToolId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${jiraToolId}/priorities`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraTicketDetails = async (toolId, ticketId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/ticket/${ticketId}/details`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraParentTickets2 = async (toolId, sprintId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/sprint/issues?sprint=${sprintId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getServiceNowGroupsByName = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const apiUrl = `/connectors/servicenow/groupsByName/${toolId}/serviceName/${serviceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

// TODO : why is this here? Move this to ServiceNow actions.

pipelineStepNotificationActions.getServiceNowGroupsByNamev2 = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const apiUrl = `/connectors/servicenow/groupsByName/${toolId}`;
  const queryParams = {
    params: {
      toolId: toolId,
      serviceName: serviceName ? serviceName : "",
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

pipelineStepNotificationActions.getServiceNowServiceOfferings = async (toolId, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/connectors/servicenow/serviceOfferings/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineStepNotificationActions.getServiceNowServiceOfferingsByName = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const apiUrl = `/connectors/servicenow/serviceOfferingsByName/${toolId}/serviceName/${serviceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineStepNotificationActions.getServiceNowServiceOfferingsByNameV2 = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const queryParams = {
    params: {
      toolId: toolId,
      serviceName: serviceName ? serviceName : "",
    },
  };
  const apiUrl = `/connectors/servicenow/serviceOfferingsByName/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

pipelineStepNotificationActions.getServiceNowConfigurationItems = async (toolId, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/connectors/servicenow/configurationItems/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineStepNotificationActions.getServiceNowConfigurationItemsByName = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const apiUrl = `/connectors/servicenow/configurationItemsByName/${toolId}/serviceName/${serviceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineStepNotificationActions.getServiceNowConfigurationItemsByNameV2 = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const queryParams = {
    params: {
      toolId: toolId,
      serviceName: serviceName ? serviceName : "",
    },
  };
  const apiUrl = `/connectors/servicenow/configurationItemsByName/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

pipelineStepNotificationActions.getServiceNowBusinessServices = async (toolId, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/connectors/servicenow/businessServices/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineStepNotificationActions.getServiceNowBusinessServicesByName = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const apiUrl = `/connectors/servicenow/businessServicesByName/${toolId}/serviceName/${serviceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineStepNotificationActions.getServiceNowBusinessServicesByNameV2 = async (
  toolId,
  serviceName,
  getAccessToken,
  cancelTokenSource
) => {
  const queryParams = {
    params: {
      toolId: toolId,
      serviceName: serviceName ? serviceName : "",
    },
  };
  const apiUrl = `/connectors/servicenow/businessServicesByName/${toolId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

export default pipelineStepNotificationActions;
