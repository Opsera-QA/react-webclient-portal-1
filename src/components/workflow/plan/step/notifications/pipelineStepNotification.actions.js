import baseActions from "utils/actionsBase";

// TODO Implement
const pipelineStepNotificationActions = {};

// TODO: Use action in jira actions and remove this
pipelineStepNotificationActions.getJiraBoardsWithIdV2 = async (
  getAccessToken,
  cancelTokenSource,
  toolId,
  projectKey
) => {
  const apiUrl = `/connectors/jira/${toolId}/${projectKey}/boards/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineStepNotificationActions.getJiraSprints2 = async (toolId, board, getAccessToken) => {
  const apiUrl = `connectors/jira/${toolId}/sprints?board=${board}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraProjects = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  const apiUrl = `/connectors/jira/${toolId}/projects`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraProjectsFromIdV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/connectors/jira/${toolId}/projects`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraProjects2 = async (toolId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/projects`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

// TODO: Update references to the new file and move elsewhere
pipelineStepNotificationActions.getJiraProjectUsers = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  let projectKey = jiraStepNotificationDto.getData("jiraProject");
  const apiUrl = `/connectors/jira/${toolId}/project/users?project=${projectKey}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraProjectUsers2 = async (toolId, projectKey, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/project/users?project=${projectKey}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraProjectUsers2 = async (jiraToolId, jiraProject, getAccessToken) => {
  const apiUrl = `/connectors/jira/${jiraToolId}/project/users?project=${jiraProject}`;
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

export default pipelineStepNotificationActions;
