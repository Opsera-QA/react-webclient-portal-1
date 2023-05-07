import baseActions from "utils/actionsBase";

export const jiraActions = {};

jiraActions.getJiraPrioritiesV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tool/jira/${toolId}/priorities`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraProjectsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tool/jira/${toolId}/projects`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraProjectUsersV2 = async (getAccessToken, cancelTokenSource, toolId, projectKey) => {
  const apiUrl = `/tool/jira/${toolId}/project/users`;
  const queryParams = {
    params: {
      projectKey: projectKey,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

jiraActions.getJiraBoardsV2 = async (
  getAccessToken,
  cancelTokenSource,
  toolId,
) => {
  const apiUrl = `/tool/jira/${toolId}/boards/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraBoardsWithProjectKeyV2 = async (
  getAccessToken,
  cancelTokenSource,
  toolId,
  projectKey
) => {
  const apiUrl = `/tool/jira/${toolId}/project/${projectKey}/boards/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraSprintsWithBoardIdV2 = async (getAccessToken, cancelTokenSource, toolId, boardId) => {
  const apiUrl = `/tool/jira/${toolId}/board/sprints`;
  const queryParams = {
    params: {
      boardId: boardId,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

jiraActions.getJiraTicketsWithSprintIdV2 = async (getAccessToken, cancelTokenSource, toolId, sprintId) => {
  const apiUrl = `/tool/jira/${toolId}/sprint/tickets`;
  const queryParams = {
    params: {
      sprintId: sprintId,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

jiraActions.getJiraWorkflowStepsWithProjectKeyV2 = async (getAccessToken, cancelTokenSource, toolId, projectKey) => {
  const apiUrl = `/tool/jira/${toolId}/project/workflow/steps`;
  const queryParams = {
    params: {
      projectKey: projectKey,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

jiraActions.getJiraTicketDetailsV2 = async (getAccessToken, cancelTokenSource, toolId, ticketId) => {
  const apiUrl = `/tool/jira/${toolId}/ticket/details`;
  const queryParams = {
    params: {
      ticketId: ticketId,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

jiraActions.installJiraApp = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/connectors/jira/${toolId}/app/install`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraCustomTagFields = async (getAccessToken, cancelTokenSource, toolId, projectKey) => {
  const apiUrl = `/tool/jira/${toolId}/project/${projectKey}/customTagFields`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraCustomMappingFields = async (getAccessToken, cancelTokenSource, toolId, projectKey) => {
  const apiUrl = `/tool/jira/${toolId}/project/${projectKey}/customMappingFields`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraIssuesFromProject = async (getAccessToken, cancelTokenSource, toolId, projectKey) => {
  const apiUrl = `/tool/jira/${toolId}/project/${projectKey}/openIssues`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
