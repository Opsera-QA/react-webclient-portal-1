import baseActions from "utils/actionsBase";

export const gitlabActions = {};

gitlabActions.getRepositoriesFromGitlabInstanceV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/gitlab/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

gitlabActions.getBranchesFromGitlabInstanceV2 = async (getAccessToken, cancelTokenSource, toolId, repositoryId) => {
  const apiUrl = `/tools/${toolId}/gitlab/branches`;
  const queryParams = {
    params: {
      repositoryId: repositoryId,
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

