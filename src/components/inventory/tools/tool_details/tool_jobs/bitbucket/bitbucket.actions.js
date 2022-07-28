import baseActions from "utils/actionsBase";

export const bitbucketActions = {};

bitbucketActions.getWorkspacesFromBitbucketInstanceV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/bitbucket/workspaces`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

bitbucketActions.getRepositoriesFromBitbucketInstanceV2 = async (getAccessToken, cancelTokenSource, toolId, workspace) => {
  const apiUrl = `/tools/${toolId}/bitbucket/repositories`;
  const queryParams = {
    params: {
      workspace: workspace,
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

bitbucketActions.getRepositoriesFromBitbucketInstanceV3 = async (getAccessToken, cancelTokenSource, toolId, workspace, searchTerm, pageSize = 100, currentPage) => {
  const apiUrl = `/tools/${toolId}/bitbucket/repositories/v2`;
  const queryParams = {
    params: {
      workspace: workspace,
      searchTerm: searchTerm,
      pageSize: pageSize,
      currentPage: currentPage,
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

bitbucketActions.getBranchesFromBitbucketInstanceV2 = async (getAccessToken, cancelTokenSource, toolId, workspace, repositoryId) => {
  const apiUrl = `/tools/${toolId}/bitbucket/branches`;
  const queryParams = {
    params: {
      workspace: workspace,
      repositoryId: repositoryId,
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

