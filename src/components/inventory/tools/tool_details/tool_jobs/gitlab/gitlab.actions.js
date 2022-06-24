import baseActions from "utils/actionsBase";

export const gitlabActions = {};

gitlabActions.getRepositoriesFromGitlabInstanceV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/gitlab/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

gitlabActions.getRepositoriesFromGitlabInstanceV3 = async (getAccessToken, cancelTokenSource, searchTerm, toolId) => {
  const apiUrl = `/tools/${toolId}/gitlab/v2/repositories`;

  const urlParams = {
    params: {
      searchTerm: searchTerm ? searchTerm : "",
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
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

gitlabActions.getBranchesFromGitlabInstanceV3 = async (getAccessToken, cancelTokenSource, toolId, repositoryId, searchTerm) => {
  const apiUrl = `/tools/${toolId}/gitlab/v2/branches`;
  const queryParams = {
    params: {
      repositoryId: repositoryId,
      searchTerm: searchTerm ? searchTerm : "",
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

