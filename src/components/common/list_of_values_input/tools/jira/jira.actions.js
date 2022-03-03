import baseActions from "utils/actionsBase";

export const jiraActions = {};

jiraActions.getJiraPrioritiesV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/connectors/jira/${toolId}/priorities`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraProjectsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/connectors/jira/${toolId}/projects`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraProjectUsersV2 = async (getAccessToken, cancelTokenSource, toolId, projectKey) => {
  const apiUrl = `/connectors/jira/${toolId}/project/users`;
  const queryParams = {
    params: {
      project: projectKey,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

jiraActions.getJiraBoardsV2 = async (
  getAccessToken,
  cancelTokenSource,
  toolId,
  projectKey
) => {
  const apiUrl = `/connectors/jira/${toolId}/${projectKey}/boards/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jiraActions.getJiraSprintsV2 = async (getAccessToken, cancelTokenSource, toolId, jiraBoard) => {
  const apiUrl = `connectors/jira/${toolId}/sprints`;
  const queryParams = {
    params: {
      board: jiraBoard,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

jiraActions.getJiraSprintTicketsV2 = async (getAccessToken, cancelTokenSource, toolId, jiraSprint) => {
  const apiUrl = `/connectors/jira/${toolId}/sprint/issues`;
  const queryParams = {
    params: {
      sprint: jiraSprint,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

jiraActions.getJiraWorkflowStepsV2 = async (getAccessToken, cancelTokenSource, toolId, projectKey) => {
  const apiUrl = `/connectors/jira/${toolId}/project/workflows`;
  const queryParams = {
    params: {
      project: projectKey,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};