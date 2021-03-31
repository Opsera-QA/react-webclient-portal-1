import baseActions from "../../../../../../../utils/actionsBase";

// TODO Implement
const pipelineStepNotificationActions = {};

pipelineStepNotificationActions.getJiraBoards = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  const apiUrl = `/connectors/jira/${toolId}/boards`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraBoardsWithIdV2 = async (getAccessToken, cancelTokenSource, toolId, projectKey) => {
  const apiUrl = `/connectors/jira/${toolId}/${projectKey}/boards/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineStepNotificationActions.getJiraSprints = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  let board = jiraStepNotificationDto.getData("jiraBoard");
  const apiUrl = `connectors/jira/${toolId}/sprints?board=${board}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
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

pipelineStepNotificationActions.getJiraProjectsFromId = async (toolId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/projects`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraProjects2 = async (toolId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/projects`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

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

pipelineStepNotificationActions.getJiraWorkflowSteps = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  let projectKey = jiraStepNotificationDto.getData("jiraProject");
  const apiUrl = `/connectors/jira/${toolId}/project/workflows?project=${projectKey}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraParentTickets = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  let sprintId = jiraStepNotificationDto.getData("jiraSprint");
  const apiUrl = `/connectors/jira/${toolId}/sprint/issues?sprint=${sprintId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraParentTickets2 = async (toolId, sprintId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/sprint/issues?sprint=${sprintId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

export default pipelineStepNotificationActions;