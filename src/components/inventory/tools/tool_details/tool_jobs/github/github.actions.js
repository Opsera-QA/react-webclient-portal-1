import baseActions from "utils/actionsBase";

export const githubActions = {};

githubActions.getRepositoriesFromGithubInstanceV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/github/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

githubActions.getBranchesFromGithubInstanceV2 = async (getAccessToken, cancelTokenSource, toolId, repositoryId) => {
  const apiUrl = `/tools/${toolId}/github/branches`;
  const queryParams = {
    params: {
      repositoryId: repositoryId,
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

