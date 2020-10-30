import baseActions from "../../../../../../../utils/actionsBase";

const pipelineStepNotificationActions = {};

pipelineStepNotificationActions.getJiraBoards = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  const apiUrl = `/connectors/jira/${toolId}/boards`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraSprints = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  let board = jiraStepNotificationDto.getData("jiraBoard");
  const apiUrl = `connectors/jira/${toolId}/sprints?board=${board}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraProjects = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  const apiUrl = `/connectors/jira/${toolId}/projects`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

// TODO: Hook up project
pipelineStepNotificationActions.getJiraProjectUsers = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  let projectId = jiraStepNotificationDto.getData("jiraProject");
  const apiUrl = `/connectors/jira/${toolId}/project/users`; //?project=${projectId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraPriorities = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  const apiUrl = `/connectors/jira/${toolId}/priorities`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraTicketDetails = async (toolId, ticketId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/ticket/${ticketId}/details`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineStepNotificationActions.getJiraWorkflowSteps = async (jiraStepNotificationDto, getAccessToken) => {
  let toolId = jiraStepNotificationDto.getData("jiraToolId");
  let projectId = jiraStepNotificationDto.getData("jiraProject");
  const apiUrl = `/connectors/jira/${toolId}/project/workflows?project=${projectId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

export default pipelineStepNotificationActions;