import baseActions from "utils/actionsBase";

export const githubActions = {};

githubActions.getRepositoriesFromGithubInstanceV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/github/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

githubActions.getRepositoriesFromGithubInstanceV3 = async (getAccessToken, cancelTokenSource, toolId, searchTerm, pageSize = 100, currentPage,) => {
  const apiUrl = `/tools/${toolId}/github/repositories/v2`;
  const queryParams = {
    params: {
      searchTerm: searchTerm,
      pageSize: pageSize,
      currentPage: currentPage,
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};


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

githubActions.getBranchesFromGithubInstanceV3 = async (
  getAccessToken,
  cancelTokenSource,
  toolId,
  repositoryId,
  searchTerm,
) => {
  const apiUrl = `/tools/${toolId}/github/v2/branches`;
  const queryParams = {
    params: {
      repositoryId: repositoryId,
      searchTerm: searchTerm ? searchTerm : "",
    },
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParams,
  );
};

githubActions.getReviewers = async (getAccessToken, cancelTokenSource, toolId, repositoryId) => {
  const apiUrl = `/tools/${toolId}/github/reviewers`;
  const queryParams = {
    params: {
      projectId: repositoryId
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

